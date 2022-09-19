import NomicsRateService from '../../../../../src/services/rates/provider-services/rate-services/nomics.rate-service';
import 'dotenv/config';

describe('NomicsRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const token = process.env.NOMICS_PROVIDER_TOKEN || '';
			const provider = new NomicsRateService(token);

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(`Provider should return number, not this: ${result}`);
		});
	});
});
