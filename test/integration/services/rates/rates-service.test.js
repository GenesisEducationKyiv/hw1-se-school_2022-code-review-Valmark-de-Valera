let assert = require('assert');
const RatesService = require('../../../../services/rates/rates-service');
const { providersKeysDict } = require('../../../../services/rates/const/providers.const');

describe('RatesService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return valid rate value', async function () {
			const rateService = new RatesService();
			rateService.autoChangeUnavailableProviders = false;

			let result = await rateService.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
			assert.ok(true);
		});
		it('should change provider if it return wrong value', async function () {
			const rateService = new RatesService();
			rateService.autoChangeUnavailableProviders = true;
			rateService.changeProviderByKey(providersKeysDict.test, { fail: true });

			let result = await rateService.getBtcUahRateAsync();

			if (!result || isNaN(result))
				assert.fail(
					`Service should change rate provider and return valid number, not this: ${result}`
				);
			assert.ok(true);
		});
	});
});
