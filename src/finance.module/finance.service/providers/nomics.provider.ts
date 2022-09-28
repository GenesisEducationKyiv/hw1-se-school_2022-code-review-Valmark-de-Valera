import { IProvider } from './interfaces/interface.provider';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import { NomicsRateService } from '../provider-services/rate-services/nomics.rate-service';

export class NomicsProvider implements IProvider {
	public providerName = providersNamesDict.nomics;
	public providerKey = providersKeysDict.nomics;
	private token = process.env.NOMICS_PROVIDER_TOKEN || '';

	public createRateService(): NomicsRateService {
		return new NomicsRateService(this.token);
	}
}
