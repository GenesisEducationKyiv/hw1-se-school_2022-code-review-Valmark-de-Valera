let assert = require('assert');
const CoinbaseRateService = require('../../../../../services/rates/provider-services/rate-services/coinbase.rate-service');

describe('CoinbaseRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new CoinbaseRateService();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
