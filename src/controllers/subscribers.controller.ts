import { Response } from 'express';
import { validateEmail } from '../services/utils';
import SubscribersService from '../services/subscriber/subscriber-service';
import 'dotenv/config';

class SubscribersController {
	static subscribersService = new SubscribersService();

	static addSubscriber(email: string, response: Response) {
		if (!email) {
			response?.status(400).send('Відсутній параметр: email');
		}
		if (!validateEmail(email)) {
			response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
		}
		if (this.subscribersService.subscribe(email)) {
			response?.send('E-mail додано');
		} else {
			response?.status(409).send('Вже є в базі');
		}
	}

	static removeSubscriber(email: string, response: Response) {
		if (!email) {
			response?.status(400).send('Відсутній параметр:  email');
		}
		if (!validateEmail(email)) {
			response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
		}
		if (this.subscribersService.unsubscribe(email)) {
			response?.send('E-mail видалено');
		} else {
			response?.status(404).send('Пошта вже видалена з бази даних');
		}
	}

	static async sendEmailsAsync(response: Response) {
		const resultArray = await this.subscribersService.sendEmailsAsync();
		if (!resultArray) response?.status(400).send('Помилка виконання запиту до API провайдеру');
		if (resultArray?.length) response?.send(resultArray);
		else response?.status(204).send();
	}

	static checkIfExist(email: string, response: Response) {
		if (this.subscribersService.isSubscribed(email)) {
			response?.send('Користувач існує');
		} else {
			response?.send('Користувача не існує');
		}
	}

	static getAllSubscribers(response: Response) {
		const subscribersArray = this.subscribersService.getAllSubscribers();
		response?.send(subscribersArray);
		return subscribersArray;
	}
}

export default SubscribersController;
