import TestRateService from '../../../../../src/services/rates/provider-services/rate-services/test.rate-service';
import { rateErrorsDict } from '../../../../../src/models/error/const/rate-errors.const';
import 'dotenv/config';

describe('TestRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const token = process.env.TEST_PROVIDER_TOKEN || '';
			const provider = new TestRateService(token);

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(`Provider should return number, not this: ${result}`);
		});
		it('should return error', async function () {
			process.env.TEST_PROVIDER_FAIL = String(true);
			const token = process.env.TEST_PROVIDER_TOKEN || '';
			const provider = new TestRateService(token);

			let result: number | null;
			try {
				result = await provider.getBtcUahRateAsync();
			} catch (err: any) {
				result = null;
				expect(err?.message).toBe(rateErrorsDict.INVALID_RATE_VALUE.message);
			}

			expect(result).toBeNull();
		});
	});
});
