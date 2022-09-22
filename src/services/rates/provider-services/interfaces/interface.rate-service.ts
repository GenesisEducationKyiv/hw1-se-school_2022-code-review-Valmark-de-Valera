interface IRateService {
	providerName: string;
	token: string;
	getBtcUahRateAsync(): Promise<number | null>;
}

export default IRateService;
