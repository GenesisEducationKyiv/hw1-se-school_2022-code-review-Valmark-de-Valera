import { Request, Response } from 'express';
import { validateEmail } from '../services/utils';
import SubscribersService from '../services/subscriber/subscriber-service';
import 'dotenv/config';
import { controller, httpDelete, httpGet, httpPost, interfaces } from 'inversify-express-utils';
import { DIServices } from '../DITypes';
import { inject } from 'inversify';

@controller('/api/subscriber')
class SubscribersController implements interfaces.Controller {
	private _subscribersService: SubscribersService;

	constructor(@inject(DIServices.SubscribersService) subscribersService: SubscribersService) {
		this._subscribersService = subscribersService;
	}

	@httpPost('/subscribe')
	addSubscriber(request: Request, response: Response) {
		const email = request.body?.email || '';
		if (!validateEmail(email)) {
			response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
		} else if (this._subscribersService.subscribe(email)) {
			response?.send('E-mail додано');
		} else {
			response?.status(409).send('Вже є в базі');
		}
	}

	@httpDelete('/unsubscribe')
	removeSubscriber(request: Request, response: Response) {
		const email = request.body?.email || '';
		if (!validateEmail(email)) {
			response?.status(400).send('Пошта не є вірною, перевірте введенні дані');
		} else if (this._subscribersService.unsubscribe(email)) {
			response?.send('E-mail видалено');
		} else {
			response?.status(404).send('Пошта вже видалена з бази даних');
		}
	}

	@httpPost('/sendEmails')
	async sendEmailsAsync(request: Request, response: Response) {
		const resultArray = await this._subscribersService.sendEmailsAsync();
		if (!resultArray) response?.status(400).send('Помилка виконання запиту до API провайдеру');
		else if (resultArray?.length) response?.send(resultArray);
		else response?.status(204).send();
	}

	checkIfExist(request: Request, response: Response) {
		const email = request.body?.email || '';
		if (this._subscribersService.isSubscribed(email)) {
			response?.send('Користувач існує');
		} else {
			response?.send('Користувача не існує');
		}
	}

	@httpGet('/subscribers')
	getAllSubscribers(request: Request, response: Response) {
		const subscribersArray = this._subscribersService.getAllSubscribers();
		response?.send(subscribersArray);
	}
}

export default SubscribersController;
