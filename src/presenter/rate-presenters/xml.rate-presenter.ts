import IRatePresenter from '../interfaces/interface.rate-presenter';
import RatePresenterModel from '../../models/rates/presenter/rate-presenter.model';
import { injectable } from 'inversify';
import 'x2js';
import X2JS from 'x2js';

@injectable()
class XmlRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		const x2js = new X2JS();
		return x2js.js2xml(new RatePresenterModel(from, to, rate).toObject());
	}
}

export default XmlRatePresenter;
