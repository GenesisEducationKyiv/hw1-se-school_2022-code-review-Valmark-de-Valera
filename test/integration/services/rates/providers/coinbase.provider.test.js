let assert = require('assert');
const CoinbaseProvider = require('../../../../../services/rates/providers/coinbase.provider');

describe('CoinbaseProvider', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new CoinbaseProvider();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
