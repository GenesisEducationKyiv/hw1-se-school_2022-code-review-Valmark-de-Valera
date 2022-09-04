let assert = require('assert');
const puppeteer = require('puppeteer');
const BinanceProvider = require('../../services/providers/binance.provider');

describe('Binance E2E Tests', function () {
	this.timeout(60000);
	let page, browser;
	let browserOption = {
		headless: false,
		slowMo: 100,
	};

	before(async function () {
		browser = await puppeteer.launch(browserOption);
		page = await browser.newPage();
	});

	it('should check if rate show on website', async function () {
		const priceSelector = 'div.showPrice';
		await page.goto('https://www.binance.com/uk-UA/trade/BTC_UAH');

		await page.waitForSelector(priceSelector);
		let result = await page.evaluate(() => {
			return document.getElementsByClassName('showPrice')[0].innerHTML;
		});

		if (!parseFloat(result)) assert.fail(`Provider should return number, not this: ${result}`);
		assert.ok(true);
	});
	it('should check if rate on website the same as via API', async function () {
		const priceSelector = 'div.showPrice';
		const provider = new BinanceProvider();
		await page.goto('https://www.binance.com/uk-UA/trade/BTC_UAH');

		await page.waitForSelector(priceSelector);
		let resultWeb = await page.evaluate(() => {
			return document.getElementsByClassName('showPrice')[0].innerHTML;
		});
		const resultApi = await provider.getBtcUahRateAsync();
		resultWeb = resultWeb.replaceAll(',', '');

		if (parseFloat(resultWeb) !== resultApi)
			assert.fail(
				`Provider should return the same numbers, not this: Web:${resultWeb} API:${resultApi}`
			);
		assert.ok(true);
	});

	after(async function () {
		await page.close();
		await browser.close();
	});
});
