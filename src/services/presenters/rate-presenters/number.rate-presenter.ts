import IRatePresenter from '../interfaces/interface.rate-presenter';
import { injectable } from 'inversify';

@injectable()
class NumberRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		return rate.toString();
	}
}

export default NumberRatePresenter;
