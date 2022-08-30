const fetch = require('node-fetch');
require('dotenv').config();

class BinanceProvider {
	token = process.env.BinanceProviderToken;

	async getBtcUahRateAsync() {
		const url = process.env.BinanceProviderUrl;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		return Number(json.price);
	}
}

module.exports = BinanceProvider;
