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
import { CommandBus } from '@nestjs/cqrs';
import { SubscribeSagaCommand } from '../saga/subscribeSaga';
import { UnsubscribeSagaCommand } from '../saga/unsubscribeSaga';

@Controller('subscriber')
@ApiTags('subscription')
@ApiProduces('application/json')
export class UserController {
	private _userService: UserService;
	private _commandBus: CommandBus;

	constructor(_subscriberService: UserService, _commandBus: CommandBus) {
		this._userService = _subscriberService;
		this._commandBus = _commandBus;
	}

	@Post('/subscribe')
	@ApiOperation(subscribeDoc.ApiOperation)
	@ApiConsumes(subscribeDoc.ApiConsumes[0])
	@ApiResponse(subscribeDoc.ApiResponses[0])
	@ApiResponse(subscribeDoc.ApiResponses[1])
	@ApiResponse(subscribeDoc.ApiResponses[2])
	@ApiBody(subscribeDoc.ApiBody[0])
	async addSubscriber(
		@Req() req: Request,
		@Res() res: Response,
		@Body() subscriber: UserHttpModel,
	) {
		const email = subscriber.email;
		try {
			await this._commandBus.execute(new SubscribeSagaCommand(email));
			res.send('E-mail додано');
		} catch (e) {
			res?.status(UserErrorsDict.EMAIL_ALREADY_EXIST.code).send(
				UserErrorsDict.EMAIL_ALREADY_EXIST.message,
			);
		}
	}

	@Delete('/unsubscribe')
	@ApiOperation(unsubscribeDoc.ApiOperation)
	@ApiConsumes(unsubscribeDoc.ApiConsumes[0])
	@ApiResponse(unsubscribeDoc.ApiResponses[0])
	@ApiResponse(unsubscribeDoc.ApiResponses[1])
	@ApiResponse(unsubscribeDoc.ApiResponses[2])
	@ApiBody(unsubscribeDoc.ApiBody[0])
	async removeSubscriber(
		@Req() req: Request,
		@Res() res: Response,
		@Body() subscriber: UserHttpModel,
	) {
		const email = subscriber.email;
		try {
			await this._commandBus.execute(new UnsubscribeSagaCommand(email));
			res.send('E-mail видалено');
		} catch (e) {
			res.status(UserErrorsDict.EMAIL_ALREADY_DELETED.code).send(
				UserErrorsDict.EMAIL_ALREADY_DELETED.message,
			);
		}
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
