import CoinbaseRateService from '../../../../../src/services/rates/provider-services/rate-services/coinbase.rate-service';
import 'dotenv/config';

describe('CoinbaseRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const token = process.env.COINBASE_PROVIDER_TOKEN || '';
			const provider = new CoinbaseRateService(token);

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(`Provider should return number, not this: ${result}`);
		});
	});
});
