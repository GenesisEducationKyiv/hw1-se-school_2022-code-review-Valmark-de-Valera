class RateService {
	providerName;
	token;

	constructor(token) {
		this.token = token;
	}

	cacheData = {
		cacheActive: false,
		cacheExpireInSeconds: process.env.CACHE_EXPIRE_SECONDS,
		cacheService: undefined,
	};

	async getBtcUahRateAsync() {
		throw new Error(`Method 'getBtcUahRateAsync' is not implemented`);
	}
}

module.exports = RateService;
