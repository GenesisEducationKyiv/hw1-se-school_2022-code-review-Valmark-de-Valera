import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RateController } from './rate.controller/rate.controller';
import { FinanceService } from './finance.service/finance.service';
import { FinanceProviderFabric } from './finance.service/finance-provider.fabric';
import { RatePresenterFabric } from './rate.controller/presenter/rate-presenter.fabric';

@Module({
	imports: [
		CacheModule.register({
			ttl: Number(process.env.CACHE_EXPIRE_SECONDS) || 300,
		}),
		ConfigModule.forRoot(),
	],
	controllers: [RateController],
	providers: [FinanceService, FinanceProviderFabric, RatePresenterFabric],
	exports: [FinanceService],
})
export class FinanceModule {}
