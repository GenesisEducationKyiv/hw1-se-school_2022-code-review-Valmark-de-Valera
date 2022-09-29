import { User } from '../../models/user.model';

describe('UserController', () => {
	let user: User;

	beforeEach(async () => {
		user = new User('test@test.com');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be defined', () => {
		expect(user).toBeDefined();
	});

	describe('#setEmail', function () {
		it('should set new email', function () {
			const oldEmail = user.getEmail();
			const newEmail = 'test2@test.com';

			const result = user.setEmail(newEmail);

			expect(result).toBeTruthy();
			expect(user.getEmail()).not.toEqual(oldEmail);
		});
		it('should reject fake string', function () {
			const oldEmail = user.getEmail();
			const newEmail = 'test2@test';

			const result = user.setEmail(newEmail);

			expect(result).toBeFalsy();
			expect(user.getEmail()).toEqual(oldEmail);
		});
	});
});
