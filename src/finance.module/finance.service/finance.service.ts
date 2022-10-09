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
	private _cacheRateConfig = {
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

	public setNextProvider() {
		const key =
			Object.keys(providersKeysDict).find(
				(key: string) =>
					providersKeysDict[key as keyof typeof providersKeysDict] ===
					this._activeProviderKey,
			) ?? '';
		const keys = Object.keys(providersKeysDict);
		const nextIndex = keys.indexOf(key) + 1;
		const nextProvider = providersKeysDict[keys[nextIndex] as keyof typeof providersKeysDict];
		if (!nextProvider) {
			this.logger.error(`All providers unavailable`);
			this._activeProviderKey = providersKeysDict.binance;
			throw new Error(`All providers unavailable`);
		}
		this._activeProviderKey = nextProvider;
	}

	public async getRateAsync(): Promise<number> {
		const cacheName = 'BTC_UAH_RATE';
		if (this._cacheRateConfig.cacheActive && (await this._cacheManager.get(cacheName))) {
			this.logger.debug(`Cache used for request ${cacheName}`);
			return Number(await this._cacheManager.get(cacheName));
		}
		const providerInstance = this._financeProviderFabric.getProviderByKey(
			this._activeProviderKey,
		);
		let rateValue = 0;
		try {
			rateValue = await this.getRateFromProviderAsync(providerInstance);
		} catch (e) {
			this.logger.error(
				`Unable to get rate value from ${
					providerInstance.providerName
				} provider. AutoSwitch: ${
					this.autoChangeUnavailableProviders ? 'Enabled' : 'Disabled'
				}`,
			);
			if (this.autoChangeUnavailableProviders) {
				this.setNextProvider();
				rateValue = await this.getRateAsync();
			}
		}
		if (!rateValue) throw new Error(rateErrorsDict.INVALID_RATE_VALUE);
		if (this._cacheRateConfig.cacheActive) {
			await this._cacheManager.set(cacheName, rateValue.toString());
		}
		return rateValue;
	}

	private async getRateFromProviderAsync(provider: IProvider): Promise<number> {
		return await provider.createRateService().getRateAsync();
	}
}
