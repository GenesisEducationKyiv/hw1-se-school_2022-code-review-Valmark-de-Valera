import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FinanceModule } from '../finance.module/finance.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller/user.controller';
import { UserService } from './user.service/user.service';
import { FileUserRepository } from './user.service/repository/file.user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { SagaModule } from 'nestjs-saga';
import { SubscribeSaga } from './saga/subscribeSaga';
import { UnsubscribeSaga } from './saga/unsubscribeSaga';

@Module({
	imports: [
		CqrsModule,
		SagaModule.register({
			imports: [UserModule, ConfigModule.forRoot()],
			sagas: [UnsubscribeSaga, SubscribeSaga],
			providers: [
				{
					provide: 'SUBSCRIBERS_RMQ_SERVICE',
					useFactory: (configService: ConfigService) => {
						const user = configService.get('RABBITMQ_USER');
						const password = configService.get('RABBITMQ_PASSWORD');
						const host = configService.get('RABBITMQ_HOST');
						const queueName = configService.get('RABBITMQ_QUEUE_NAME') ?? 'consumer';

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
		}),
		ConfigModule.forRoot(),
		FinanceModule,
	],
	controllers: [UserController],
	providers: [
		FileUserRepository,
		UserService,
		{
			provide: 'SUBSCRIBERS_RMQ_SERVICE',
			useFactory: (configService: ConfigService) => {
				const user = configService.get('RABBITMQ_USER');
				const password = configService.get('RABBITMQ_PASSWORD');
				const host = configService.get('RABBITMQ_HOST');
				const queueName = configService.get('RABBITMQ_QUEUE_NAME') ?? 'consumer';

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
	exports: [FileUserRepository, UserService],
})
export class UserModule {}
