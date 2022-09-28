import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import {
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiProduces,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { SubscriberService } from '../subscriber.service/subscriber.service';
import { Request, Response } from 'express';
import { SubscriberHttpModel } from '../models/subscriber.model';
import { subscriberErrorsDict } from './const/error/subscriber-errors.const';
import {
	isSubscriberExistDoc,
	sendEmailsDoc,
	subscribeDoc,
	subscribersDoc,
	unsubscribeDoc,
} from './const/subscriber-swagger.const';

@Controller('subscriber')
@ApiTags('subscription')
@ApiProduces('application/json')
export class SubscriberController {
	private _subscriberService: SubscriberService;

	constructor(_subscriberService: SubscriberService) {
		this._subscriberService = _subscriberService;
	}

	@Post('/subscribe')
	@ApiOperation(subscribeDoc.ApiOperation)
	@ApiConsumes(subscribeDoc.ApiConsumes[0])
	@ApiResponse(subscribeDoc.ApiResponses[0])
	@ApiResponse(subscribeDoc.ApiResponses[1])
	@ApiResponse(subscribeDoc.ApiResponses[2])
	@ApiBody(subscribeDoc.ApiBody[0])
	addSubscriber(
		@Req() req: Request,
		@Res() res: Response,
		@Body() subscriber: SubscriberHttpModel,
	) {
		const email = subscriber.email;
		const result = this._subscriberService.subscribe(email);
		result
			? res.send('E-mail додано')
			: res
					?.status(subscriberErrorsDict.EMAIL_ALREADY_EXIST.code)
					.send(subscriberErrorsDict.EMAIL_ALREADY_EXIST.message);
	}

	@Delete('/unsubscribe')
	@ApiOperation(unsubscribeDoc.ApiOperation)
	@ApiConsumes(unsubscribeDoc.ApiConsumes[0])
	@ApiResponse(unsubscribeDoc.ApiResponses[0])
	@ApiResponse(unsubscribeDoc.ApiResponses[1])
	@ApiResponse(unsubscribeDoc.ApiResponses[2])
	@ApiBody(unsubscribeDoc.ApiBody[0])
	removeSubscriber(
		@Req() req: Request,
		@Res() res: Response,
		@Body() subscriber: SubscriberHttpModel,
	) {
		const email = subscriber.email;
		const result = this._subscriberService.unsubscribe(email);
		result
			? res.send('E-mail видалено')
			: res
					.status(subscriberErrorsDict.EMAIL_ALREADY_DELETED.code)
					.send(subscriberErrorsDict.EMAIL_ALREADY_DELETED.message);
	}

	@Post('/sendEmails')
	@ApiOperation(sendEmailsDoc.ApiOperation)
	@ApiResponse(sendEmailsDoc.ApiResponses[0])
	@ApiResponse(sendEmailsDoc.ApiResponses[1])
	async sendEmailsAsync(@Req() req: Request, @Res() res: Response) {
		const resultArray = await this._subscriberService.sendEmailsAsync();
		if (!resultArray) {
			res.status(subscriberErrorsDict.EMAIL_SEND_ERROR.code).send(
				subscriberErrorsDict.EMAIL_SEND_ERROR.message,
			);
			return;
		}
		resultArray?.length
			? res?.send(resultArray)
			: res?.status(subscriberErrorsDict.NO_SUBSCRIBER.code).send();
	}

	@Post('/subscriberExist')
	@ApiOperation(isSubscriberExistDoc.ApiOperation)
	@ApiConsumes(isSubscriberExistDoc.ApiConsumes[0])
	@ApiResponse(isSubscriberExistDoc.ApiResponses[0])
	@ApiResponse(isSubscriberExistDoc.ApiResponses[1])
	@ApiBody(isSubscriberExistDoc.ApiBody[0])
	checkIfExist(@Req() req: Request, @Res() res: Response, @Body('email') email: string) {
		const result = this._subscriberService.isSubscribed(email);
		result ? res.send('Користувач існує') : res.status(404).send('Користувача не існує');
	}

	@Get('/subscribers')
	@ApiOperation(subscribersDoc.ApiOperation)
	@ApiResponse(subscribersDoc.ApiResponses[0])
	getAllSubscribers(@Req() req: Request, @Res() res: Response) {
		const subscribersArray = this._subscriberService.getAllSubscribers();
		res.send(subscribersArray);
	}
}
