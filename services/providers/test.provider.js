const fetch = require('node-fetch');
require('dotenv').config();

class TestProvider {
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
