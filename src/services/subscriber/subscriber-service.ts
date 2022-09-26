import Subscriber from '../../models/subscriber/subscriber.model';
import EmailService from '../email/email-service';
import logFab from '../logger';
import SubscriberMailResultResponse from '../../models/subscriber/subscriber.mail-result.model';
import { inject, injectable } from 'inversify';
import ISubscriberRepository from '../../repository/subscriber/interfaces/interface.subscriber.repository';
import { DIRepositories, DIServices } from '../../DITypes';
import FinanceService from '../rates/finance-service';
import { presenterKeysDict } from '../../presenter/const/presenter.const';
const log = logFab('SubscribersService');

@injectable()
class SubscribersService {
	private _subscribersRepository: ISubscriberRepository;
	private _emailService: EmailService;
	private _financeService: FinanceService;

	constructor(
		@inject(DIRepositories.SubscribersRepository) subscribersRepository: ISubscriberRepository,
		@inject(DIServices.EmailService) emailService: EmailService,
		@inject(DIServices.FinanceService) financeService: FinanceService
	) {
		this._subscribersRepository = subscribersRepository;
		this._emailService = emailService;
		this._financeService = financeService;
	}

	public subscribe(email: string): boolean {
		return this._subscribersRepository.append(new Subscriber(email));
	}

	public unsubscribe(email: string): boolean {
		const subscriber = this._subscribersRepository.getByEmail(email);
		if (!subscriber) return false;
		return this._subscribersRepository.remove(subscriber);
	}

	public async sendEmailsAsync(
		receivers = this.getAllSubscribers()
	): Promise<SubscriberMailResultResponse[] | undefined> {
		const receiversEmail: string[] = [];
		const resultArray: SubscriberMailResultResponse[] = [];
		const actualRate = await this._financeService.getBtcUahRateAsync(presenterKeysDict.string);
		if (!actualRate) {
			log.error(`Помилка отримання курсу! Відправка пошти зупинена.`);
			return;
		}
		receivers.map((item: Subscriber) => receiversEmail.push(item.getEmail()));
		for (const email of receiversEmail) {
			const result = await this._emailService.sendRateMailAsync(email, actualRate);
			const resultResponseModel: SubscriberMailResultResponse = { email, result };
			resultArray.push(resultResponseModel);
		}
		log.info(`Результат відправки курсу: ${JSON.stringify(resultArray)}`);
		return resultArray;
	}

	public getAllSubscribers(): Subscriber[] {
		return this._subscribersRepository.getAll();
	}

	public isSubscribed(email: string): boolean {
		return this._subscribersRepository.isEmailExist(email);
	}
}

export default SubscribersService;
