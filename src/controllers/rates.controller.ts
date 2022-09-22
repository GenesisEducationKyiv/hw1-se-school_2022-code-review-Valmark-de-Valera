import FinanceService from '../services/rates/finance-service';
import { providersNamesDict, providersKeysDict } from '../services/rates/const/providers.const';
import { Request, Response } from 'express';
import { controller, httpGet, httpPut, interfaces } from 'inversify-express-utils';
import { inject } from 'inversify';
import { DIServices } from '../DITypes';

@controller('/api/rates')
class RatesController implements interfaces.Controller {
	private _financeService: FinanceService;

	constructor(@inject(DIServices.FinanceService) financeService: FinanceService) {
		this._financeService = financeService;
	}

	@httpPut('/changeProviderByName')
	changeProviderByName(request: Request, response: Response) {
		const name = request.body?.name || '';
		const result = this._financeService.setActiveProviderByName(name);
		if (result) response?.send('Провайдер успішно змінено');
		else
			response
				?.status(404)
				.send(
					`Провайдер не знайдено. Доступні провайдери: ${Object.values(
						providersNamesDict
					)}`
				);
	}

	@httpPut('/changeProviderByKey')
	changeProviderByKey(request: Request, response: Response) {
		const key = request.body?.key || '';
		const result = this._financeService.setActiveProviderByKey(key);
		if (result) response?.send('Провайдер успішно змінено');
		else
			response
				?.status(404)
				.send(
					`Провайдер не знайдено. Доступні провайдери: ${Object.values(
						providersKeysDict
					)}`
				);
	}

	@httpGet('/rate')
	async getBtcUahRateAsync(request: Request, response: Response) {
		const rateValue = await this._financeService.getBtcUahRateAsync();
		if (rateValue && !isNaN(rateValue)) response?.send(rateValue.toFixed());
		else response?.status(400).send('Помилка виконання запиту');
	}
}

export default RatesController;
