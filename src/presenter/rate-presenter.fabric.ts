import logFab from '../services/logger';
import { injectable } from 'inversify';
import IRatePresenter from './interfaces/interface.rate-presenter';
import { presenterClassesDict } from './const/presenter.const';
import JsonRatePresenter from './rate-presenters/json.rate-presenter';
const log = logFab('RatePresenterFabric');

@injectable()
class RatePresenterFabric {
	public getPresenterByKey(key: string): IRatePresenter {
		const presenterInstance = new (presenterClassesDict[
			key as keyof typeof presenterClassesDict
		] ?? JsonRatePresenter)();
		log.info(`Set presenter with key "${key}"`);
		return presenterInstance;
	}
}

export default RatePresenterFabric;
