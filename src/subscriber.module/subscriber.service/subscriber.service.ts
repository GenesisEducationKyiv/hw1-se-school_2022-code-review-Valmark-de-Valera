import { Injectable, Logger } from '@nestjs/common';
import { FileSubscriberRepository } from './repository/file.subscriber.repository';
import { Subscriber } from '../models/subscriber.model';
import { SubscriberMailResultResponse } from '../subscriber.controller/models/subscriber.mail-result.model';
import { FinanceService } from '../../finance.module/finance.service/finance.service';
import { EmailService } from '../../notification.module/email.service/email.service';

@Injectable()
export class SubscriberService {
	private readonly logger = new Logger(SubscriberService.name);
	private _emailService: EmailService;
	private _financeService: FinanceService;
	private _subscriberRepository: FileSubscriberRepository = new FileSubscriberRepository();

	constructor(
		// _subscriberRepository: FileSubscriberRepository,
		_financeService: FinanceService,
		_emailService: EmailService,
	) {
		this._emailService = _emailService;
		// this._subscriberRepository = _subscriberRepository;
		this._financeService = _financeService;
	}

	public subscribe(email: string): boolean {
		return this._subscriberRepository.append(new Subscriber(email));
	}

	public unsubscribe(email: string): boolean {
		const subscriber = this._subscriberRepository.getByEmail(email);
		if (!subscriber) return false;
		return this._subscriberRepository.remove(subscriber);
	}

	public getAllSubscribers(): Subscriber[] {
		return this._subscriberRepository.getAll();
	}

	public isSubscribed(email: string): boolean {
		return this._subscriberRepository.isEmailExist(email);
	}

	public async sendEmailsAsync(
		receivers = this.getAllSubscribers(),
	): Promise<SubscriberMailResultResponse[] | undefined> {
		const receiversEmail: string[] = [];
		const resultArray: SubscriberMailResultResponse[] = [];
		const actualRate = await this._financeService.getBtcUahRateAsync();
		if (!actualRate) {
			this.logger.error(`Помилка отримання курсу! Відправка пошти зупинена.`);
			return;
		}
		receivers.map((item: Subscriber) => receiversEmail.push(item.getEmail()));
		for (const email of receiversEmail) {
			const result = await this._emailService.sendRateMailAsync(email, actualRate.toString());
			const resultResponseModel: SubscriberMailResultResponse = { email, result };
			resultArray.push(resultResponseModel);
		}
		this.logger.log(`Результат відправки курсу: ${JSON.stringify(resultArray)}`);
		return resultArray;
	}
}
