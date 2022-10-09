import { IProvider } from './interfaces/interface.provider';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import { CoinbaseRateService } from '../provider-services/rate-services/coinbase.rate-service';

export class CoinbaseProvider implements IProvider {
	public providerName = providersNamesDict.coinbase;
	public providerKey = providersKeysDict.coinbase;
	private token = process.env.COINBASE_PROVIDER_TOKEN || '';

	public createRateService(): CoinbaseRateService {
		return new CoinbaseRateService(this.token);
	}
}
