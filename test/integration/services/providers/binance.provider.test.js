let assert = require('assert');
const BinanceProvider = require('../../../../services/providers/binance.provider');

describe('BinanceProvider', function () {
	describe('#getLastRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new BinanceProvider();

			const result = await provider.getBtcUahRateAsync();

			if (isNaN(result)) assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
