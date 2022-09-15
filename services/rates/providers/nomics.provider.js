const BaseProvider = require('./base/base.provider');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const NomicsRateService = require('../provider-services/rate-services/nomics.rate-service');
require('dotenv').config();

class NomicsProvider extends BaseProvider {
	providerName = providersNamesDict.nomics;
	providerKey = providersKeysDict.nomics;
	token = process.env.NOMICS_PROVIDER_TOKEN;

	createRateService() {
		return new NomicsRateService(this.token);
	}
}

module.exports = NomicsProvider;
