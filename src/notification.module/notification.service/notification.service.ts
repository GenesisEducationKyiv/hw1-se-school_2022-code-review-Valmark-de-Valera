import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email.service/email.service';
import { FileNotificationRepository } from '../notification.repository/file.notification.repository';
import { MailResultResponse } from '../models/notification-result.model';

@Injectable()
export class NotificationService {
	private readonly logger = new Logger(NotificationService.name);
	private _emailService: EmailService;
	private _notificationRepository: FileNotificationRepository;

	constructor(_emailService: EmailService, _notificationRepository: FileNotificationRepository) {
		this._notificationRepository = _notificationRepository;
		this._emailService = _emailService;
	}

	subscribeToNotifications(email: string) {
		this._notificationRepository.append(email);
	}

	unsubscribeFromNotifications(email: string) {
		this._notificationRepository.remove(email);
	}

	async sendRateMailAsync(rateString: string, emailCountValidation?: number) {
		const subscribers = this._notificationRepository.getAll();
		const notificationResult: MailResultResponse[] = [];
		if (subscribers.length !== emailCountValidation) {
			this.logger.error(
				`Invalid emails count. Please check databases in monolith and notification microservice`,
			);
			throw new Error(
				`Invalid emails count. Please check databases in monolith and notification microservice`,
			);
		}

		for (const index in subscribers) {
			const sendResult = await this._emailService.sendRateMailAsync(
				subscribers[index],
				rateString,
			);
			const mailResult: MailResultResponse = {
				email: subscribers[index],
				info: {
					type: 'email',
					result: sendResult,
				},
			};
			notificationResult.push(mailResult);
		}
		this.logger.log(`Sent rate to emails: ${JSON.stringify(notificationResult)}`);
		return notificationResult;
	}
}
