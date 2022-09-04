let assert = require('assert');
const TestProvider = require('../../../../services/providers/test.provider');

describe('TestProvider', function () {
	describe('#getLastRateAsync', function () {
		it('should return rate as number', async function () {
			const provider = new TestProvider();

			const result = await provider.getBtcUahRateAsync();

			if (isNaN(result)) assert.fail(`Provider should return number, not this: ${result}`);
			assert.ok(true);
		});
	});
});
