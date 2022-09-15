const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const log = require('../../../logger')('BinanceRateService');
const RateService = require('../base/base.rate-service');
const { providersNamesDict } = require('../../const/providers.const');
require('dotenv').config();

class BinanceRateService extends RateService {
	providerName = providersNamesDict.binance;
	token = undefined;
	cacheData = {
		cacheActive: true,
		cacheExpireInSeconds: process.env.CACHE_EXPIRE_SECONDS,
		cacheService: undefined,
	};

	constructor(token) {
		super();
		this.token = token;
		this.cacheData.cacheService = new NodeCache({
			stdTTL: this.cacheData.cacheExpireInSeconds,
		});
	}

	async getBtcUahRateAsync() {
		let cacheName = 'BTC_UAH_RATE';
		if (this.cacheData.cacheActive && this.cacheData.cacheService.get(cacheName)) {
			log.debug(`Cache used for request ${cacheName}`);
			return Number(this.cacheData.cacheService.get(cacheName));
		}
		const url = process.env.BINANCE_PROVIDER_URL;
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
			const rate = json.price;
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
}

module.exports = BinanceRateService;
