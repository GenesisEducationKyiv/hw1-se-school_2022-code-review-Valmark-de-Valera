const fs = require('fs');
const fileName = 'data/subscribers.json';
const databaseFile = require('../' + fileName);

const subscribers = databaseFile.emails;

class Subscriber {
	email = undefined;

	constructor(email) {
		this.email = email;
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
		fs.writeFile(
			fileName,
			JSON.stringify(databaseFile, null, 2),
			function writeJSON(err) {
				if (err) return console.log(err);
				console.log(JSON.stringify(databaseFile, null, 2));
				console.log('Writing to ' + fileName);
			}
		);
	}
}

module.exports = Subscriber;
