import 'x2js';
import X2JS from 'x2js';
import { IRatePresenter } from '../interfaces/interface.rate-presenter';
import { RatePresenterModel } from '../../models/rate-presenter.model';

export class XmlRatePresenter implements IRatePresenter {
	public presentRateExchange(from: string, to: string, rate: number): string {
		const x2js = new X2JS();
		const rateModel: RatePresenterModel = { from, to, rate };
		return x2js.js2xml(rateModel);
	}
}
