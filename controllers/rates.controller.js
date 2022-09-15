const FinanceService = require('../services/rates/finance-service');
const {
	providersNamesDict,
	providersKeysDict,
} = require('../services/rates/const/providers.const');

class RatesController {
	static financeService = new FinanceService();

	static changeProviderByName(name, response = undefined) {
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

	static changeProviderByKey(key, response = undefined) {
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

	static async getBtcUahRateAsync(response = undefined) {
		const rateValue = await this.financeService.getBtcUahRateAsync();
		if (rateValue && !isNaN(rateValue)) response?.send(rateValue.toFixed());
		else response?.status(400).send('Помилка виконання запиту');
	}
}

module.exports = RatesController;
