const assert = require('assert');
const KunaRateService = require('../../../../../src/services/rates/provider-services/rate-services/kuna.rate-service');

describe('KunaRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new KunaRateService();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
