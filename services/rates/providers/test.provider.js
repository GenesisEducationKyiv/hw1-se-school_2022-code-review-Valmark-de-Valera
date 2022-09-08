const fetch = require('node-fetch');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
require('dotenv').config();

class TestProvider {
	providerName = providersNamesDict.test;
	providerKey = providersKeysDict.test;
	token = process.env.TestProviderToken;

	async getBtcUahRateAsync() {
		const url = process.env.TestProviderUrl;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		return Number(json.data.id);
	}
}

module.exports = TestProvider;
