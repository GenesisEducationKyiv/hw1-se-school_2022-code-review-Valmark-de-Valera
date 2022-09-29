import { ConfigModule } from '@nestjs/config';
import { FinanceModule } from './finance.module/finance.module';
import { CacheModule, Module } from '@nestjs/common';
import { NotificationModule } from './notification.module/notification.module';
import { UserModule } from './user.module/user.module';

@Module({
	imports: [
		CacheModule.register({
			ttl: Number(process.env.CACHE_EXPIRE_SECONDS) || 300,
		}),
		ConfigModule.forRoot(),
		FinanceModule,
		UserModule,
		NotificationModule,
	],
})
export class AppModule {}
