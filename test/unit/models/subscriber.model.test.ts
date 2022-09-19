import Subscriber from '../../../src/models/subscriber/subscriber.model';

let subscriber: Subscriber;

beforeAll(() => {
	subscriber = new Subscriber('test@test.com');
});

describe('Subscriber', function () {
	describe('#setEmail', function () {
		it('should set new email', function () {
			const oldEmail = subscriber.getEmail();
			const newEmail = 'test2@test.com';

			const result = subscriber.setEmail(newEmail);

			expect(result).toBeTruthy();
			expect(subscriber.getEmail()).not.toEqual(oldEmail);
		});
		it('should reject fake string', function () {
			const oldEmail = subscriber.getEmail();
			const newEmail = 'test2@test';

			const result = subscriber.setEmail(newEmail);

			expect(result).toBeFalsy();
			expect(subscriber.getEmail()).toEqual(oldEmail);
		});
	});
});
