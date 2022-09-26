import { Request, Response } from 'express';
import { validateEmail } from '../services/utils';
import SubscribersService from '../services/subscriber/subscriber-service';
import 'dotenv/config';
import { controller, httpDelete, httpGet, httpPost, interfaces } from 'inversify-express-utils';
import { DIServices } from '../DITypes';
import { inject } from 'inversify';
import { subscriberErrorsDict } from '../models/error/const/subscriber-errors.const';

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
			response
				.status(subscriberErrorsDict.INVALID_EMAIL_VALIDATION.code)
				.send(subscriberErrorsDict.INVALID_EMAIL_VALIDATION.message);
			return;
		}
		const result = this._subscribersService.subscribe(email);
		result
			? response.send('E-mail додано')
			: response
					?.status(subscriberErrorsDict.EMAIL_ALREADY_EXIST.code)
					.send(subscriberErrorsDict.EMAIL_ALREADY_EXIST.message);
	}

	@httpDelete('/unsubscribe')
	removeSubscriber(request: Request, response: Response) {
		const email = request.body?.email || '';
		if (!validateEmail(email)) {
			response
				.status(subscriberErrorsDict.INVALID_EMAIL_VALIDATION.code)
				.send(subscriberErrorsDict.INVALID_EMAIL_VALIDATION.message);
			return;
		}
		const result = this._subscribersService.unsubscribe(email);
		result
			? response.send('E-mail видалено')
			: response
					.status(subscriberErrorsDict.EMAIL_ALREADY_DELETED.code)
					.send(subscriberErrorsDict.EMAIL_ALREADY_DELETED.message);
	}

	@httpPost('/sendEmails')
	async sendEmailsAsync(request: Request, response: Response) {
		const resultArray = await this._subscribersService.sendEmailsAsync();
		if (!resultArray) {
			response
				.status(subscriberErrorsDict.EMAIL_SEND_ERROR.code)
				.send(subscriberErrorsDict.EMAIL_SEND_ERROR.message);
			return;
		}
		resultArray?.length
			? response?.send(resultArray)
			: response?.status(subscriberErrorsDict.NO_SUBSCRIBER.code).send();
	}

	checkIfExist(request: Request, response: Response) {
		const email = request.body?.email || '';
		const result = this._subscribersService.isSubscribed(email);
		result ? response.send('Користувач існує') : response.send('Користувача не існує');
	}

	@httpGet('/subscribers')
	getAllSubscribers(request: Request, response: Response) {
		const subscribersArray = this._subscribersService.getAllSubscribers();
		response.send(subscribersArray);
	}
}

export default SubscribersController;
