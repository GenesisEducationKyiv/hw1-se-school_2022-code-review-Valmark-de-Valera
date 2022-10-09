import { Inject, Injectable, Logger } from '@nestjs/common';
import { FinanceService } from '../../finance.module/finance.service/finance.service';
import { ClientProxy } from '@nestjs/microservices';
import { FileUserRepository } from './repository/file.user.repository';
import { User } from '../models/user.model';
import {
	NotificationContractPatterns,
	NotificationRateContract,
	NotificationSubscriberContract,
} from './const/notification.contract.const';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);
	private _financeService: FinanceService;
	private _userRepository: FileUserRepository;
	private _subscribersRmqService: ClientProxy;

	constructor(
		_userRepository: FileUserRepository,
		_financeService: FinanceService,
		@Inject('SUBSCRIBERS_RMQ_SERVICE') _subscribersRmqService: ClientProxy,
	) {
		this._subscribersRmqService = _subscribersRmqService;
		this._userRepository = _userRepository;
		this._financeService = _financeService;
	}

	public subscribe(email: string): boolean {
		const userInstance = new User(email);
		const result = this._userRepository.append(userInstance);
		if (result) {
			const subscriberContract: NotificationSubscriberContract = { email };
			this._subscribersRmqService.emit(
				NotificationContractPatterns.addSubscriber,
				subscriberContract,
			);
		}
		return result;
	}

	public unsubscribe(email: string): boolean {
		const user = this._userRepository.getByEmail(email);
		if (!user) return false;
		const result = this._userRepository.remove(user);
		if (result) {
			const subscriberContract: NotificationSubscriberContract = { email };
			this._subscribersRmqService.emit(
				NotificationContractPatterns.removeSubscriber,
				subscriberContract,
			);
		}
		return result;
	}

	public getAllSubscribers(): User[] {
		return this._userRepository.getAll();
	}

	public isSubscribed(email: string): boolean {
		return this._userRepository.isEmailExist(email);
	}

	public async sendEmailsAsync(receivers = this.getAllSubscribers()): Promise<string> {
		const actualRate = await this._financeService.getRateAsync();
		if (!actualRate) {
			this.logger.error(`Помилка отримання курсу! Відправка пошти зупинена.`);
			throw new Error(`Помилка отримання курсу! Відправка пошти зупинена.`);
		}
		const rateContract: NotificationRateContract = {
			rate: actualRate,
			countOfEmails: receivers.length,
		};
		this._subscribersRmqService.emit(NotificationContractPatterns.sendRate, rateContract);
		this.logger.log(`Курс відправлено до модуля сповіщень`);
		return `Курс відправлено до модуля сповіщень`;
	}
}
