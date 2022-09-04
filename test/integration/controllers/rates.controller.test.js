let assert = require('assert');
const RatesController = require('../../../controllers/rates.controller');
const sinon = require('sinon');

let responce = {
	status: function (code) {
		return { status: code, send: function () {} };
	},
	send: function () {},
};

describe('RatesController', function () {
	before(function () {
		sinon.spy(responce, 'send');
	});
	describe('#getLastRateAsync', function () {
		it('should return rate as number', async function () {
			const providersTokenArr = ['binance', 'test'];

			for (let item in providersTokenArr) {
				RatesController.changeProvider(providersTokenArr[item]);
				await RatesController.getLastRateAsync(responce);
				const sendArg = responce.send.getCall(item).args[0];
				if (isNaN(sendArg))
					assert.fail(`Provider should return number, not this: ${sendArg}`);
			}

			sinon.reset();
			assert.ok(true);
		});
	});
});
