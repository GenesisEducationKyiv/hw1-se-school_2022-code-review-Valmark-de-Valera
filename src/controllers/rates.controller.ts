import FinanceService from '../services/rates/finance-service';
import { providersNamesDict, providersKeysDict } from '../services/rates/const/providers.const';
import { Response } from 'express';

class RatesController {
	static financeService = new FinanceService();

	static changeProviderByName(name: string, response: Response) {
		const result = this.financeService.setActiveProviderByName(name);
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

	static changeProviderByKey(key: string, response: Response) {
		const result = this.financeService.setActiveProviderByKey(key);
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

	static async getBtcUahRateAsync(response: Response) {
		const rateValue = await this.financeService.getBtcUahRateAsync();
		if (rateValue && !isNaN(rateValue)) response?.send(rateValue.toFixed());
		else response?.status(400).send('Помилка виконання запиту');
	}
}

export default RatesController;
