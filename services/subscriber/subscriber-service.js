const SubscribersRepository = require('../../repository/subscriber/subscriber-file.repository');
const Subscriber = require('../../models/subscriber.model');

class SubscribersService {
	subscribersRepository = new SubscribersRepository();

	subscribe(email) {
		return this.subscribersRepository.append(new Subscriber(email));
	}

	unsubscribe(email) {
		let subscriber = this.subscribersRepository.getByEmail(email);
		return this.subscribersRepository.remove(subscriber);
	}

	getAllSubscribers() {
		return this.subscribersRepository.getAll();
	}

	isSubscribed(email) {
		return this.subscribersRepository.isEmailExist(email);
	}
}

module.exports = SubscribersService;
