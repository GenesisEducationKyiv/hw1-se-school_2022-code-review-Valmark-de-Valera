import puppeteer from 'puppeteer';
import { Test, TestingModule } from '@nestjs/testing';
import { FinanceModule } from '../../finance.module/finance.module';
import { FinanceProviderFabric } from '../../finance.module/finance.service/finance-provider.fabric';
import { providersKeysDict } from '../../finance.module/finance.service/const/providers.const';
import { IRateService } from '../../finance.module/finance.service/provider-services/interfaces/interface.rate-service';

let page: puppeteer.Page, browser: puppeteer.Browser;
const browserOption = {
	headless: false,
	slowMo: 100,
};

jest.setTimeout(60000);

beforeAll(async () => {
	browser = await puppeteer.launch(browserOption);
	page = await browser.newPage();
});

afterAll(async () => {
	await page.close();
	await browser.close();
});

describe('Binance E2E Tests', function () {
	let service: IRateService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [FinanceModule],
		}).compile();

		const fabric = module.get<FinanceProviderFabric>(FinanceProviderFabric);
		service = fabric.getProviderByKey(providersKeysDict.binance).createRateService();
	});
	it('should check if rate show on website', async function () {
		const priceSelector = 'div.showPrice';

		await page.goto('https://www.binance.com/uk-UA/trade/BTC_UAH');
		await page.waitForSelector(priceSelector);
		const result = await page.evaluate(() => {
			return document.getElementsByClassName('showPrice')[0].innerHTML;
		});

		if (!parseFloat(result)) fail(`Provider should return number, not this: ${result}`);
	});
	it('should check if rate on website the same as via API', async function () {
		const priceSelector = 'div.showPrice';

		await page.goto('https://www.binance.com/uk-UA/trade/BTC_UAH');
		await page.waitForSelector(priceSelector);
		let resultWeb = await page.evaluate(() => {
			return document.getElementsByClassName('showPrice')[0].innerHTML;
		});
		const resultApi = await service.getBtcUahRateAsync();
		resultWeb = resultWeb.replaceAll(',', '');

		if (parseFloat(resultWeb) !== resultApi)
			fail(
				`Provider should return the same numbers, not this: Web:${resultWeb} API:${resultApi}`,
			);
	});
	it('should check rate calculation on website', async function () {
		const menuBar = 'div.orderTab';
		const uahToRate = 20;

		await page.goto('https://www.binance.com/uk-UA/trade/BTC_UAH');
		await page.waitForSelector(menuBar);
		await page.evaluate(() => {
			const menu = document.getElementsByClassName('orderTab')[0];
			const marketButton = menu.querySelector(
				'[data-testid="MarketType"]',
			) as HTMLButtonElement;
			if (!marketButton) fail('Website does not contain "Market" button');
			marketButton.click();
		});
		await page.focus('#FormRow-BUY-total');
		await page.keyboard.type(uahToRate.toString());
		let result = await page.evaluate(() => {
			const formBuyInputWeb = document.getElementById('FormRow-BUY-total')
				?.parentNode as HTMLElement;
			return formBuyInputWeb?.getElementsByClassName('bn-input-tooltip-content')[0].innerHTML;
		});
		result = result.replace(/[^\d.-]/g, '');

		if (!parseFloat(result)) fail(`Provider should return number, not this: ${result}`);
	});
});
