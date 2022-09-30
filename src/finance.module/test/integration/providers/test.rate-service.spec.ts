import { Test, TestingModule } from '@nestjs/testing';
import { IRateService } from '../../../finance.service/provider-services/interfaces/interface.rate-service';
import { FinanceProviderFabric } from '../../../finance.service/finance-provider.fabric';
import { providersKeysDict } from '../../../finance.service/const/providers.const';
import { FinanceModule } from '../../../finance.module';
import { rateErrorsDict } from '../../../finance.service/const/error/rate-errors.const';
import { ConfigModule } from '@nestjs/config';

describe('TestRateService', () => {
	let service: IRateService;
	let fabric: FinanceProviderFabric;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [FinanceModule, ConfigModule],
		}).compile();

		fabric = module.get<FinanceProviderFabric>(FinanceProviderFabric);
		service = fabric.getProviderByKey(providersKeysDict.test).createRateService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const result = await service.getRateAsync();

			if (!result || isNaN(result))
				fail(`Provider should return number, not this: ${result}`);
		});
		it('should return error', async function () {
			process.env.TEST_PROVIDER_FAIL = String(true);
			service = fabric.getProviderByKey(providersKeysDict.test).createRateService();

			let result: number | null;
			try {
				result = await service.getRateAsync();
			} catch (err: any) {
				result = null;
				expect(err?.message).toBe(rateErrorsDict.INVALID_RATE_VALUE);
			}

			expect(result).toBeNull();
		});
	});
});
