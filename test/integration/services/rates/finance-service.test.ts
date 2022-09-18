const assert = require('assert');
const FinanceService = require('../../../../src/services/rates/finance-service');
const { providersKeysDict } = require('../../../../src/services/rates/const/providers.const');

describe('FinanceService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return valid rate value', async function () {
			const financeService = new FinanceService();
			financeService.autoChangeUnavailableProviders = false;

			const result = await financeService.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
			assert.ok(true);
		});
		it('should change provider if it return wrong value', async function () {
			const financeService = new FinanceService();
			financeService.autoChangeUnavailableProviders = true;
			financeService.setActiveProviderByKey(providersKeysDict.test);
			process.env.TEST_PROVIDER_FAIL = true;

			const result = await financeService.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
			assert.ok(true);
		});
	});
});
