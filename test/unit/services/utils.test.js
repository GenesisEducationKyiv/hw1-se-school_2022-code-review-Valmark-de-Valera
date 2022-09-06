let assert = require('assert');
const { faker } = require('@faker-js/faker');
const { validateEmail } = require('../../../services/utils');

describe('Utils', function () {
	describe('#validateEmail', function () {
		it('should validate test emails', function () {
			const emailArr = ['test@test.test', 'test.set@test.com.ua'];
			for (let i = 0; i < 10; i++) emailArr.push(faker.internet.email());

			emailArr.map(function (item) {
				if (!validateEmail(item)) assert.fail(`Email should be valid: ${item}`);
			});

			assert.ok(true);
		});
		it('should invalidate test emails', function () {
			const emailArr = ['test@test.', 'test.set@test', 'test.test@'];

			emailArr.map(function (item) {
				if (validateEmail(item)) assert.fail(`Email should not be valid: ${item}`);
			});

			assert.ok(true);
		});
	});
});
