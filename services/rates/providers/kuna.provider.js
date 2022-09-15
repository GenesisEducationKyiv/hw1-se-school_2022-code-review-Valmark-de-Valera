const BaseProvider = require('./base/base.provider');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const KunaRateService = require('../provider-services/rate-services/kuna.rate-service');
require('dotenv').config();

class KunaProvider extends BaseProvider {
	providerName = providersNamesDict.kuna;
	providerKey = providersKeysDict.kuna;
	token = process.env.KUNA_PROVIDER_TOKEN;

	createRateService() {
		return new KunaRateService(this.token);
	}
}

module.exports = KunaProvider;
