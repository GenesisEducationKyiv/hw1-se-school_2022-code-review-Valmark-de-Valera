import IProvider from './interfaces/interface.provider';
import BinanceRateService from '../provider-services/rate-services/binance.rate-service';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import 'dotenv/config';

class BinanceProvider implements IProvider {
	public providerName = providersNamesDict.binance;
	public providerKey = providersKeysDict.binance;
	private token = process.env.BINANCE_PROVIDER_TOKEN || '';

	public createRateService(): BinanceRateService {
		return new BinanceRateService(this.token);
	}
}

export default BinanceProvider;
