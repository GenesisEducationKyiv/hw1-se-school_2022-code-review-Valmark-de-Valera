import IProvider from './interfaces/interface.provider';
import NomicsRateService from '../provider-services/rate-services/nomics.rate-service';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import 'dotenv/config';

class NomicsProvider implements IProvider {
	public providerName = providersNamesDict.nomics;
	public providerKey = providersKeysDict.nomics;
	private token = process.env.NOMICS_PROVIDER_TOKEN || '';

	public createRateService(): NomicsRateService {
		return new NomicsRateService(this.token);
	}
}

export default NomicsProvider;
