import { Injectable, Logger } from '@nestjs/common';
import { providersClassesDict, providersKeysDict } from './const/providers.const';
import { IProvider } from './providers/interfaces/interface.provider';
import { TestProvider } from './providers/test.provider';
import { BinanceProvider } from './providers/binance.provider';

@Injectable()
export class FinanceProviderFabric {
	private readonly logger = new Logger(FinanceProviderFabric.name);

	public getProviderByKey(key: string): IProvider {
		let providerInstance: IProvider;
		const dictKey = Object.keys(providersKeysDict).find(
			(dictKey: string) =>
				providersKeysDict[dictKey as keyof typeof providersKeysDict] === key,
		);
		if (key === providersKeysDict.test && process.env.NODE_ENV !== 'test') //throw error or return null
		providerInstance = new (providersClassesDict[
			dictKey as keyof typeof providersClassesDict
		] ?? BinanceProvider)();
		this.logger.log(`Success set provider: ${providerInstance.providerName}`);
		return providerInstance;
	}
}
