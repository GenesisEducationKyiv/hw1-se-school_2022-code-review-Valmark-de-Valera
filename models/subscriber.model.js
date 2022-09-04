const fs = require('fs');
let fileName = 'data/subscribers.json';
let databaseFile = require('../' + fileName);
let subscribers = databaseFile.emails;

class Subscriber {
	email = undefined;

	constructor(email, customFileName) {
		this.email = email;
		if (customFileName) {
			fileName = customFileName;
			databaseFile = require('../' + customFileName);
			subscribers = databaseFile.emails;
		}
	}

	append() {
		if (subscribers.includes(this.email)) return false;
		subscribers.push(this.email);
		Subscriber.updateDb();
		return true;
	}

	remove() {
		if (!subscribers.includes(this.email)) return false;
		const index = subscribers.indexOf(this.email);
		subscribers.splice(index, 1);
		Subscriber.updateDb();
		return true;
	}

	static includes(email) {
		return subscribers.includes(email);
	}

	static getAll() {
		return subscribers;
	}

	static updateDb() {
		databaseFile.emails = subscribers;
		fs.writeFile(fileName, JSON.stringify(databaseFile, null, 2), function writeJSON(err) {
			if (err) return console.log(err);
			console.log(JSON.stringify(databaseFile, null, 2));
			console.log('Writing to ' + fileName);
		});
	}
}

module.exports = Subscriber;
