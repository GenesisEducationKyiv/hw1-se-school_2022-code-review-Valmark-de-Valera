import FinanceService from '../../../../src/services/rates/finance-service';
import {
	providersNamesDict,
	providersKeysDict,
} from '../../../../src/services/rates/const/providers.const';

describe('FinanceService', function () {
	describe('#setActiveProviderByName', function () {
		it('should change 2 rates provider and confirm it', function () {
			const financeService = new FinanceService();

			for (const key in providersNamesDict) {
				const provider = providersNamesDict[key as keyof typeof providersNamesDict];
				if (!financeService.setActiveProviderByName(provider)) {
					fail(`Provider object with name '${provider}' is not valid`);
				}
			}
		});
		it('should not change rate provider', function () {
			const financeService = new FinanceService();
			const providerName = '';

			const result = financeService.setActiveProviderByName(providerName);

			expect(result).toBeFalsy();
		});
	});
	describe('#setActiveProviderByKey', function () {
		it('should change 2 rates provider and confirm it', function () {
			const financeService = new FinanceService();

			for (const key in providersKeysDict) {
				const provider = providersKeysDict[key as keyof typeof providersKeysDict];
				if (!financeService.setActiveProviderByKey(provider)) {
					fail(`Provider object with key '${provider}' is not valid`);
				}
			}
		});
	});
});
