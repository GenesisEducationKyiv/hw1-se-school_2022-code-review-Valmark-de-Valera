import IRateService from '../../provider-services/interfaces/interface.rate-service';

interface IProvider {
	providerName: string;
	providerKey: string;

	createRateService(): IRateService;
}

export default IProvider;
