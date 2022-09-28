import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service/subscriber.service';
import { SubscriberController } from './subscriber.controller/subscriber.controller';
import { FileSubscriberRepository } from './subscriber.service/repository/file.subscriber.repository';
import { ConfigModule } from '@nestjs/config';
import { FinanceModule } from '../finance.module/finance.module';
import { NotificationModule } from '../notification.module/notification.module';

@Module({
	imports: [ConfigModule.forRoot(), FinanceModule, NotificationModule],
	controllers: [SubscriberController],
	providers: [FileSubscriberRepository, SubscriberService],
	exports: [FileSubscriberRepository],
})
export class SubscriberModule {}
