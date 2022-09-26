interface IRateService {
	providerName: string;
	token: string;
	getBtcUahRateAsync(): Promise<number>;
}

export default IRateService;
