import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import {
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiProduces,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserErrorsDict } from './const/error/errors.const';
import {
	isSubscriberExistDoc,
	sendEmailsDoc,
	subscribeDoc,
	subscribersDoc,
	unsubscribeDoc,
} from './const/subscriber-swagger.const';
import { UserService } from '../user.service/user.service';
import { UserHttpModel } from '../models/user.model';

@Controller('subscriber')
@ApiTags('subscription')
@ApiProduces('application/json')
export class UserController {
	private _userService: UserService;

	constructor(_subscriberService: UserService) {
		this._userService = _subscriberService;
	}

	@Post('/subscribe')
	@ApiOperation(subscribeDoc.ApiOperation)
	@ApiConsumes(subscribeDoc.ApiConsumes[0])
	@ApiResponse(subscribeDoc.ApiResponses[0])
	@ApiResponse(subscribeDoc.ApiResponses[1])
	@ApiResponse(subscribeDoc.ApiResponses[2])
	@ApiBody(subscribeDoc.ApiBody[0])
	addSubscriber(@Req() req: Request, @Res() res: Response, @Body() subscriber: UserHttpModel) {
		const email = subscriber.email;
		const result = this._userService.subscribe(email);
		result
			? res.send('E-mail додано')
			: res
					?.status(UserErrorsDict.EMAIL_ALREADY_EXIST.code)
					.send(UserErrorsDict.EMAIL_ALREADY_EXIST.message);
	}

	@Delete('/unsubscribe')
	@ApiOperation(unsubscribeDoc.ApiOperation)
	@ApiConsumes(unsubscribeDoc.ApiConsumes[0])
	@ApiResponse(unsubscribeDoc.ApiResponses[0])
	@ApiResponse(unsubscribeDoc.ApiResponses[1])
	@ApiResponse(unsubscribeDoc.ApiResponses[2])
	@ApiBody(unsubscribeDoc.ApiBody[0])
	removeSubscriber(@Req() req: Request, @Res() res: Response, @Body() subscriber: UserHttpModel) {
		const email = subscriber.email;
		const result = this._userService.unsubscribe(email);
		result
			? res.send('E-mail видалено')
			: res
					.status(UserErrorsDict.EMAIL_ALREADY_DELETED.code)
					.send(UserErrorsDict.EMAIL_ALREADY_DELETED.message);
	}

	@Post('/sendEmails')
	@ApiOperation(sendEmailsDoc.ApiOperation)
	@ApiResponse(sendEmailsDoc.ApiResponses[0])
	@ApiResponse(sendEmailsDoc.ApiResponses[1])
	async sendEmailsAsync(@Req() req: Request, @Res() res: Response) {
		let result;
		try {
			result = await this._userService.sendEmailsAsync();
			res?.send(result);
		} catch (e) {
			res.status(UserErrorsDict.EMAIL_SEND_ERROR.code).send(
				`${UserErrorsDict.EMAIL_SEND_ERROR.message}. ${e.message}`,
			);
			return;
		}
	}

	@Post('/subscriberExist')
	@ApiOperation(isSubscriberExistDoc.ApiOperation)
	@ApiConsumes(isSubscriberExistDoc.ApiConsumes[0])
	@ApiResponse(isSubscriberExistDoc.ApiResponses[0])
	@ApiResponse(isSubscriberExistDoc.ApiResponses[1])
	@ApiBody(isSubscriberExistDoc.ApiBody[0])
	checkIfExist(@Req() req: Request, @Res() res: Response, @Body('email') email: string) {
		const result = this._userService.isSubscribed(email);
		result ? res.send('Користувач існує') : res.status(404).send('Користувача не існує');
	}

	@Get('/subscribers')
	@ApiOperation(subscribersDoc.ApiOperation)
	@ApiResponse(subscribersDoc.ApiResponses[0])
	getAllUsers(@Req() req: Request, @Res() res: Response) {
		const subscribersArray = this._userService.getAllSubscribers();
		res.send(subscribersArray);
	}
}
