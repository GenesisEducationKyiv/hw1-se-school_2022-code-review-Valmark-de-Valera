import { Injectable, Logger } from '@nestjs/common';
import { presenterClassesDict } from './const/presenter.const';
import { IRatePresenter } from './interfaces/interface.rate-presenter';
import { JsonRatePresenter } from './rate-presenters/json.rate-presenter';

@Injectable()
export class RatePresenterFabric {
	private readonly logger = new Logger(RatePresenterFabric.name);
	private readonly _defaultPresenterClass = presenterClassesDict.json;

	public getPresenterByKey(key: string): IRatePresenter {
		const presenterInstance: IRatePresenter = new (presenterClassesDict[
			key as keyof typeof presenterClassesDict
		] ?? this._defaultPresenterClass)();
		this.logger.log(`Set presenter with key "${key}"`);
		return presenterInstance;
	}
}
