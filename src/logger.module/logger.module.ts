import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
	imports: [ConfigModule.forRoot()],
	providers: [
		LoggerService,
		{
			provide: 'SUBSCRIBERS_LOG_RMQ_SERVICE',
			useFactory: (configService: ConfigService) => {
				const user = configService.get('RABBITMQ_USER');
				const password = configService.get('RABBITMQ_PASSWORD');
				const host = configService.get('RABBITMQ_HOST');
				const queueName = configService.get('RABBITMQ_LOG_QUEUE_NAME');

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
		{
			provide: 'Default_Name',
			useValue: 'NEST',
		},
	],
	exports: [LoggerService],
})
export class LoggerModule {}
