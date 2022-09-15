const BaseProvider = require('./base/base.provider');
const BinanceRateService = require('../provider-services/rate-services/binance.rate-service');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
require('dotenv').config();

class BinanceProvider extends BaseProvider {
	providerName = providersNamesDict.binance;
	providerKey = providersKeysDict.binance;
	token = process.env.BINANCE_PROVIDER_TOKEN;

	createRateService() {
		return new BinanceRateService(this.token);
	}
}

module.exports = BinanceProvider;
