import KunaRateService from '../../../../../src/services/rates/provider-services/rate-services/kuna.rate-service';
import 'dotenv/config';

describe('KunaRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const token = process.env.KUNA_PROVIDER_TOKEN || '';
			const provider = new KunaRateService(token);

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(`Provider should return number, not this: ${result}`);
		});
	});
});
