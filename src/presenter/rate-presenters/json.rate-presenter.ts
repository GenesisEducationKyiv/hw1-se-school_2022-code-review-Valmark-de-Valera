import IRatePresenter from '../interfaces/interface.rate-presenter';
import RatePresenterModel from '../../models/rates/presenter/rate-presenter.model';
import { injectable } from 'inversify';

@injectable()
class JsonRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		const rateModel: RatePresenterModel = { from, to, rate };
		return JSON.stringify(rateModel);
	}
}

export default JsonRatePresenter;
