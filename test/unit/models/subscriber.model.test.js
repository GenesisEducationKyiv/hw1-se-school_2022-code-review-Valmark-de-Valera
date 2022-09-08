let assert = require('assert');
const Subscriber = require('../../../models/subscriber.model');

describe('Subscriber', function () {
	describe('#setEmail', function () {
		let subscriber;
		before(function () {
			subscriber = new Subscriber('test@test.com');
		});
		it('should set new email', function () {
			let oldEmail = subscriber.getEmail();
			let newEmail = 'test2@test.com';

			let result = subscriber.setEmail(newEmail);

			assert.notEqual(subscriber.getEmail(), oldEmail);
			assert.ok(result);
		});
		it('should reject fake string', function () {
			let oldEmail = subscriber.getEmail();
			let newEmail = 'test2@test';

			let result = subscriber.setEmail(newEmail);

			assert.equal(subscriber.getEmail(), oldEmail);
			assert.ok(!result);
		});
	});
});
