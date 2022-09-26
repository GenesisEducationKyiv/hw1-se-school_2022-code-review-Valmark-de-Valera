import IRateService from '../interfaces/interface.rate-service';
import fetch from 'node-fetch';
import { providersNamesDict } from '../../const/providers.const';
import logFab from '../../../logger';
import 'dotenv/config';
import RateErrorMessage from '../../../../models/error/rate-errors/rate-error-message.model';
import { rateErrorsDict } from '../../../../models/error/const/rate-errors.const';
const log = logFab('NomicsRateService');

class NomicsRateService implements IRateService {
	public providerName = providersNamesDict.nomics;
	public token = '';

	constructor(token: string) {
		this.token = token;
	}

	public async getBtcUahRateAsync(): Promise<number> {
		const methodName = 'BTC_UAH_RATE';
		const url = process.env.NOMICS_PROVIDER_URL || '';
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
			throw new RateErrorMessage(rateErrorsDict.WRONG_PROVIDER_RESPONSE);
		}
		try {
			const json = await response.json();
			const rate = json[0].price;
			log.info(`Success fetching btc uah rate: ${rate}`);
			log.debug(`${this.providerName} response: ${JSON.stringify(json)}`);
			return Number(rate);
		} catch (e) {
			log.error(
				`Invalid value or response from request '${methodName}. Possible API was changed. Error: ${e}`
			);
			throw new RateErrorMessage(rateErrorsDict.WRONG_PROVIDER_RESPONSE);
		}
	}
}

export default NomicsRateService;
