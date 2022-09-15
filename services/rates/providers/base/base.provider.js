/* eslint-disable no-unused-vars */
class BaseProvider {
	providerName;
	providerKey;
	token;

	createRateService(token) {
		throw new Error(`Method 'createRateService' is not implemented`);
	}
}

module.exports = BaseProvider;
