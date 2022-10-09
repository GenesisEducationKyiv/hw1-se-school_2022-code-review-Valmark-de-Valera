// import 'dotenv/config';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

describe('env', () => {
	beforeEach(async () => {
		await Test.createTestingModule({
			imports: [ConfigModule.forRoot()],
		}).compile();
	});
	describe('env.ServerConfig', () => {
		it('should have SERVER_HOST', () => {
			expect(process.env.SERVER_HOST).toBeDefined();
		});
		it('should have SERVER_PORT', () => {
			expect(process.env.SERVER_PORT).toBeDefined();
		});
		it('should have CRYPTO_CURRENCY_PROVIDER', () => {
			expect(process.env.CRYPTO_CURRENCY_PROVIDER).toBeDefined();
		});
		it('should have CACHE_EXPIRE_SECONDS', () => {
			expect(process.env.CACHE_EXPIRE_SECONDS).toBeDefined();
		});
		it('should have AUTOCHANGE_UNAVAILABLE_PROVIDER', () => {
			expect(process.env.AUTOCHANGE_UNAVAILABLE_PROVIDER).toBeDefined();
		});
	});
	describe('env.SMTPConfig', () => {
		it('should have EMAIL', () => {
			expect(process.env.EMAIL).toBeDefined();
		});
		it('should have PASSWORD', () => {
			expect(process.env.PASSWORD).toBeDefined();
		});
		it('should have HOST (like "smtp.gmail.com")', () => {
			expect(process.env.HOST).toBeDefined();
		});
		it('should have SERVICE (like "gmail")', () => {
			expect(process.env.SERVICE).toBeDefined();
		});
	});
	describe('env.BinanceProvider', () => {
		it('should have a BINANCE_PROVIDER_TOKEN', () => {
			expect(process.env.BINANCE_PROVIDER_TOKEN).toBeDefined();
		});
		it('should have a BINANCE_PROVIDER_URL(BTC|UAH rate url)', () => {
			expect(process.env.BINANCE_PROVIDER_URL).toBeDefined();
		});
	});
	describe('env.CoinbaseProvider', () => {
		it('should have a COINBASE_PROVIDER_TOKEN', () => {
			expect(process.env.COINBASE_PROVIDER_TOKEN).toBeDefined();
		});
		it('should have a COINBASE_PROVIDER_URL(BTC|UAH rate url)', () => {
			expect(process.env.COINBASE_PROVIDER_URL).toBeDefined();
		});
	});
	describe('env.KunaProvider', () => {
		it('should have a KUNA_PROVIDER_TOKEN', () => {
			expect(process.env.KUNA_PROVIDER_TOKEN).toBeDefined();
		});
		it('should have a KUNA_PROVIDER_URL(BTC|UAH rate url)', () => {
			expect(process.env.KUNA_PROVIDER_URL).toBeDefined();
		});
	});
	describe('env.NomicsProvider', () => {
		it('should have a NOMICS_PROVIDER_TOKEN', () => {
			expect(process.env.NOMICS_PROVIDER_TOKEN).toBeDefined();
		});
		it('should have a NOMICS_PROVIDER_URL(BTC|UAH rate url)', () => {
			expect(process.env.NOMICS_PROVIDER_URL).toBeDefined();
		});
	});
	describe('env.TestProvider', () => {
		it('should have a TEST_PROVIDER_TOKEN', () => {
			expect(process.env.TEST_PROVIDER_TOKEN).toBeDefined();
		});
		it('should have a TEST_PROVIDER_URL(BTC|UAH rate url)', () => {
			expect(process.env.TEST_PROVIDER_URL).toBeDefined();
		});
	});
});
