const assert = require('assert');
const NomicsRateService = require('../../../../../src/services/rates/provider-services/rate-services/nomics.rate-service');

describe('NomicsRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new NomicsRateService();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
