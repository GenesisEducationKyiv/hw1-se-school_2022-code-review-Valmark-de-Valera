export interface IRateService {
	providerName: string;
	token: string;
	getRateAsync(): Promise<number>;
}
