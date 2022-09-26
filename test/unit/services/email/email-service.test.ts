import 'reflect-metadata';
import EmailService from '../../../../src/services/email/email-service';

describe('EmailService', function () {
	describe('#sendRateMailAsync', function () {
		it('should return false because of invalid email', async function () {
			const email = '';
			const emailService = new EmailService();

			const result = await emailService.sendRateMailAsync(email, '0');

			expect(result).toBeFalsy();
		});
	});
});
