import { Injectable, Logger } from '@nestjs/common';
import { providersClassesDict, providersKeysDict } from './const/providers.const';
import { IProvider } from './providers/interfaces/interface.provider';

@Injectable()
export class FinanceProviderFabric {
	private readonly logger = new Logger(FinanceProviderFabric.name);
	private _defaultProviderClass = providersClassesDict.binance;

	public getProviderByKey(key: string): IProvider {
		let providerInstance: IProvider;
		const dictKey = Object.keys(providersKeysDict).find(
			(dictKey: string) =>
				providersKeysDict[dictKey as keyof typeof providersKeysDict] === key,
		);
		providerInstance = new (providersClassesDict[
			dictKey as keyof typeof providersClassesDict
		] ?? this._defaultProviderClass)();
		if (key === providersKeysDict.test && process.env.NODE_ENV !== 'test')
			throw new Error(`Test provider can be used only for testing purposes`);
		this.logger.log(`Success set provider: ${providerInstance.providerName}`);
		return providerInstance;
	}
}
