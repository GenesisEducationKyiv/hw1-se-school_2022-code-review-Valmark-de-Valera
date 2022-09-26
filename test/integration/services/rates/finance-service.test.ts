import 'reflect-metadata';
import FinanceService from '../../../../src/services/rates/finance-service';
import { providersKeysDict } from '../../../../src/services/rates/const/providers.const';
import { container } from '../../../../src/inversify.config';
import { DIServices } from '../../../../src/DITypes';
import { presenterKeysDict } from '../../../../src/presenter/const/presenter.const';

describe('FinanceService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return valid rate value', async function () {
			const financeService: FinanceService = container.get(DIServices.FinanceService);
			financeService.autoChangeUnavailableProviders = false;

			const result = await financeService.getBtcUahRateAsync(presenterKeysDict.string);

			if (!result)
				fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
		});
		it('should change provider if it return wrong value', async function () {
			const financeService: FinanceService = container.get(DIServices.FinanceService);
			financeService.autoChangeUnavailableProviders = true;
			financeService.setActiveProviderByKey(providersKeysDict.test);
			process.env.TEST_PROVIDER_FAIL = String(true);

			const result = await financeService.getBtcUahRateAsync(presenterKeysDict.string);

			if (!result)
				fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
		});
	});
});
