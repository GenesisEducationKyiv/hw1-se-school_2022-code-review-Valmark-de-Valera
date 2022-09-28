import { IRateService } from '../../provider-services/interfaces/interface.rate-service';

export interface IProvider {
	providerName: string;
	providerKey: string;

	createRateService(): IRateService;
}
