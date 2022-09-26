import IProvider from './interfaces/interface.provider';
import CoinbaseRateService from '../provider-services/rate-services/coinbase.rate-service';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import 'dotenv/config';

class CoinbaseProvider implements IProvider {
	public providerName = providersNamesDict.coinbase;
	public providerKey = providersKeysDict.coinbase;
	private token = process.env.COINBASE_PROVIDER_TOKEN || '';

	public createRateService(): CoinbaseRateService {
		return new CoinbaseRateService(this.token);
	}
}

export default CoinbaseProvider;
