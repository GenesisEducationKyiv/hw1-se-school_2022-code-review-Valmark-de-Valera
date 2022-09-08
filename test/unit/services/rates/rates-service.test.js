let assert = require('assert');
const RatesService = require('../../../../services/rates/rates-service');
const {
	providersNamesDict,
	providersKeysDict,
} = require('../../../../services/rates/const/providers.const');

describe('RatesService', function () {
	describe('#changeProviderByNameAsync', function () {
		it('should change 2 rates provider and confirm it', async function () {
			const rateService = new RatesService();

			for (let key in providersNamesDict) {
				await rateService.changeProviderByNameAsync(providersNamesDict[key]);
				if (rateService.provider.providerName !== providersNamesDict[key])
					assert.fail(
						`Provider object with name '${providersNamesDict[key]}' is not valid`
					);
			}

			assert.ok(true);
		});
	});
	describe('#changeProviderByKeyAsync', function () {
		it('should change 2 rates provider and confirm it', async function () {
			const rateService = new RatesService();

			for (let key in providersKeysDict) {
				await rateService.changeProviderByKeyAsync(providersKeysDict[key]);
				if (rateService.provider.providerKey !== providersKeysDict[key])
					assert.fail(
						`Provider object with key '${providersKeysDict[key]}' is not valid`
					);
			}

			assert.ok(true);
		});
	});
});
