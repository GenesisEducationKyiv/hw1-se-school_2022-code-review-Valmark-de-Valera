import IRatePresenter from '../interfaces/interface.rate-presenter';
import { injectable } from 'inversify';

@injectable()
class StringRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		return rate.toString();
	}
}

export default StringRatePresenter;
