const fs = require('fs');
const log = require('../../services/logger')('SubscriberFileRepository');
const SubscribersBaseRepository = require('./base/subscriber-base.repository');
let fileName = 'data/subscribers.json';
let databaseFile = require('../../' + fileName);
let subscribers = databaseFile.users;

class SubscriberFileRepository extends SubscribersBaseRepository {
	constructor(customFileName = undefined) {
		super();
		if (customFileName) {
			fileName = customFileName;
			databaseFile = require('../../' + customFileName);
			subscribers = databaseFile.users;
		}
	}

	append(subscriber) {
		if (this.isEmailExist(subscriber?.email)) return false;
		subscribers.push(subscriber);
		this.save();
		return true;
	}

	remove(subscriber) {
		if (!this.isEmailExist(subscriber?.email)) return false;
		const index = subscribers.indexOf(subscriber);
		subscribers.splice(index, 1);
		this.save();
		return true;
	}

	isEmailExist(email) {
		return subscribers.some((item) => item.email === email);
	}

	getByEmail(email) {
		return subscribers.find((item) => {
			return item.email === email;
		});
	}

	getAll() {
		return subscribers;
	}

	save() {
		databaseFile.users = subscribers;
		fs.writeFile(fileName, JSON.stringify(databaseFile, null, 2), function writeJSON(err) {
			if (err) return log.error(err);
			log.info(`Writing to ${fileName}: ${JSON.stringify(databaseFile)}`);
		});
	}
}

module.exports = SubscriberFileRepository;
