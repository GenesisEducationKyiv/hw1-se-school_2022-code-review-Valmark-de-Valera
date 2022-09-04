let assert = require('assert');
const BinanceProvider = require('../../../services/providers/binance.provider');
const TestProvider = require('../../../services/providers/test.provider');
const RatesController = require('../../../controllers/rates.controller');

describe('RatesController', function () {
	describe('#changeProvider', function () {
		it('should change 2 providers by make names to lowercase', function () {
			const providersArr = [new BinanceProvider(), new TestProvider()];

			providersArr.map(function (item) {
				RatesController.changeProvider(item.providerName.toLowerCase());
				if (RatesController.provider.providerName !== item.providerName)
					assert.fail(`Provider object is not valid: ${item}`);
			});

			assert.ok(true);
		});
	});
});
