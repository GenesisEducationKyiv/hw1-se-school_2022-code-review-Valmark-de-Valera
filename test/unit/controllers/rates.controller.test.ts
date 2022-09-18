const assert = require('assert');
const sinon = require('sinon');
const RatesController = require('../../../src/controllers/rates.controller');

const response = {
	status: function (code) {
		return { status: code, send: function () {} };
	},
	send: function () {},
};

describe('RatesController', function () {
	before(function () {
		sinon.spy(response, 'status');
	});
	describe('#changeProviderByName', function () {
		it('should return 404 status code', function () {
			const providerName = undefined;

			RatesController.changeProviderByName(providerName, response);
			if (response.status.calledOnce) {
				const statusArg = response.status.getCall(0).args[0];
				if (!statusArg || isNaN(statusArg))
					assert.fail(`Controller should return 404 as number`);
				if (statusArg !== 404) assert.fail(`Controller should return 404`);
			} else assert.fail(`Controller should call status()`);

			sinon.reset();
			assert.ok(true);
		});
	});
});
