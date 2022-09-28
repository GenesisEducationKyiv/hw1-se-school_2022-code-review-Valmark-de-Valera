import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from '../../finance.service/finance.service';
import { providersKeysDict } from '../../finance.service/const/providers.const';
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

	describe('#getBtcUahRateAsync', function () {
		it('should return valid rate value', async function () {
			service.autoChangeUnavailableProviders = false;

			const result = await service.getBtcUahRateAsync();

			if (!result)
				fail(
					`Service should change rate provider and return valid number, not this: ${result}`,
				);
		});
		it('should change provider if it return wrong value', async function () {
			service.autoChangeUnavailableProviders = true;
			process.env.TEST_PROVIDER_FAIL = String(true);
			service.setActiveProviderByKey(providersKeysDict.test);

			const result = await service.getBtcUahRateAsync();

			if (!result)
				fail(
					`Service should change rate provider and return valid number, not this: ${result}`,
				);
		});
	});
});
