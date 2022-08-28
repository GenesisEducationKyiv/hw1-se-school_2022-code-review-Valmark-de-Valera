const fetch = require('node-fetch');

class BinanceProvider {
	token = '';

	async getBtcUahRateAsync() {
		const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';
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
