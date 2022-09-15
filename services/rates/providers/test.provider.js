const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const log = require('../../logger')('TestProvider');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const BaseProvider = require('./base/base.provider');
require('dotenv').config();

let testOptions = {
	fail: false,
};

class TestProvider extends BaseProvider {
	providerName = providersNamesDict.test;
	providerKey = providersKeysDict.test;
	token = process.env.TEST_PROVIDER_TOKEN;
	testOptions = testOptions;
	cacheData = {
		cacheActive: false,
		cacheExpireInSeconds: process.env.CACHE_EXPIRE_SECONDS,
		cacheService: undefined,
	};

	constructor(options = testOptions) {
		super();
		this.testOptions = options;
		this.cacheData.cacheService = new NodeCache({
			stdTTL: this.cacheData.cacheExpireInSeconds.toString(),
		});
	}

	async getBtcUahRateAsync() {
		let cacheName = 'BTC_UAH_RATE';
		if (this.testOptions.fail) return null;
		if (this.cacheData.cacheActive && this.cacheData.cacheService.get(cacheName)) {
			log.debug(`Cache used for request ${cacheName}`);
			return Number(this.cacheData.cacheService.get(cacheName));
		}
		const url = process.env.TEST_PROVIDER_URL;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).catch((error) => {
			log.error(`Request '${cacheName}' failed. ${error}`);
			return null;
		});
		if (!response || !response.ok) {
			log.error(
				`Wrong answer from request '${cacheName}'. Error [${
					response?.status || 'Wrong response'
				}]: ${(await response?.text()) || 'Wrong response'}`
			);
			return null;
		}
		try {
			const json = await response.json();
			const rate = json.data.id;
			log.info(`Success fetching btc uah rate: ${rate}`);
			log.debug(`${this.providerName} response: ${JSON.stringify(json)}`);
			if (this.cacheData.cacheActive) this.cacheData.cacheService.set(cacheName, rate);
			return Number(rate);
		} catch (e) {
			log.error(
				`Invalid value or response from request '${cacheName}. Possible API was changed. Error: ${e}`
			);
			return null;
		}
	}

	resetTestOptions() {
		this.testOptions = testOptions;
	}
}

module.exports = TestProvider;
