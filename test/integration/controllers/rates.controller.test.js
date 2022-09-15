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
	describe('#getBtcUahRateAsync', function () {
		it('should return rate as number', async function () {
			await RatesController.getBtcUahRateAsync(response);
			if (response.send.calledOnce) {
				const sendArg = response.send.getCall(0).args[0];
				if (!sendArg || isNaN(sendArg))
					assert.fail(`Provider should return number, not this: ${sendArg}`);
			} else assert.fail(`Controller should call send()`);

			sinon.reset();
			assert.ok(true);
		});
	});
});
