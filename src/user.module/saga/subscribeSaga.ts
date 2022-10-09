import { Builder, Saga } from 'nestjs-saga';
import { UserService } from '../user.service/user.service';
import {
	NotificationContractPatterns,
	NotificationSubscriberContract,
} from '../user.service/const/notification.contract.const';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class SubscribeSagaCommand {
	constructor(public email: string) {}
}

@Saga(SubscribeSagaCommand)
export class SubscribeSaga {
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

	saga = new Builder<SubscribeSagaCommand, boolean>()
		.step('do something')
		.invoke(this.subscribe)
		.withCompensation(this.subscribeCompensation)
		.step()
		.invoke(this.sendSubscribe)
		.withCompensation(this.sendSubscribeCompensation)
		.return(this.buildResult)
		.build();

	subscribe(cmd: SubscribeSagaCommand) {
		this._unsubscribeResult = this._userService.subscribe(cmd.email);
		if (!this._unsubscribeResult) {
			throw new Error(`Error calling subscribe`);
		}
	}
	subscribeCompensation(cmd: SubscribeSagaCommand) {
		this._unsubscribeResult = !this._userService.unsubscribe(cmd.email);
		if (this._unsubscribeResult) {
			throw new Error(`Error reverting subscribe`);
		}
	}

	sendSubscribe(cmd: SubscribeSagaCommand) {
		const subscriberContract: NotificationSubscriberContract = { email: cmd.email };
		this._subscribersRmqService.emit(
			NotificationContractPatterns.addSubscriber,
			subscriberContract,
		);
	}
	sendSubscribeCompensation(cmd: SubscribeSagaCommand) {
		const subscriberContract: NotificationSubscriberContract = { email: cmd.email };
		this._subscribersRmqService.emit(
			NotificationContractPatterns.removeSubscriber,
			subscriberContract,
		);
	}

	buildResult(): boolean {
		return this._unsubscribeResult;
	}
}
