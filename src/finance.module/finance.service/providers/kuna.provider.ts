import { IProvider } from './interfaces/interface.provider';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import { KunaRateService } from '../provider-services/rate-services/kuna.rate-service';

export class KunaProvider implements IProvider {
	public providerName = providersNamesDict.kuna;
	public providerKey = providersKeysDict.kuna;
	private token = process.env.KUNA_PROVIDER_TOKEN || '';

	public createRateService(): KunaRateService {
		return new KunaRateService(this.token);
	}
}
