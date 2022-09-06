let assert = require('assert');
const sinon = require('sinon');
const RatesController = require('../../../controllers/rates.controller');

let response = {
	status: function (code) {
		return { status: code, send: function () {} };
	},
	send: function () {},
};

describe('RatesController', function () {
	before(function () {
		sinon.spy(response, 'send');
	});
	describe('#getLastRateAsync', function () {
		it('should return rate as number', async function () {
			const providersTokenArr = ['binance', 'test'];

			for (let item in providersTokenArr) {
				RatesController.changeProvider(providersTokenArr[item]);
				await RatesController.getLastRateAsync(response);
				const sendArg = response.send.getCall(item).args[0];
				if (isNaN(sendArg))
					assert.fail(`Provider should return number, not this: ${sendArg}`);
			}

			sinon.reset();
			assert.ok(true);
		});
	});
});
