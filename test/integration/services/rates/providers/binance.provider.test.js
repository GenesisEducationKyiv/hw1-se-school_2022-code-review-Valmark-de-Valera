let assert = require('assert');
const BinanceProvider = require('../../../../../services/rates/providers/binance.provider');

describe('BinanceProvider', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new BinanceProvider();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
