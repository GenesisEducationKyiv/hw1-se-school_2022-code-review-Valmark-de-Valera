import { Module } from '@nestjs/common';
import { EmailService } from './email.service/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller/notification.controller';
import { NotificationService } from './notification.service/notification.service';
import { FileNotificationRepository } from './notification.repository/file.notification.repository';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [NotificationController],
	providers: [
		EmailService,
		NotificationService,
		FileNotificationRepository,
		{
			provide: 'SUBSCRIBERS_RMQ_SERVICE',
			useFactory: (configService: ConfigService) => {
				const user = configService.get('RABBITMQ_USER');
				const password = configService.get('RABBITMQ_PASSWORD');
				const host = configService.get('RABBITMQ_HOST');
				const queueName = configService.get('RABBITMQ_QUEUE_NAME');

				return ClientProxyFactory.create({
					transport: Transport.RMQ,
					options: {
						urls: [`amqp://${user}:${password}@${host}`],
						queue: queueName,
						queueOptions: {
							durable: true,
						},
					},
				});
			},
			inject: [ConfigService],
		},
	],
})
export class NotificationModule {}
