import IProvider from './providers/interfaces/interface.provider';
import { providersKeysDict } from './const/providers.const';
import logFab from '../logger';
import BinanceProvider from './providers/binance.provider';
import CoinbaseProvider from './providers/coinbase.provider';
import KunaProvider from './providers/kuna.provider';
import NomicsProvider from './providers/nomics.provider';
import TestProvider from './providers/test.provider';
import { injectable } from 'inversify';
const log = logFab('ProviderFabric');

@injectable()
class FinanceProviderFabric {
	public getProviderByKey(key: string): IProvider {
		let providerInstance;
		switch (key) {
			case providersKeysDict.binance:
				providerInstance = new BinanceProvider();
				break;
			case providersKeysDict.coinbase:
				providerInstance = new CoinbaseProvider();
				break;
			case providersKeysDict.kuna:
				providerInstance = new KunaProvider();
				break;
			case providersKeysDict.nomics:
				providerInstance = new NomicsProvider();
				break;
			case providersKeysDict.test:
				if (process.env.NODE_ENV === 'test') {
					providerInstance = new TestProvider();
				} else {
					log.error('Test providers are used only for testing purposes!');
					return this.getProviderByKey('DEFAULT');
				}
				break;
			default:
				log.error(
					`Unknown or rejected provider with key "${key}". Available providers: ${Object.values(
						providersKeysDict
					)}`
				);
				return new BinanceProvider();
		}
		log.info(`Success set provider: ${providerInstance.providerName}`);
		return providerInstance;
	}
}

export default FinanceProviderFabric;
