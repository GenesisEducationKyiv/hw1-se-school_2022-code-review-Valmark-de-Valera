class BaseProvider {
	providerName;
	providerKey;
	token;

	async getBtcUahRateAsync() {
		throw new Error('getBtcUahRateAsync is not implemented');
	}
}

module.exports = BaseProvider;
