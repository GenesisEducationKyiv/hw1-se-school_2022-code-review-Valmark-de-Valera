import SubscribersRepository from '../../repository/subscriber/file.subscriber.repository';
import Subscriber from '../../models/subscriber/subscriber.model';
import EmailService from '../email/email-service';
import RateService from '../rates/finance-service';
import logFab from '../logger';
import SubscriberMailResultResponse from '../../models/subscriber/subscriber-mailresult.model';
const log = logFab('SubscribersService');

class SubscribersService {
	private subscribersRepository = new SubscribersRepository();

	public subscribe(email: string): boolean {
		return this.subscribersRepository.append(new Subscriber(email));
	}

	public unsubscribe(email: string): boolean {
		const subscriber = this.subscribersRepository.getByEmail(email);
		if (!subscriber) return false;
		return this.subscribersRepository.remove(subscriber);
	}

	public async sendEmailsAsync(
		receivers = this.getAllSubscribers()
	): Promise<SubscriberMailResultResponse[] | undefined> {
		const emailService = new EmailService();
		const rateService = new RateService();
		const receiversEmail: string[] = [];
		const resultArray: SubscriberMailResultResponse[] = [];
		const actualRate = await rateService.getBtcUahRateAsync();
		if (!actualRate) {
			log.error(`Помилка отримання курсу! Відправка пошти зупинена.`);
			return;
		}
		receivers.map((item: Subscriber) => receiversEmail.push(item.getEmail()));
		for (const item of receiversEmail) {
			const result = await emailService.sendRateMailAsync(item, actualRate);
			resultArray.push(new SubscriberMailResultResponse(item, result));
		}
		log.info(`Результат відправки курсу: ${JSON.stringify(resultArray)}`);
		return resultArray;
	}

	public getAllSubscribers(): Subscriber[] {
		return this.subscribersRepository.getAll();
	}

	public isSubscribed(email: string): boolean {
		return this.subscribersRepository.isEmailExist(email);
	}
}

export default SubscribersService;
