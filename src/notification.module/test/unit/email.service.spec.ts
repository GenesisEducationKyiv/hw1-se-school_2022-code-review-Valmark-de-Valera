import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../../email.service/email.service';
import { NotificationModule } from '../../notification.module';

describe('EmailService', () => {
	let service: EmailService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [NotificationModule],
		}).compile();

		service = module.get<EmailService>(EmailService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('#sendRateMailAsync', function () {
		it('should return false because of invalid email', async function () {
			const email = '';

			const result = await service.sendRateMailAsync(email, '0');

			expect(result).toBeFalsy();
		});
	});
});
