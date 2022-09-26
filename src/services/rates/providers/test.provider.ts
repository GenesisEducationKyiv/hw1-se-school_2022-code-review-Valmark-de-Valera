import IProvider from './interfaces/interface.provider';
import TestRateService from '../provider-services/rate-services/test.rate-service';
import { providersNamesDict, providersKeysDict } from '../const/providers.const';
import 'dotenv/config';

class TestProvider implements IProvider {
	public providerName = providersNamesDict.test;
	public providerKey = providersKeysDict.test;
	private token = process.env.TEST_PROVIDER_TOKEN || '';

	public createRateService(): TestRateService {
		return new TestRateService(this.token);
	}
}

export default TestProvider;
