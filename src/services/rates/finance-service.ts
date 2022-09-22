import { providersNamesDict, providersKeysDict } from './const/providers.const';
import logFab from '../logger';
import IProvider from './providers/interfaces/interface.provider';
import { inject, injectable } from 'inversify';
import { DIServices } from '../../DITypes';
import FinanceProviderFabric from './finance-provider.fabric';
import 'dotenv/config';
import ICacheService from '../cache/interfaces/interface.cache-service';
const log = logFab('FinanceService');

@injectable()
class FinanceService {
	private _financeProviderFabric: FinanceProviderFabric;
	private _cacheService: ICacheService;
	public activeProviderKey = process.env.CRYPTO_CURRENCY_PROVIDER || 'binance-pk';
	public autoChangeUnavailableProviders = process.env.AUTOCHANGE_UNAVAILABLE_PROVIDER || true;
	private cacheRateConfig = {
		cacheActive: true,
	};

	constructor(
		@inject(DIServices.FinanceProviderFabric) financeProviderFabric: FinanceProviderFabric,
		@inject(DIServices.CacheService) cacheService: ICacheService
	) {
		this._financeProviderFabric = financeProviderFabric;
		this._cacheService = cacheService;
	}

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
		this._cacheService.flushAll();
		return true;
	}

	public async getBtcUahRateAsync(): Promise<number | null> {
		const cacheName = 'BTC_UAH_RATE';
		if (this.cacheRateConfig.cacheActive && this._cacheService?.get(cacheName)) {
			log.debug(`Cache used for request ${cacheName}`);
			return Number(this._cacheService?.get(cacheName));
		}
		let providerInstance = this._financeProviderFabric.getProviderByKey(this.activeProviderKey);
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
						providerInstance = this._financeProviderFabric.getProviderByKey(
							providersKeysDict[key as keyof typeof providersKeysDict]
						);
						rateValue = await this.getBtcUahRateFromProviderAsync(providerInstance);
						if (rateValue && !isNaN(rateValue)) break;
					}
				}
			}
		}
		if (this.cacheRateConfig.cacheActive && rateValue)
			this._cacheService.set(cacheName, rateValue.toString());
		return rateValue;
	}

	private async getBtcUahRateFromProviderAsync(provider: IProvider): Promise<number | null> {
		return await provider.createRateService().getBtcUahRateAsync();
	}
}

export default FinanceService;
