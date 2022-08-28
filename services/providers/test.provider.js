const fetch = require('node-fetch');

class TestProvider {
	token = '';

	async getBtcUahRateAsync() {
		const url = 'https://reqres.in/api/products/3';
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
