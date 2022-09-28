export interface IRateService {
	providerName: string;
	token: string;
	getBtcUahRateAsync(): Promise<number>;
}
