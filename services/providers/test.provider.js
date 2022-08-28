const fetch = require('node-fetch');

class TestProvider {
	token = '';
	url = 'https://reqres.in/api/products/3';

	async getBtcUahRateAsync() {
		const response = await fetch(this.url, {
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
