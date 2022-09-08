const RatesService = require('../services/rates/rates-service');
const {
	providersNamesDict,
	providersKeysDict,
} = require('../services/rates/const/providers.const');

class RatesController {
	static rateService = new RatesService();

	static async changeProviderByNameAsync(name, response = undefined) {
		const result = await this.rateService.changeProviderByNameAsync(name);
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

	static async changeProviderByKeyAsync(key, response = undefined) {
		const result = await this.rateService.changeProviderByKeyAsync(key);
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

	static async getLastRateAsync(response = undefined) {
		const rateValue = await this.rateService.getBtcUahRateAsync();
		if (!isNaN(rateValue)) response?.send(rateValue.toFixed());
		else response?.status(400).send('Помилка виконання запиту');
	}
}

module.exports = RatesController;
