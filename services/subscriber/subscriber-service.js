const SubscribersRepository = require('../../repository/subscribers.repository');
const Subscriber = require('../../models/subscriber.model');

class SubscribersService {
	subscribersRepository = new SubscribersRepository();

	subscribe(email) {
		return this.subscribersRepository.append(new Subscriber(email));
	}

	unsubscribe(email) {
		let subscriber = this.subscribersRepository.findEmail(email);
		return this.subscribersRepository.remove(subscriber);
	}

	getAllSubscribers() {
		return this.subscribersRepository.getAll();
	}

	isSubscribed(email) {
		return this.subscribersRepository.includesEmail(email);
	}
}

module.exports = SubscribersService;
