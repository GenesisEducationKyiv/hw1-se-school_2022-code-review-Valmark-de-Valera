let assert = require('assert');
const RatesService = require('../../../../services/rates/rates-service');
const {
	providersNamesDict,
	providersKeysDict,
} = require('../../../../services/rates/const/providers.const');

describe('RatesService', function () {
	describe('#changeProviderByName', function () {
		it('should change 2 rates provider and confirm it', function () {
			const rateService = new RatesService();

			for (let key in providersNamesDict) {
				rateService.changeProviderByName(providersNamesDict[key]);
				if (rateService.provider.providerName !== providersNamesDict[key])
					assert.fail(
						`Provider object with name '${providersNamesDict[key]}' is not valid`
					);
			}

			assert.ok(true);
		});
	});
	describe('#changeProviderByKey', function () {
		it('should change 2 rates provider and confirm it', function () {
			const rateService = new RatesService();

			for (let key in providersKeysDict) {
				rateService.changeProviderByKey(providersKeysDict[key]);
				if (rateService.provider.providerKey !== providersKeysDict[key])
					assert.fail(
						`Provider object with key '${providersKeysDict[key]}' is not valid`
					);
			}

			assert.ok(true);
		});
	});
});
