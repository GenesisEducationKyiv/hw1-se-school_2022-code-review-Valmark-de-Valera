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
		it('should send email and return true', async function () {
			const email = 'test@test.com';

			const result = await service.sendRateMailAsync(email, '0');

			expect(result).toBeTruthy();
		});
	});
});
