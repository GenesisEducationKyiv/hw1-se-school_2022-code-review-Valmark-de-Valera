import IProvider from './interfaces/interface.provider';
import KunaRateService from '../provider-services/rate-services/kuna.rate-service';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import 'dotenv/config';

class KunaProvider implements IProvider {
	public providerName = providersNamesDict.kuna;
	public providerKey = providersKeysDict.kuna;
	private token = process.env.KUNA_PROVIDER_TOKEN || '';

	public createRateService(): KunaRateService {
		return new KunaRateService(this.token);
	}
}

export default KunaProvider;
