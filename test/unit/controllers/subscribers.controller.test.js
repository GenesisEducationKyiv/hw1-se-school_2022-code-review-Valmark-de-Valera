let assert = require('assert');
const SubscribersController = require('../../../controllers/subscribers.controller');
const sinon = require('sinon');

let response = {
	status: function () {
		return { send: function () {} };
	},
	send: function () {},
};

describe('SubscribersController', function () {
	before(function () {
		sinon.spy(response, 'status');
		sinon.spy(response, 'send');
	});
	describe('#addSubscriber', function () {
		it('should check missing email and return status 400', function () {
			const email = undefined;

			SubscribersController.addSubscriber(email, response);

			const statusArg = response.status.getCall(0).args[0];
			sinon.reset();
			assert.equal('400', statusArg);
		});
		it('should check invalid email and return status 400', function () {
			const email = 'test';

			SubscribersController.addSubscriber(email, response);

			const statusArg = response.status.getCall(0).args[0];
			sinon.reset();
			assert.equal('400', statusArg);
		});
	});
	describe('#removeSubscriber', function () {
		it('should check missing email and return status 400', function () {
			const email = undefined;

			SubscribersController.removeSubscriber(email, response);

			const statusArg = response.status.getCall(0).args[0];
			sinon.reset();
			assert.equal('400', statusArg);
		});
		it('should check invalid email and return status 400', function () {
			const email = 'test';

			SubscribersController.removeSubscriber(email, response);

			const statusArg = response.status.getCall(0).args[0];
			sinon.reset();
			assert.equal('400', statusArg);
		});
	});
	describe('#sendEmailsAsync', function () {
		it('should return code 204 because of empty receivers list', async function () {
			const emailsArray = [];

			await SubscribersController.sendEmailsAsync(response, emailsArray);

			const statusArg = response.status.getCall(0).args[0];
			sinon.reset();
			assert.equal('204', statusArg);
		});
	});
	describe('#getAllSubscribers', function () {
		it('should return subscribers array', async function () {
			await SubscribersController.getAllSubscribers(response);

			const sendArg = response.send.getCall(0).args[0];
			sinon.reset();
			if (!Array.isArray(sendArg))
				assert.fail(`Return should be array of string values, not this: ${sendArg}`);
			if (sendArg.length && typeof sendArg[0] !== 'string')
				assert.fail(`Array should include string values, not this: ${sendArg}`);
		});
	});
});
