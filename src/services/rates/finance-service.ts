import { providersNamesDict, providersKeysDict } from './const/providers.const';
import CoinbaseProvider from './providers/coinbase.provider';
import BinanceProvider from './providers/binance.provider';
import TestProvider from './providers/test.provider';
import KunaProvider from './providers/kuna.provider';
import NomicsProvider from './providers/nomics.provider';
import logFab from '../logger';
import 'dotenv/config';
import IProvider from './providers/interfaces/interface.provider';
const log = logFab('FinanceService');

class FinanceService {
	public activeProviderKey = process.env.CRYPTO_CURRENCY_PROVIDER || 'binance-pk';
	public autoChangeUnavailableProviders = process.env.AUTOCHANGE_UNAVAILABLE_PROVIDER || true;

	public setActiveProviderByName(name: string) {
		const key = Object.keys(providersNamesDict).find(
			(key: string) => providersNamesDict[key as keyof typeof providersNamesDict] === name
		);
		return this.setActiveProviderByKey(
			providersKeysDict[key as keyof typeof providersKeysDict]
		);
	}

	public setActiveProviderByKey(key: string) {
		if (!Object.values(providersKeysDict).includes(key)) {
			return false;
		}
		this.activeProviderKey = key;
		return true;
	}

	public async getBtcUahRateAsync(): Promise<number | null> {
		let providerInstance = this.getNewInstanceOfProviderByKey(this.activeProviderKey);
		let rateValue = await this.getBtcUahRateFromProviderAsync(providerInstance);
		if (!rateValue || isNaN(rateValue)) {
			log.error(
				`Unable to get rate value from active provider. AutoSwitch: ${
					this.autoChangeUnavailableProviders ? 'Enabled' : 'Disabled'
				}`
			);
			if (this.autoChangeUnavailableProviders) {
				for (const key in providersKeysDict) {
					const providerKey = providersKeysDict[key as keyof typeof providersKeysDict];
					if (providerKey !== this.activeProviderKey) {
						providerInstance = this.getNewInstanceOfProviderByKey(
							providersKeysDict[key as keyof typeof providersKeysDict]
						);
						rateValue = await this.getBtcUahRateFromProviderAsync(providerInstance);
						if (rateValue && !isNaN(rateValue)) break;
					}
				}
			}
		}
		return rateValue;
	}

	private async getBtcUahRateFromProviderAsync(provider: IProvider): Promise<number | null> {
		return await provider.createRateService().getBtcUahRateAsync();
	}

	private getNewInstanceOfProviderByKey(key: string): IProvider {
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
					return this.getNewInstanceOfProviderByKey('DEFAULT');
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

export default FinanceService;
