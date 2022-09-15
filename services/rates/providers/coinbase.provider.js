const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const log = require('../../logger')('CoinbaseProvider');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const BaseProvider = require('./base/base.provider');
require('dotenv').config();

class CoinbaseProvider extends BaseProvider {
	providerName = providersNamesDict.coinbase;
	providerKey = providersKeysDict.coinbase;
	token = process.env.COINBASE_PROVIDER_TOKEN;
	cacheData = {
		cacheActive: true,
		cacheExpireInSeconds: 300,
		cacheService: undefined,
	};

	constructor() {
		super();
		this.cacheData.cacheService = new NodeCache({
			stdTTL: this.cacheData.cacheExpireInSeconds.toString(),
		});
	}

	async getBtcUahRateAsync() {
		let cacheName = 'BTC_UAH_RATE';
		if (this.cacheData.cacheActive && this.cacheData.cacheService.get(cacheName)) {
			log.debug('Cache used for request getBtcUahRateAsync');
			return Number(this.cacheData.cacheService.get(cacheName));
		}
		const url = process.env.COINBASE_PROVIDER_URL;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			log.error(
				`Failed to fetch btc uah rate. Error [${response.status}]: ${await response.text()}`
			);
			return null;
		}
		try {
			const json = await response.json();
			const rate = json.data.rates.UAH;
			log.info(`Success fetching btc uah rate: ${rate}`);
			log.debug(`${this.providerName} response: ${JSON.stringify(json)}`);
			if (this.cacheData.cacheActive) this.cacheData.cacheService.set(cacheName, rate);
			return Number(rate);
		} catch (e) {
			log.error(`Failed to validate answer from ${this.providerName}. Error: ${e}`);
			return null;
		}
	}
}

module.exports = CoinbaseProvider;
