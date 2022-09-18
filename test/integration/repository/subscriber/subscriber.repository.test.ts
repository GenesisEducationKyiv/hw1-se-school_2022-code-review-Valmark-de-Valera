const assert = require('assert');
const fs = require('fs');
const log = require('../../../../src/services/logger')('SubscribersRepositoryTest');
const Subscriber = require('../../../../src/models/subscriber/subscriber.model');
const SubscriberRepository = require('../../../../src/repository/subscriber/file.subscriber.repository');

const fileModel = {
	name: 'Emails of subscribers',
	users: [],
};

describe('SubscriberRepository', function () {
	describe('#append', function () {
		const fileName = '.tmpTestAdd.json';
		before(function () {
			fs.writeFileSync(fileName, JSON.stringify(fileModel, null, 2), function writeJSON(err) {
				if (err) return log.error(`Failed to create temporary file: ${fileName}`);
			});
		});
		it('should create temp file and add new subscriber email', function () {
			const email = 'test@test.com';
			const subscriber = new Subscriber(email);
			const subscriberRepository = new FileSubscriberRepository(fileName);

			subscriberRepository.append(subscriber);
			const result = require('../../../../' + fileName);

			assert.ok(result.users.some((item) => item.email === email));
		});
		after(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
	describe('#remove', function () {
		const fileName = '.tmpTestRemove.json';
		const emailToRemove = 'test@test.com';
		before(function () {
			const cusFileModel = fileModel;
			cusFileModel.users.push(new Subscriber(emailToRemove));
			fs.writeFileSync(
				fileName,
				JSON.stringify(cusFileModel, null, 2),
				function writeJSON(err) {
					if (err) return log.error(`Failed to create temporary file: ${fileName}`);
				}
			);
		});
		it('should create temp file and and check if email was removed', function () {
			const subscriber = new Subscriber(emailToRemove);
			const subscriberRepository = new FileSubscriberRepository(fileName);

			subscriberRepository.remove(subscriber);
			const result = require('../../../../' + fileName);

			assert.ok(!result.users.some((item) => item.email === emailToRemove));
		});
		after(function (callback) {
			fs.unlink(fileName, callback);
		});
	});
});
