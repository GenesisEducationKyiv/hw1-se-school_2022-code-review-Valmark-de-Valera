let assert = require('assert');
const EmailService = require('../../../../services/email/email-service');

describe('EmailService', function () {
	describe('#sendRateMailAsync', function () {
		it('should send email and return true', async function () {
			const email = 'test@test.com';
			const emailService = new EmailService();

			const result = await emailService.sendRateMailAsync(email, 0);

			assert.ok(result);
		});
	});
});
