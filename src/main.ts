import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const host = process.env.SERVER_HOST || '0.0.0.0';
const port = Number(process.env.SERVER_PORT || '3000');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('"GSES2 BTC application')
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
	await app.listen(port, host);
}
bootstrap();
