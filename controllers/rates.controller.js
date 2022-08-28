const BinanceProvider = require('../services/providers/binance.provider');
const TestProvider = require('../services/providers/test.provider');

/**
 * Controller work with rates providers via api.
 */
class RatesController {
    /**
     * Selected provider (After init Binance is default rates provider).
     */
    static provider = new BinanceProvider();

    /**
     * Change active rate provider.
     *
     * @param {string} name - Name of rate provider.
     */
    static changeProvider (name) {
        switch (name) {
        case 'binance':
            this.provider = new BinanceProvider();
            break;
        case 'test':
            // set up other provider
            this.provider = new TestProvider();
            break;
        case 'Provider2':
            // set up other provider
            // this.provider = new TestProvider();
            break;
        default:
            this.provider = new BinanceProvider();
            // or
            // console.error("Wrong provider name");
            break;
        }
    }

    /**
     * Returns x raised to the n-th power.
     *
     * @param {object} response - express api response object. Use for return rate value to user.
     * @return {number} rateValue - rate value from provider.
     */
    static async getLastRateAsync (response = undefined) {
        const rateValue = await this.provider.getBtcUahRateAsync();
        if (!isNaN(rateValue)) response?.send(rateValue.toFixed());
        else response?.status(400).send('Помилка виконання запиту');
        return rateValue;
    }
}

module.exports = RatesController;
