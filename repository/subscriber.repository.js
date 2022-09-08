const fs = require('fs');
let fileName = 'data/subscribers.json';
let databaseFile = require('../' + fileName);
const Subscriber = require('../models/subscriber.model');
let subscribers = databaseFile.emails;

class SubscriberRepository {
	constructor(customFileName = undefined) {
		if (customFileName) {
			fileName = customFileName;
			databaseFile = require('../' + customFileName);
			subscribers = databaseFile.emails;
		}
	}

	append(subscriber) {
		if (subscribers.includes(subscriber.getEmail())) return false;
		subscribers.push(subscriber.getEmail());
		this.updateDb();
		return true;
	}

	remove(subscriber) {
		if (!subscribers.includes(subscriber.getEmail())) return false;
		const index = subscribers.indexOf(subscriber.getEmail());
		subscribers.splice(index, 1);
		this.updateDb();
		return true;
	}

	includes(email) {
		return subscribers.includes(email);
	}

	getAll() {
		let subscribersArray = [];
		subscribers.map((item) => subscribersArray.push(new Subscriber(item)));
		return subscribersArray;
	}

	updateDb() {
		databaseFile.emails = subscribers;
		fs.writeFile(fileName, JSON.stringify(databaseFile, null, 2), function writeJSON(err) {
			if (err) return console.log(err);
			console.log(JSON.stringify(databaseFile, null, 2));
			console.log('Writing to ' + fileName);
		});
	}
}

module.exports = SubscriberRepository;
