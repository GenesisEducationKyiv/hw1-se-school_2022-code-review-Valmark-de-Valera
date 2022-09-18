const assert = require('assert');
const FinanceService = require('../../../../src/services/rates/finance-service');
const {
	providersNamesDict,
	providersKeysDict,
} = require('../../../../src/services/rates/const/providers.const');

describe('FinanceService', function () {
	describe('#setActiveProviderByName', function () {
		it('should change 2 rates provider and confirm it', function () {
			const financeService = new FinanceService();

			for (const key in providersNamesDict) {
				if (!financeService.setActiveProviderByName(providersNamesDict[key])) {
					assert.fail(
						`Provider object with name '${providersNamesDict[key]}' is not valid`
					);
				}
			}

			assert.ok(true);
		});
		it('should not change rate provider', function () {
			const financeService = new FinanceService();
			const providerName = null;

			const result = financeService.setActiveProviderByName(providerName);

			assert.ok(!result);
		});
	});
	describe('#setActiveProviderByKey', function () {
		it('should change 2 rates provider and confirm it', function () {
			const financeService = new FinanceService();

			for (const key in providersKeysDict) {
				if (!financeService.setActiveProviderByKey(providersKeysDict[key])) {
					assert.fail(
						`Provider object with key '${providersKeysDict[key]}' is not valid`
					);
				}
			}

			assert.ok(true);
		});
	});
});
