import IRateService from '../interfaces/interface.rate-service';
import fetch from 'node-fetch';
// import NodeCache from 'node-cache';
import { providersNamesDict } from '../../const/providers.const';
import logFab from '../../../logger';
import 'dotenv/config';
const log = logFab('TestRateService');

class TestRateService implements IRateService {
	public providerName = providersNamesDict.test;
	public token = '';
	public testFail = process.env.TEST_PROVIDER_FAIL || false;
	private cacheData = {
		cacheActive: true,
		cacheExpireInSeconds: process.env.CACHE_EXPIRE_SECONDS,
		cacheService: undefined,
	};

	constructor(token: string) {
		this.token = token;
		// this.cacheData.cacheService = new NodeCache({
		// 	stdTTL: this.cacheData.cacheExpireInSeconds,
		// });
	}

	public async getBtcUahRateAsync(): Promise<number | null> {
		const cacheName = 'BTC_UAH_RATE';
		if (this.testFail) return null;
		// if (this.cacheData.cacheActive && this.cacheData.cacheService.get(cacheName)) {
		// 	log.debug(`Cache used for request ${cacheName}`);
		// 	return Number(this.cacheData.cacheService.get(cacheName));
		// }
		const url = process.env.TEST_PROVIDER_URL || '';
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
			// if (this.cacheData.cacheActive) this.cacheData.cacheService.set(cacheName, rate);
			return Number(rate);
		} catch (e) {
			log.error(
				`Invalid value or response from request '${cacheName}. Possible API was changed. Error: ${e}`
			);
			return null;
		}
	}
}

export default TestRateService;
