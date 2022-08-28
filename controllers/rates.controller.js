const BinanceProvider = require('../services/providers/binance.provider');
const TestProvider = require('../services/providers/test.provider');

class RatesController {
    static provider = new BinanceProvider();

    static changeProvider (name) {
        switch (name) {
        case 'binance':
            this.provider = new BinanceProvider();
            break;
        case 'test':
            this.provider = new TestProvider();
            break;
        default:
            this.provider = new BinanceProvider();
            console.error('Wrong provider name');
            break;
        }
    }

    static async getLastRateAsync (response = undefined) {
        const rateValue = await this.provider.getBtcUahRateAsync();
        if (!isNaN(rateValue)) response?.send(rateValue.toFixed());
        else response?.status(400).send('Помилка виконання запиту');
        return rateValue;
    }
}

module.exports = RatesController;
