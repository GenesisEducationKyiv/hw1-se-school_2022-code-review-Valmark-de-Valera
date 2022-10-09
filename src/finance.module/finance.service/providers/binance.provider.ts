import { IProvider } from './interfaces/interface.provider';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import { BinanceRateService } from '../provider-services/rate-services/binance.rate-service';

export class BinanceProvider implements IProvider {
	public providerName = providersNamesDict.binance;
	public providerKey = providersKeysDict.binance;
	private token = process.env.BINANCE_PROVIDER_TOKEN || '';

	public createRateService(): BinanceRateService {
		return new BinanceRateService(this.token);
	}
}
