let assert = require('assert');
const SubscribersController = require('../../../controllers/subscribers.controller');
const sinon = require('sinon');

let responce = {
	status: function (code) {
		return { status: code, send: function () {} };
	},
	send: function () {},
};

describe('SubscribersController', function () {
	before(function () {
		sinon.spy(responce, 'send');
	});
	describe('#sendEmailsAsync', function () {
		this.timeout(3000);
		it('should sent mails to test emails list', async function () {
			const emailsArray = ['test@test.com'];

			await SubscribersController.sendEmailsAsync(responce, emailsArray);

			const sendArg = responce.send.getCall(0).args[0];
			sinon.reset();
			sendArg.map(function (item) {
				if (!item.success) assert.fail(`Fail sending to: ${item.email}`);
			});
			assert.ok(true);
		});
	});
});
