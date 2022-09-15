let assert = require('assert');
const BinanceRateService = require('../../../../../services/rates/provider-services/rate-services/binance.rate-service');

describe('BinanceRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new BinanceRateService();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
