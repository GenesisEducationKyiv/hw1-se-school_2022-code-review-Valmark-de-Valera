const fetch = require('node-fetch');
const log = require('../../logger')('BinanceProvider');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const BaseProvider = require('./base/base.provider');
require('dotenv').config();

class BinanceProvider extends BaseProvider {
	providerName = providersNamesDict.binance;
	providerKey = providersKeysDict.binance;
	token = process.env.BinanceProviderToken;

	async getBtcUahRateAsync() {
		const url = process.env.BinanceProviderUrl;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			log.error('Failed to fetch btc uah rate');
			return null;
		}
		const json = await response.json();
		const rate = json.price;
		log.info(`Success fetching btc uah rate: ${rate}`);
		log.debug(`${this.providerName} response: ${JSON.stringify(json)}`);
		return Number(rate);
	}
}

module.exports = BinanceProvider;
