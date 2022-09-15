const log = require('../services/logger')('SubscribersController');
const { validateEmail } = require('../services/utils');
const EmailService = require('../services/email/email-service');
const RateService = require('../services/rates/finance-service');
const SubscribersService = require('../services/subscriber/subscriber-service');

class SubscribersController {
	static subscribersService = new SubscribersService();

	static addSubscriber(email, response = undefined) {
		if (!email) {
			response?.status(400).send('Відсутній параметр: email');
			return false;
		}
		if (!validateEmail(email)) {
			response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
			return false;
		}
		if (this.subscribersService.subscribe(email)) {
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
		if (this.subscribersService.unsubscribe(email)) {
			response?.send('E-mail видалено');
			return true;
		} else {
			response?.status(404).send('Пошта вже видалена з бази даних');
			return false;
		}
	}

	static async sendEmailsAsync(
		response = undefined,
		receivers = this.subscribersService.getAllSubscribers()
	) {
		const emailService = new EmailService();
		const rateService = new RateService();
		const resultArray = [];
		const receiversEmail = [];
		receivers.map((item) => receiversEmail.push(item.email));
		for (const item of receiversEmail) {
			resultArray.push({
				email: item,
				success: await emailService.sendRateMailAsync(
					item,
					await rateService.getBtcUahRateAsync()
				),
			});
		}
		log.info('Sent rate to emails with result: ${resultArray}');
		if (resultArray.length) response?.send(resultArray);
		else response?.status(204);
		return resultArray;
	}

	static checkIfExist(email, response = undefined) {
		if (this.subscribersService.isSubscribed(email)) {
			response?.send('Користувач існує');
			return true;
		} else {
			response?.send('Користувача не існує');
			return false;
		}
	}

	static getAllSubscribers(response = undefined) {
		const subscribersArray = this.subscribersService.getAllSubscribers();
		response?.send(subscribersArray);
		return subscribersArray;
	}
}

module.exports = SubscribersController;
