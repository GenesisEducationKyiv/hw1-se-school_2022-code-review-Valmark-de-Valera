let assert = require('assert');
const fs = require('fs');
const Subscriber = require('../../../models/subscriber.model');
const SubscriberRepository = require('../../../repository/subscriber.repository');

let fileModel = {
	name: 'Emails of subscribers',
	emails: [],
};

describe('SubscriberRepository', function () {
	describe('#append', function () {
		const fileName = '.tmpTestAdd.json';
		before(function () {
			fs.writeFileSync(fileName, JSON.stringify(fileModel, null, 2), function writeJSON(err) {
				if (err) return console.log(err);
			});
		});
		it('should create temp file and add new subscriber email', function () {
			const email = 'test@test.com';
			const subscriber = new Subscriber(email);
			let subscriberRepository = new SubscriberRepository(fileName);

			subscriberRepository.append(subscriber);
			let result = require('../../../' + fileName);

			assert.ok(result.emails.includes(email));
		});
		after(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
	describe('#remove', function () {
		const fileName = '.tmpTestRemove.json';
		const emailToRemove = 'test@test.com';
		before(function () {
			let cusFileModel = fileModel;
			cusFileModel.emails.push(emailToRemove);
			fs.writeFileSync(
				fileName,
				JSON.stringify(cusFileModel, null, 2),
				function writeJSON(err) {
					if (err) return console.log(err);
				}
			);
		});
		it('should create temp file and and check if email was removed', function () {
			const subscriber = new Subscriber(emailToRemove);
			let subscriberRepository = new SubscriberRepository(fileName);

			subscriberRepository.remove(subscriber);
			let result = require('../../../' + fileName);

			assert.ok(!result.emails.includes(emailToRemove));
		});
		after(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
});
