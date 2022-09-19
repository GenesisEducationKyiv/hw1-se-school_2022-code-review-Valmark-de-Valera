import fs from 'fs';
import ISubscriberRepository from './interfaces/interface.subscriber.repository';
import logFab from '../../services/logger';
import 'dotenv/config';
import Subscriber from '../../models/subscriber/subscriber.model';
const log = logFab('FileSubscriberRepository');
let fileName = 'data/subscribers.json';

interface FileSubscriberModel {
	email: string;
}

class FileSubscriberRepository implements ISubscriberRepository {
	private readonly databaseFile = require('../../../' + fileName);
	private readonly subscribers = this.databaseFile.subscribers;

	public constructor(customFileName: string | undefined = undefined) {
		if (customFileName) {
			fileName = customFileName;
			this.databaseFile = require('../../../' + customFileName);
			this.subscribers = this.databaseFile.subscribers;
		}
	}

	public append(subscriber: Subscriber): boolean {
		if (this.isEmailExist(subscriber?.getEmail())) return false;
		this.subscribers.push(subscriber);
		this.save();
		return true;
	}

	public remove(subscriber: Subscriber): boolean {
		if (!this.isEmailExist(subscriber?.getEmail())) return false;
		const index = this.subscribers.indexOf(subscriber);
		this.subscribers.splice(index, 1);
		this.save();
		return true;
	}

	public isEmailExist(email: string): boolean {
		return this.subscribers.some((item: FileSubscriberModel) => item.email === email);
	}

	public getByEmail(email: string): Subscriber | undefined {
		const subscriber = this.subscribers.find((item: FileSubscriberModel) => {
			return item.email === email;
		});
		if (!subscriber) return undefined;
		return new Subscriber(subscriber.email);
	}

	public getAll(): Subscriber[] {
		const subscribersInstances: Subscriber[] = [];
		this.subscribers.forEach((subscriber: FileSubscriberModel) => {
			subscribersInstances.push(new Subscriber(subscriber.email));
		});
		return subscribersInstances;
	}

	public save() {
		const dbFile = this.databaseFile;
		dbFile.subscribers = this.subscribers;
		fs.writeFile(fileName, JSON.stringify(dbFile, null, 2), function writeJSON(err) {
			if (err) return log.error(err);
			log.info(`Writing to ${fileName}: ${JSON.stringify(dbFile)}`);
		});
	}
}

export default FileSubscriberRepository;
