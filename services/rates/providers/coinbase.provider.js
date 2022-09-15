const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const BaseProvider = require('./base/base.provider');
const CoinbaseRateService = require('../provider-services/rate-services/coinbase.rate-service');
require('dotenv').config();

class CoinbaseProvider extends BaseProvider {
	providerName = providersNamesDict.coinbase;
	providerKey = providersKeysDict.coinbase;
	token = process.env.COINBASE_PROVIDER_TOKEN;

	createRateService() {
		return new CoinbaseRateService(this.token);
	}
}

module.exports = CoinbaseProvider;
