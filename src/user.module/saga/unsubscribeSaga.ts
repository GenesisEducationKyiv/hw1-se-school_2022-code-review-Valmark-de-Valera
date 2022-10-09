import { Builder, Saga } from 'nestjs-saga';
import { UserService } from '../user.service/user.service';
import {
	NotificationContractPatterns,
	NotificationSubscriberContract,
} from '../user.service/const/notification.contract.const';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class UnsubscribeSagaCommand {
	constructor(public email: string) {}
}

@Saga(UnsubscribeSagaCommand)
export class UnsubscribeSaga {
	private _userService: UserService;
	private _unsubscribeResult = false;
	private _subscribersRmqService: ClientProxy;

	constructor(
		_subscriberService: UserService,
		@Inject('SUBSCRIBERS_RMQ_SERVICE') _subscribersRmqService: ClientProxy,
	) {
		this._subscribersRmqService = _subscribersRmqService;
		this._userService = _subscriberService;
	}

	saga = new Builder<UnsubscribeSagaCommand, boolean>()
		.step('do something')
		.invoke(this.unsubscribe)
		.withCompensation(this.unsubscribeCompensation)
		.step()
		.invoke(this.sendUnsubscribe)
		.withCompensation(this.sendUnsubscribeCompensation)
		.return(this.buildResult)
		.build();

	unsubscribe(cmd: UnsubscribeSagaCommand) {
		this._unsubscribeResult = this._userService.unsubscribe(cmd.email);
		if (!this._unsubscribeResult) {
			throw new Error(`UnsubscribeError`);
		}
	}
	unsubscribeCompensation(cmd: UnsubscribeSagaCommand) {
		this._unsubscribeResult = !this._userService.subscribe(cmd.email);
		if (this._unsubscribeResult) {
			throw new Error(`Error reverting unsubscribe`);
		}
	}

	sendUnsubscribe(cmd: UnsubscribeSagaCommand) {
		const subscriberContract: NotificationSubscriberContract = { email: cmd.email };
		this._subscribersRmqService.emit(
			NotificationContractPatterns.removeSubscriber,
			subscriberContract,
		);
	}
	sendUnsubscribeCompensation(cmd: UnsubscribeSagaCommand) {
		const subscriberContract: NotificationSubscriberContract = { email: cmd.email };
		this._subscribersRmqService.emit(
			NotificationContractPatterns.addSubscriber,
			subscriberContract,
		);
	}

	buildResult(): boolean {
		return this._unsubscribeResult;
	}
}
