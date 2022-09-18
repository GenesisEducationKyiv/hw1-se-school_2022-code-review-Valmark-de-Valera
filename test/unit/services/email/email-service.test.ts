const assert = require('assert');
const EmailService = require('../../../../src/services/email/email-service');

describe('EmailService', function () {
	describe('#sendRateMailAsync', function () {
		it('should return undefined because of empty emails list', async function () {
			const email = undefined;
			const emailService = new EmailService();

			const result = await emailService.sendRateMailAsync(email, 0);

			assert.ok(!result);
		});
	});
});
