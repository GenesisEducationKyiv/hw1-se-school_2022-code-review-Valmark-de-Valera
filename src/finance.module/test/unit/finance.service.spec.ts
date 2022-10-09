import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from '../../finance.service/finance.service';
import { providersKeysDict, providersNamesDict } from '../../finance.service/const/providers.const';
import { FinanceModule } from '../../finance.module';

describe('FinanceService', () => {
	let service: FinanceService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [FinanceModule],
		}).compile();

		service = module.get<FinanceService>(FinanceService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('#setActiveProviderByName', function () {
		it('should change 2 rates provider and confirm it', function () {
			for (const key in providersNamesDict) {
				const provider = providersNamesDict[key as keyof typeof providersNamesDict];
				if (!service.setActiveProviderByName(provider)) {
					fail(`Provider object with name '${provider}' is not valid`);
				}
			}
		});
		it('should not change rate provider', function () {
			const providerName = '';

			const result = service.setActiveProviderByName(providerName);

			expect(result).toBeFalsy();
		});
	});

	describe('#setActiveProviderByKey', function () {
		it('should change 2 rates provider and confirm it', function () {
			for (const key in providersKeysDict) {
				const provider = providersKeysDict[key as keyof typeof providersKeysDict];
				if (!service.setActiveProviderByKey(provider)) {
					fail(`Provider object with key '${provider}' is not valid`);
				}
			}
		});
	});
});
