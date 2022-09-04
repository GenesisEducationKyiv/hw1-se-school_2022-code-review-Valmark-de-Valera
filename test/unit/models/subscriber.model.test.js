let assert = require('assert');
const fs = require('fs');
const Subscriber = require('../../../models/subscriber.model');

let fileModel = {
	name: 'Emails of subscribers',
	emails: [],
};

describe('SubscribersController', function () {
	describe('#addSubscriber', function () {
		const fileName = '.tmpTestAdd.json';
		before(function () {
			fs.writeFileSync(fileName, JSON.stringify(fileModel, null, 2), function writeJSON(err) {
				if (err) return console.log(err);
			});
		});
		it('should create temp file and add new subscriber email', function () {
			const email = 'test@test.com';

			let subscriber = new Subscriber(email, fileName);
			subscriber.append();
			let result = require('../../../' + fileName);

			assert.ok(result.emails.includes(email));
		});
		after(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
	describe('#removeSubscriber', function () {
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
		it('should check missing email and return status 400', function () {
			let subscriber = new Subscriber(emailToRemove, fileName);
			subscriber.remove();
			let result = require('../../../' + fileName);

			assert.ok(!result.emails.includes(emailToRemove));
		});
		after(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
});
