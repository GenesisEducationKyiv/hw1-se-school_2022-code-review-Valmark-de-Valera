import logFab from '../logger';
import { injectable } from 'inversify';
import IRatePresenter from './interfaces/interface.rate-presenter';
import { presenterKeysDict } from './const/presenter.const';
import JsonRatePresenter from './rate-presenters/json.rate-presenter';
import NumberRatePresenter from './rate-presenters/number.rate-presenter';
import XmlRatePresenter from './rate-presenters/xml.rate-presenter';
const log = logFab('RatePresenterFabric');

@injectable()
class RatePresenterFabric {
	public getPresenterByKey(key: string): IRatePresenter {
		let presenterInstance;
		switch (key) {
			case presenterKeysDict.json:
				presenterInstance = new JsonRatePresenter();
				break;
			case presenterKeysDict.xml:
				presenterInstance = new XmlRatePresenter();
				break;
			case presenterKeysDict.number:
				presenterInstance = new NumberRatePresenter();
				break;
			default:
				log.error(
					`Unknown or rejected presenter with key "${key}". Available presenters: ${Object.values(
						presenterKeysDict
					)}`
				);
				return new JsonRatePresenter();
		}
		log.info(`Set presenter with key "${key}"`);
		return presenterInstance;
	}
}

export default RatePresenterFabric;
