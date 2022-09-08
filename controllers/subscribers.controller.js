const Subscriber = require('../models/subscriber.model');
const SubscriberRepository = require('../repository/subscriber.repository');
const { validateEmail } = require('../services/utils');
const EmailService = require('../services/email/email-service');
const RateService = require('../services/rates/rates-service');

class SubscribersController {
	static subscriberRepository = new SubscriberRepository();

	static addSubscriber(email, response = undefined) {
		if (!email) {
			response?.status(400).send('Відсутній параметр: email');
			return false;
		}
		if (!validateEmail(email)) {
			response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
			return false;
		}
		if (this.subscriberRepository.append(new Subscriber(email))) {
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
			response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
			return false;
		}
		if (this.subscriberRepository.remove(new Subscriber(email))) {
			response?.send('E-mail видалено');
			return true;
		} else {
			response?.status(404).send('Пошта вже видалена з бази даних');
			return false;
		}
	}

	static async sendEmailsAsync(
		response = undefined,
		receivers = this.subscriberRepository.getAll()
	) {
		const resultArray = [];
		const emailService = new EmailService();
		const rateService = new RateService();
		console.log(`Sending emails to subscribers: ${receivers}`);
		for (const item of receivers) {
			resultArray.push({
				email: item.email,
				success: await emailService.sendRateMailAsync(
					item,
					await rateService.getBtcUahRateAsync()
				),
			});
		}
		console.log(resultArray);
		if (resultArray.length) response?.send(resultArray);
		else response?.status(204);
		return resultArray;
	}

	static checkIfExist(email, response = undefined) {
		if (this.subscriberRepository.includes(email)) {
			response?.send('Користувач існує');
			return true;
		} else {
			response?.send('Користувача не існує');
			return false;
		}
	}

	static getAllSubscribers(response = undefined) {
		const subscribersArray = this.subscriberRepository.getAll();
		response?.send(subscribersArray);
		return subscribersArray;
	}
}

module.exports = SubscribersController;
