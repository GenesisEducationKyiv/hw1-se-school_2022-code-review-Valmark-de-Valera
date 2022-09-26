import IProvider from './providers/interfaces/interface.provider';
import { providersClassesDict, providersKeysDict } from './const/providers.const';
import logFab from '../logger';
import BinanceProvider from './providers/binance.provider';
import TestProvider from './providers/test.provider';
import { injectable } from 'inversify';
const log = logFab('ProviderFabric');

@injectable()
class FinanceProviderFabric {
	public getProviderByKey(key: string): IProvider {
		let providerInstance;
		const dictKey = Object.keys(providersKeysDict).find(
			(dictKey: string) =>
				providersKeysDict[dictKey as keyof typeof providersKeysDict] === key
		);
		if (key === providersKeysDict.test) {
			if (process.env.NODE_ENV === 'test') {
				providerInstance = new TestProvider();
			} else {
				log.error('Test providers are used only for testing purposes!');
			}
		}
		providerInstance = new (providersClassesDict[
			dictKey as keyof typeof providersClassesDict
		] ?? BinanceProvider)();
		log.info(`Success set provider: ${providerInstance.providerName}`);
		return providerInstance;
	}
}

export default FinanceProviderFabric;
