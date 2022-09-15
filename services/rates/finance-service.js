const log = require('../logger')('FinanceService');
const { providersNamesDict, providersKeysDict } = require('./const/providers.const');
const CoinbaseProvider = require('./providers/coinbase.provider');
const BinanceProvider = require('./providers/binance.provider');
const TestProvider = require('./providers/test.provider');
const KunaProvider = require('./providers/kuna.provider');
const NomicsProvider = require('./providers/nomics.provider');
require('dotenv').config();

class FinanceService {
	activeProviderKey = process.env.CRYPTO_CURRENCY_PROVIDER;
	autoChangeUnavailableProviders = process.env.AUTOCHANGE_UNAVAILABLE_PROVIDER;

	setActiveProviderByName(name) {
		let key = Object.keys(providersNamesDict).find((key) => providersNamesDict[key] === name);
		return this.setActiveProviderByKey(providersKeysDict[key]);
	}

	setActiveProviderByKey(key) {
		if (!Object.values(providersKeysDict).includes(key)) {
			return false;
		}
		this.activeProviderKey = key;
		return true;
	}

	async getBtcUahRateAsync() {
		let providerInstance = this.getNewInstanceOfProviderByKey(this.activeProviderKey);
		let rateValue = await this.getBtcUahRateFromProviderAsync(providerInstance);
		if (!rateValue || isNaN(rateValue)) {
			log.error(
				`Unable to get rate value from active provider. AutoSwitch: ${
					this.autoChangeUnavailableProviders ? 'Enabled' : 'Disabled'
				}`
			);
			if (this.autoChangeUnavailableProviders) {
				for (let key in providersKeysDict) {
					let providerKey = providersKeysDict[key];
					if (providerKey !== this.activeProviderKey) {
						providerInstance = this.getNewInstanceOfProviderByKey(
							providersKeysDict[key]
						);
						rateValue = await this.getBtcUahRateFromProviderAsync(providerInstance);
						if (rateValue && !isNaN(rateValue)) break;
					}
				}
			}
		}
		return rateValue;
	}

	async getBtcUahRateFromProviderAsync(provider) {
		return await provider.createRateService().getBtcUahRateAsync();
	}

	getNewInstanceOfProviderByKey(key) {
		let providerInstance;
		switch (key) {
			case providersKeysDict.binance:
				providerInstance = new BinanceProvider();
				break;
			case providersKeysDict.coinbase:
				providerInstance = new CoinbaseProvider();
				break;
			case providersKeysDict.kuna:
				providerInstance = new KunaProvider();
				break;
			case providersKeysDict.nomics:
				providerInstance = new NomicsProvider();
				break;
			case providersKeysDict.test:
				if (process.env.NODE_ENV === 'test') {
					providerInstance = new TestProvider();
				} else {
					log.error('Test providers are used only for testing purposes!');
					return this.getNewInstanceOfProviderByKey('DEFAULT');
				}
				break;
			default:
				log.error(
					`Unknown or rejected provider with key "${key}". Available providers: ${Object.values(
						providersKeysDict
					)}`
				);
				return new BinanceProvider();
		}
		log.info(`Success set provider: ${providerInstance.providerName}`);
		return providerInstance;
	}
}

module.exports = FinanceService;
