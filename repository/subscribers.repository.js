const fs = require('fs');
let fileName = 'data/subscribers.json';
let databaseFile = require('../' + fileName);
let subscribers = databaseFile.users;

class SubscribersRepository {
	constructor(customFileName = undefined) {
		if (customFileName) {
			fileName = customFileName;
			databaseFile = require('../' + customFileName);
			subscribers = databaseFile.users;
		}
	}

	append(subscriber) {
		if (this.includesEmail(subscriber?.email)) return false;
		subscribers.push(subscriber);
		this.updateDb();
		return true;
	}

	remove(subscriber) {
		if (!this.includesEmail(subscriber?.email)) return false;
		const index = subscribers.indexOf(subscriber);
		subscribers.splice(index, 1);
		this.updateDb();
		return true;
	}

	includesEmail(email) {
		return subscribers.some((item) => item.email === email);
	}

	findEmail(email) {
		return subscribers.find((item) => {
			return item.email === email;
		});
	}

	getAll() {
		return subscribers;
	}

	updateDb() {
		databaseFile.users = subscribers;
		fs.writeFile(fileName, JSON.stringify(databaseFile, null, 2), function writeJSON(err) {
			if (err) return console.log(err);
			console.log(JSON.stringify(databaseFile, null, 2));
			console.log('Writing to ' + fileName);
		});
	}
}

module.exports = SubscribersRepository;
