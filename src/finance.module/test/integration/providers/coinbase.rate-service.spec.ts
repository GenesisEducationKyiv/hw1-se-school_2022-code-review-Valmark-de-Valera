import { Test, TestingModule } from '@nestjs/testing';
import { IRateService } from '../../../finance.service/provider-services/interfaces/interface.rate-service';
import { FinanceProviderFabric } from '../../../finance.service/finance-provider.fabric';
import { providersKeysDict } from '../../../finance.service/const/providers.const';
import { FinanceModule } from '../../../finance.module';

describe('CoinbaseRateService', () => {
	let service: IRateService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [FinanceModule],
		}).compile();

		const fabric = module.get<FinanceProviderFabric>(FinanceProviderFabric);
		service = fabric.getProviderByKey(providersKeysDict.coinbase).createRateService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const result = await service.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(`Provider should return number, not this: ${result}`);
		});
	});
});
