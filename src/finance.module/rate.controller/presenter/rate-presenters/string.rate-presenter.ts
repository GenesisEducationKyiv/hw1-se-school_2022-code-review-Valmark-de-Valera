import { IRatePresenter } from '../interfaces/interface.rate-presenter';

export class StringRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		return rate.toString();
	}
}
