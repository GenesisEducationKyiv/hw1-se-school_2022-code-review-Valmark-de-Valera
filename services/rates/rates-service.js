const log = require('../logger')('RatesService');
const BinanceProvider = require('./providers/binance.provider');
const TestProvider = require('./providers/test.provider');
const { providersNamesDict, providersKeysDict } = require('./const/providers.const');
const CoinbaseProvider = require('./providers/coinbase.provider');
require('dotenv').config();

class RatesService {
	provider = undefined;
	autoChangeUnavailableProviders = true;

	constructor() {
		this.changeProviderByKey(process.env.CRYPTO_CURRENCY_PROVIDER);
	}

	changeProviderByName(name) {
		let key = Object.keys(providersNamesDict).find((key) => providersNamesDict[key] === name);
		return this.changeProviderByKey(providersKeysDict[key]);
	}

	changeProviderByKey(key, testOptions = undefined) {
		switch (key) {
			case providersKeysDict.binance:
				this.provider = new BinanceProvider();
				break;
			case providersKeysDict.coinbase:
				this.provider = new CoinbaseProvider();
				break;
			case providersKeysDict.test:
				if (process.env.NODE_ENV !== 'test') {
					log.error('Test providers are used only for testing purposes!');
					return false;
				}
				this.provider = new TestProvider(testOptions);
				break;
			default:
				this.provider = new BinanceProvider();
				log.error(
					`Unknown provider with key "${key}". Available providers: ${Object.values(
						providersKeysDict
					)}`
				);
				return false;
		}
		log.info(`Success change provider: ${this.provider.providerName}`);
		return true;
	}

	async getBtcUahRateAsync() {
		let rateValue = await this.provider.getBtcUahRateAsync();
		if (!rateValue || isNaN(rateValue)) {
			log.error(
				`Unable to get rate value from active provider. AutoSwitch: ${
					this.autoChangeUnavailableProviders ? 'Enabled' : 'Disabled'
				}`
			);
			if (this.autoChangeUnavailableProviders) {
				for (let key in providersKeysDict) {
					let providerKey = providersKeysDict[key];
					if (providerKey !== this.provider.providerKey) {
						this.changeProviderByKey(providersKeysDict[key]);
						rateValue = await this.provider.getBtcUahRateAsync();
						if (rateValue && !isNaN(rateValue)) break;
					}
				}
			}
		}
		return rateValue;
	}
}

module.exports = RatesService;
