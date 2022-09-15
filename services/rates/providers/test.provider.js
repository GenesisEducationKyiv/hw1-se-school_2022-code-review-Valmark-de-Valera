const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const BaseProvider = require('./base/base.provider');
const TestRateService = require('../provider-services/rate-services/test.rate-service');
require('dotenv').config();

class TestProvider extends BaseProvider {
	providerName = providersNamesDict.test;
	providerKey = providersKeysDict.test;
	token = process.env.TEST_PROVIDER_TOKEN;

	createRateService() {
		return new TestRateService(this.token);
	}
}

module.exports = TestProvider;
