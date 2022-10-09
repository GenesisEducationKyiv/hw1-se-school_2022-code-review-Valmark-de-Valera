import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotificationService } from '../notification.service/notification.service';
import {
	ContractPatterns,
	ErrorContract,
	RateContract,
	SubscriberContract,
} from './const/contract.const';

@Controller('notification')
export class NotificationController {
	private readonly logger = new Logger(NotificationController.name);
	private _notificationService: NotificationService;

	constructor(_notificationService: NotificationService) {
		this._notificationService = _notificationService;
	}

	@EventPattern(ContractPatterns.addSubscriber)
	async addSubscriber(subscriber: SubscriberContract) {
		try {
			this._notificationService.subscribeToNotifications(subscriber.email);
			this.logger.log(`Add subscriber: ${JSON.stringify(subscriber)}`);
		} catch (e) {
			const errorMessage: ErrorContract = { message: e.message };
			return errorMessage;
		}
	}

	@EventPattern(ContractPatterns.removeSubscriber)
	async removeSubscriber(subscriber: SubscriberContract) {
		try {
			this._notificationService.unsubscribeFromNotifications(subscriber.email);
			this.logger.log(`Remove subscriber: ${JSON.stringify(subscriber)}`);
		} catch (e) {
			const errorMessage: ErrorContract = { message: e.message };
			return errorMessage;
		}
	}

	@EventPattern(ContractPatterns.sendRate)
	async sendRate(data: RateContract) {
		try {
			const result = await this._notificationService.sendRateMailAsync(
				data.rate.toString(),
				data.countOfEmails,
			);
			this.logger.log(`Send rate subscriber: ${JSON.stringify(result)}`);
			return result;
		} catch (e) {
			const errorMessage: ErrorContract = { message: e.message };
			return errorMessage;
		}
	}
}
