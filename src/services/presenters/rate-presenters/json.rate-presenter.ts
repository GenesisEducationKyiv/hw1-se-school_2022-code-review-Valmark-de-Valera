import IRatePresenter from '../interfaces/interface.rate-presenter';
import RatePresenterModel from '../../../models/rates/presenter/rate-presenter.model';
import { injectable } from 'inversify';

@injectable()
class JsonRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		return JSON.stringify(new RatePresenterModel(from, to, rate).toObject());
	}
}

export default JsonRatePresenter;
