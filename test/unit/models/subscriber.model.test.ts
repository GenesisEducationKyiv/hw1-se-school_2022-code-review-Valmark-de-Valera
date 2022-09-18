const assert = require('assert');
const Subscriber = require('../../../src/models/subscriber/subscriber.model');

describe('Subscriber', function () {
	describe('#setEmail', function () {
		let subscriber;
		before(function () {
			subscriber = new Subscriber('test@test.com');
		});
		it('should set new email', function () {
			const oldEmail = subscriber.getEmail();
			const newEmail = 'test2@test.com';

			const result = subscriber.setEmail(newEmail);

			assert.notEqual(subscriber.getEmail(), oldEmail);
			assert.ok(result);
		});
		it('should reject fake string', function () {
			const oldEmail = subscriber.getEmail();
			const newEmail = 'test2@test';

			const result = subscriber.setEmail(newEmail);

			assert.equal(subscriber.getEmail(), oldEmail);
			assert.ok(!result);
		});
	});
});
