let assert = require('assert');
const TestProvider = require('../../../../../services/rates/providers/test.provider');

describe('TestProvider', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new TestProvider();

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
		it('should return null', async function () {
			const provider = new TestProvider({ fail: true });

			const result = await provider.getBtcUahRateAsync();

			if (result) assert.fail(`Provider should return null, not this: ${result}`);
			assert.equal(result, null);
		});
	});
});
