class BaseProvider {
	providerName;
	providerKey;
	token;
	cacheData = {
		cacheActive: false,
		cacheExpireInSeconds: 300,
		cacheService: undefined,
	};

	async getBtcUahRateAsync() {
		throw new Error('getBtcUahRateAsync is not implemented');
	}
}

module.exports = BaseProvider;
