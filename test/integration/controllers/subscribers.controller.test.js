let assert = require('assert');
const sinon = require('sinon');
const SubscribersController = require('../../../controllers/subscribers.controller');
const Subscriber = require('../../../models/subscriber.model');

let response = {
	status: function (code) {
		return { status: code, send: function () {} };
	},
	send: function () {},
};

describe('SubscribersController', function () {
	before(function () {
		sinon.spy(response, 'send');
	});
	describe('#sendEmailsAsync', function () {
		this.timeout(5000);
		it('should sent mails to test emails list', async function () {
			const subscribersArray = [new Subscriber('test@test.com')];

			await SubscribersController.sendEmailsAsync(response, subscribersArray);

			const sendArg = response.send.getCall(0).args[0];
			sinon.reset();
			sendArg.map(function (item) {
				if (!item.success) assert.fail(`Fail sending to: ${item.email}`);
			});
			assert.ok(true);
		});
	});
});
