const fetch = require('node-fetch');

class BinanceProvider {
	token = '';
	url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';

	async getBtcUahRateAsync() {
		const response = await fetch(this.url, {
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
