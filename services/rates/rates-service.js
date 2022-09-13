const log = require('../logger')('RatesService');
const BinanceProvider = require('./providers/binance.provider');
const TestProvider = require('./providers/test.provider');
const { providersNamesDict, providersKeysDict } = require('./const/providers.const');

class RatesService {
	provider = new BinanceProvider();

	async changeProviderByNameAsync(name) {
		let key = Object.keys(providersNamesDict).find((key) => providersNamesDict[key] === name);
		return await this.changeProviderByKeyAsync(providersKeysDict[key]);
	}

	async changeProviderByKeyAsync(key) {
		switch (key) {
			case providersKeysDict.binance:
				this.provider = new BinanceProvider();
				break;
			case providersKeysDict.test:
				this.provider = new TestProvider();
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
		return true;
	}

	async getBtcUahRateAsync() {
		return this.provider.getBtcUahRateAsync();
	}
}

module.exports = RatesService;
