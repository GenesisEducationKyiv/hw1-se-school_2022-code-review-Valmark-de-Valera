import IRateService from '../interfaces/interface.rate-service';
import fetch from 'node-fetch';
import { providersNamesDict } from '../../const/providers.const';
import logFab from '../../../logger';
import 'dotenv/config';
const log = logFab('KunaRateService');

class KunaRateService implements IRateService {
	public providerName = providersNamesDict.kuna;
	public token = '';

	constructor(token: string) {
		this.token = token;
	}

	public async getBtcUahRateAsync(): Promise<number | null> {
		const methodName = 'BTC_UAH_RATE';
		const url = process.env.KUNA_PROVIDER_URL || '';
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).catch((error) => {
			log.error(`Request '${methodName}' failed. ${error}`);
			return null;
		});
		if (!response || !response.ok) {
			log.error(
				`Wrong answer from request '${methodName}'. Error [${
					response?.status || 'Wrong response'
				}]: ${(await response?.text()) || 'Wrong response'}`
			);
			return null;
		}
		try {
			const json = await response.json();
			const rate = json[0][7];
			log.info(`Success fetching btc uah rate: ${rate}`);
			log.debug(`${this.providerName} response: ${JSON.stringify(json)}`);
			return Number(rate);
		} catch (e) {
			log.error(
				`Invalid value or response from request '${methodName}. Possible API was changed. Error: ${e}`
			);
			return null;
		}
	}
}

export default KunaRateService;
