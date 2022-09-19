import BinanceRateService from '../../../../../src/services/rates/provider-services/rate-services/binance.rate-service';
import 'dotenv/config';

describe('BinanceRateService', function () {
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			const token = process.env.BINANCE_PROVIDER_TOKEN || '';
			const provider = new BinanceRateService(token);

			const result = await provider.getBtcUahRateAsync();

			if (!result || isNaN(result))
				fail(`Provider should return number, not this: ${result}`);
		});
	});
});
