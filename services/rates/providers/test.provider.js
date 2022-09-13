const fetch = require('node-fetch');
const log = require('../../logger')('TestProvider');
const { providersNamesDict, providersKeysDict } = require('../const/providers.const');
const BaseProvider = require('./base/base.provider');
require('dotenv').config();

class TestProvider extends BaseProvider {
	providerName = providersNamesDict.test;
	providerKey = providersKeysDict.test;
	token = process.env.TestProviderToken;

	async getBtcUahRateAsync() {
		const url = process.env.TestProviderUrl;
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
		const rate = json.data.id;
		log.info(`Success fetching btc uah rate: ${rate}`);
		log.debug(`${this.providerName} response: ${JSON.stringify(json)}`);
		return Number(rate);
	}
}

module.exports = TestProvider;
