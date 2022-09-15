/* eslint-disable no-unused-vars */
class SubscriberBaseRepository {
	append(subscriber) {
		throw new Error(`Method 'append' is not implemented`);
	}

	remove(subscriber) {
		throw new Error(`Method 'remove' is not implemented`);
	}

	isEmailExist(email) {
		throw new Error(`Method 'isEmailExist' is not implemented`);
	}

	getByEmail(email) {
		throw new Error(`Method 'getByEmail' is not implemented`);
	}

	getAll() {
		throw new Error(`Method 'getAll()' is not implemented`);
	}

	save() {
		throw new Error(`Method 'save()' is not implemented`);
	}
}

module.exports = SubscriberBaseRepository;
