import { IRatePresenter } from '../interfaces/interface.rate-presenter';
import { RatePresenterModel } from '../../models/rate-presenter.model';

export class JsonRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		const rateModel: RatePresenterModel = { from, to, rate };
		return JSON.stringify(rateModel);
	}
}
