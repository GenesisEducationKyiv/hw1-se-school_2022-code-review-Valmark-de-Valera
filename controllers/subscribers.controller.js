const Subscriber = require('../models/subscriber.model');
const { validateEmail } = require('../services/utils');
const EmailService = require('../services/email-service');
const RatesController = require('./rates.controller');

class SubscribersController {
	static addSubscriber(email, response = undefined) {
		if (email && validateEmail(email)) {
			if (new Subscriber(email).append()) {
				response?.send('E-mail додано');
				return true;
			} else {
				response?.status(409).send('Вже є в базі');
				return false;
			}
		} else if (email) {
			response
				?.status(400)
				.send('Пошта не є вірною, перевірте введенні дані');
			return false;
		} else {
			response?.status(400).send('Відсутній параметр:  email');
			return false;
		}
	}

	static removeSubscriber(email, response = undefined) {
		if (email && validateEmail(email)) {
			if (new Subscriber(email).remove()) {
				response?.send('E-mail видалено');
				return true;
			} else {
				response?.status(404).send('Пошта вже видалена з бази даних');
				return false;
			}
		} else if (email) {
			response
				?.status(400)
				.send('Пошта не є вірною, перевірте введенні дані');
			return false;
		} else {
			response?.status(400).send('Відсутній параметр:  email');
			return false;
		}
	}

	static async sendEmailsToSubscribersAsync(response = undefined) {
		const allSubs = SubscribersController.getAllSubscribers();
		const resultArray = [];
		const emailService = new EmailService();
		console.log(`Sending emails to subscribers: ${allSubs}`);
		for (const item of allSubs) {
			resultArray.push({
				email: item,
				success: await emailService.sendRateMailAsync(
					item,
					await RatesController.getLastRateAsync()
				),
			});
		}
		console.log(resultArray);
		if (resultArray.length > 0) response?.send(resultArray);
		else response?.status(204).send('В базі відсутня пошта'); // Not return body message
		return resultArray;
	}

	static checkIfExist(email, response = undefined) {
		if (Subscriber.find(email)) {
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
