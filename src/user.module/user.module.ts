import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FinanceModule } from '../finance.module/finance.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller/user.controller';
import { UserService } from './user.service/user.service';
import { FileUserRepository } from './user.service/repository/file.user.repository';

@Module({
	imports: [ConfigModule.forRoot(), FinanceModule],
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
	exports: [FileUserRepository],
})
export class UserModule {}
