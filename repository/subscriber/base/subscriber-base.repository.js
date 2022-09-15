class SubscriberBaseRepository {
	append(subscriber) {
		throw new Error(`append(${subscriber}) is not implemented`);
	}

	remove(subscriber) {
		throw new Error(`remove(${subscriber}) is not implemented`);
	}

	isEmailExist(email) {
		throw new Error(`isEmailExist(${email}) is not implemented`);
	}

	getByEmail(email) {
		throw new Error(`getByEmail(${email}) is not implemented`);
	}

	getAll() {
		throw new Error('getAll() is not implemented');
	}

	save() {
		throw new Error('save() is not implemented');
	}
}

module.exports = SubscriberBaseRepository;
