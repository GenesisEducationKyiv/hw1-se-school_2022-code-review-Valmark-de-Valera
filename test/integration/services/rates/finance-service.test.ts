import FinanceService from '../../../../src/services/rates/finance-service';
import { providersKeysDict } from '../../../../src/services/rates/const/providers.const';

describe('FinanceService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return valid rate value', async function () {
			const financeService = new FinanceService();
			financeService.autoChangeUnavailableProviders = false;

			const result = await financeService.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
		});
		it('should change provider if it return wrong value', async function () {
			const financeService = new FinanceService();
			financeService.autoChangeUnavailableProviders = true;
			financeService.setActiveProviderByKey(providersKeysDict.test);
			process.env.TEST_PROVIDER_FAIL = String(true);

			const result = await financeService.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
		});
	});
});