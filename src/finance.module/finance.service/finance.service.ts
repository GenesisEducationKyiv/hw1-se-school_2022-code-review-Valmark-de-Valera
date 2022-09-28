import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { providersKeysDict, providersNamesDict } from './const/providers.const';
import { FinanceProviderFabric } from './finance-provider.fabric';
import { Cache } from 'cache-manager';
import { rateErrorsDict } from './const/error/rate-errors.const';
import { IProvider } from './providers/interfaces/interface.provider';

@Injectable()
export class FinanceService {
	private readonly logger = new Logger(FinanceService.name);
	private _financeProviderFabric: FinanceProviderFabric;
	private _cacheManager: Cache;
	private _activeProviderKey = process.env.CRYPTO_CURRENCY_PROVIDER || providersKeysDict.binance;
	public autoChangeUnavailableProviders = process.env.AUTOCHANGE_UNAVAILABLE_PROVIDER || true;
	private cacheRateConfig = {
		cacheActive: true,
	};

	constructor(
		_financeProviderFabric: FinanceProviderFabric,
		@Inject(CACHE_MANAGER) _cacheManager: Cache,
	) {
		this._cacheManager = _cacheManager;
		this._financeProviderFabric = _financeProviderFabric;
	}

	public setActiveProviderByName(name: string) {
		const key = Object.keys(providersNamesDict).find(
			(key: string) => providersNamesDict[key as keyof typeof providersNamesDict] === name,
		);
		return this.setActiveProviderByKey(
			providersKeysDict[key as keyof typeof providersKeysDict],
		);
	}

	public setActiveProviderByKey(key: string) {
		if (!Object.values(providersKeysDict).includes(key)) {
			return false;
		}
		this._activeProviderKey = key;
		this._cacheManager.reset();
		return true;
	}

	public async getBtcUahRateAsync(): Promise<number> {
		const cacheName = 'BTC_UAH_RATE';
		if (this.cacheRateConfig.cacheActive && (await this._cacheManager.get(cacheName))) {
			this.logger.debug(`Cache used for request ${cacheName}`);
			return Number(await this._cacheManager.get(cacheName));
		}
		let providerInstance = this._financeProviderFabric.getProviderByKey(
			this._activeProviderKey,
		);
		let rateValue = 0;
		try {
			rateValue = await this.getBtcUahRateFromProviderAsync(providerInstance);
		} catch (e) {
			this.logger.error(
				`Unable to get rate value from active provider. AutoSwitch: ${
					this.autoChangeUnavailableProviders ? 'Enabled' : 'Disabled'
				}`,
			);
			if (this.autoChangeUnavailableProviders) {
				for (const key in providersKeysDict) {
					const providerKey = providersKeysDict[key as keyof typeof providersKeysDict];
					if (providerKey !== this._activeProviderKey) {
						providerInstance = this._financeProviderFabric.getProviderByKey(
							providersKeysDict[key as keyof typeof providersKeysDict],
						);
						try {
							rateValue = await this.getBtcUahRateFromProviderAsync(providerInstance);
							break;
						} catch (e) {
							this.logger.error(
								`Unable to get rate value from ${providerInstance.providerName} provider`,
							);
						}
					}
				}
			}
		}
		if (!rateValue) throw new Error(rateErrorsDict.INVALID_RATE_VALUE);
		if (this.cacheRateConfig.cacheActive) {
			await this._cacheManager.set(cacheName, rateValue.toString());
		}
		return rateValue;
	}

	private async getBtcUahRateFromProviderAsync(provider: IProvider): Promise<number> {
		return await provider.createRateService().getBtcUahRateAsync();
	}
}
