let assert = require('assert');
const TestRateService = require('../../../../../services/rates/provider-services/rate-services/test.rate-service');

describe('TestRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new TestRateService();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
		it('should return null', async function () {
			process.env.TEST_PROVIDER_FAIL = true;
			const provider = new TestRateService();

			const result = await provider.getBtcUahRateAsync();

			if (result) assert.fail(`Provider should return null, not this: ${result}`);
			assert.equal(result, null);
		});
	});
});
