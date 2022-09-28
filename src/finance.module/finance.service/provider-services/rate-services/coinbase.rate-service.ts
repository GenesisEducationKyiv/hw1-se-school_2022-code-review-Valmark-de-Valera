import fetch from 'node-fetch';
import { Logger } from '@nestjs/common';
import { IRateService } from '../interfaces/interface.rate-service';
import { providersNamesDict } from '../../const/providers.const';
import { rateErrorsDict } from '../../const/error/rate-errors.const';

interface CoinbaseResponseModel {
	data: {
		rates: {
			UAH: number;
		};
	};
}

export class CoinbaseRateService implements IRateService {
	private readonly logger = new Logger(CoinbaseRateService.name);
	public providerName = providersNamesDict.coinbase;
	public token = '';

	constructor(token: string) {
		this.token = token;
	}

	public async getBtcUahRateAsync(): Promise<number> {
		const methodName = 'BTC_UAH_RATE';
		const url = process.env.COINBASE_PROVIDER_URL || '';
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).catch((error) => {
			this.logger.error(`Request '${methodName}' failed. ${error}`);
			return null;
		});
		if (!response || !response.ok) {
			this.logger.error(
				`Wrong answer from request '${methodName}'. Error [${
					response?.status || 'Wrong response'
				}]: ${(await response?.text()) || 'Wrong response'}`,
			);
			throw new Error(rateErrorsDict.WRONG_PROVIDER_RESPONSE);
		}
		try {
			const json = (await response.json()) as CoinbaseResponseModel;
			const rate = json.data.rates.UAH;
			this.logger.log(`Success fetching btc uah rate: ${rate}`);
			this.logger.debug(`${this.providerName} response: ${JSON.stringify(json)}`);
			return Number(rate);
		} catch (e) {
			this.logger.error(
				`Invalid value or response from request '${methodName}. Possible API was changed. Error: ${e}`,
			);
			throw new Error(rateErrorsDict.WRONG_PROVIDER_RESPONSE);
		}
	}
}
