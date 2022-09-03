const Subscriber = require('../models/subscriber.model');
const { validateEmail } = require('../services/utils');
const EmailService = require('../services/email-service');
const BinanceProvider = require('../services/providers/binance.provider');

class SubscribersController {
	static addSubscriber(email, response = undefined) {
		if (!email) {
			response?.status(400).send('Відсутній параметр:  email');
			return false;
		}
		if (!validateEmail(email)) {
			response
				?.status(400)
				.send('Пошта не є вірною, перевірте введенні дані');
			return false;
		}
		if (new Subscriber(email).append()) {
			response?.send('E-mail додано');
			return true;
		} else {
			response?.status(409).send('Вже є в базі');
			return false;
		}
	}

	static removeSubscriber(email, response = undefined) {
		if (!email) {
			response?.status(400).send('Відсутній параметр:  email');
			return false;
		}
		if (!validateEmail(email)) {
			response
				?.status(400)
				.send('Пошта не є вірною, перевірте введенні дані');
			return false;
		}
		if (new Subscriber(email).remove()) {
			response?.send('E-mail видалено');
			return true;
		} else {
			response?.status(404).send('Пошта вже видалена з бази даних');
			return false;
		}
	}

	static async sendEmailsAsync(response = undefined) {
		const allSubs = Subscriber.getAll();
		const resultArray = [];
		const emailService = new EmailService();
		console.log(`Sending emails to subscribers: ${allSubs}`);
		for (const item of allSubs) {
			resultArray.push({
				email: item,
				success: await emailService.sendRateMailAsync(
					item,
					await new BinanceProvider().getBtcUahRateAsync()
				),
			});
		}
		console.log(resultArray);
		if (resultArray.length > 0) response?.send(resultArray);
		else response?.status(204);
		return resultArray;
	}

	static checkIfExist(email, response = undefined) {
		if (Subscriber.includes(email)) {
			response?.send('Користувач існує');
			return true;
		} else {
			response?.send('Користувача не існує');
			return false;
		}
	}

	static getAllSubscribers(response = undefined) {
		const subscribersArray = Subscriber.getAll();
		response?.send(subscribersArray);
		return subscribersArray;
	}
}

module.exports = SubscribersController;
