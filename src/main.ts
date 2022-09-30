import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const serverHost = process.env.SERVER_HOST || '0.0.0.0';
const serverPort = Number(process.env.SERVER_PORT || '3000');
const rmqUser = process.env.RABBITMQ_USER || 'admin';
const rmqPassword = process.env.RABBITMQ_PASSWORD || 'admin';
const rmqHost = process.env.RABBITMQ_HOST || '0.0.0.0:5672';
const rmqQueueName = process.env.RABBITMQ_QUEUE_NAME || 'queue';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('GSES2 BTC application')
		.setDescription(
			'\nТобі потрібно реалізувати сервіс з АРІ, який дозволить: \n- дізнатись поточний курс біткоіну (BTC) у гривні (UAH)\n- підписати емейл на отримання інформації по зміні курсу\n- запит, який відправить всім підписаним користувачам актуальний курс. \n\nДодаткові вимоги:\n1. Сервіс має відповідати описаному ниже АРІ. <i>NB Закривати рішення аутентифікацією не потрібно</i>. \n2. Всі данні, для роботи додатку повинні зберігатися в файлах (підключати базу данних не потрібно). Тобто, потрібно реалізувати збереження та роботу з даними (наприклад, електронними адресами) через файлову систему.\n3. В репозиторії повинен бути Dockerfile, який дозволяє запустити систему в Docker. З матеріалом по Docker вам необхідно ознайомитись самостійно.\n4. Також ти можеш додавати коментарі чи опис логіки виконання роботи в README.md документі. Правильна логіка може стати перевагою при оцінюванні, якщо ти не повністю виконаєш завдання.\n\nОчікувані мови виконання завдання: PHP, Go, JavaScript (Node.js).  Виконувати завдання іншими мовами можна, проте, це не буде перевагою.\nВиконане завдання необхідно завантажити на GitHub (публічний репозиторій) та сабмітнути виконане завдання в гугл-форму.\n\nТи можеш користуватися усією доступною інформацією, але виконуй завдання самостійно. \nУспіхів! ',
		)
		.setVersion('4.1.0')
		.addTag('rate', 'Отримання поточного курсу BTC до UAH')
		.addTag('subscription', 'Робота з підпискою')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/', app, document);
	app.useGlobalPipes(new ValidationPipe());

	await app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [`amqp://${rmqUser}:${rmqPassword}@${rmqHost}`],
			queue: rmqQueueName,
			queueOptions: {
				durable: true,
			},
		},
	});

	await app.startAllMicroservices();
	await app.listen(serverPort, serverHost);
}
bootstrap();
