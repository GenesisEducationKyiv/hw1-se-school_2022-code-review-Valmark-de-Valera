import fs from 'fs';
import ISubscriberRepository from './interfaces/interface.subscriber.repository';
import logFab from '../../services/logger';
import 'dotenv/config';
import Subscriber from '../../models/subscriber/subscriber.model';
import { injectable } from 'inversify';
const log = logFab('FileSubscriberRepository');
let fileName = 'data/subscribers.json';

interface FileSubscriberModel {
	email: string;
}

@injectable()
class FileSubscriberRepository implements ISubscriberRepository {
	private readonly _databaseFile = require('../../../' + fileName);
	private readonly _subscribers = this._databaseFile.subscribers;

	public constructor(customFileName: string | undefined = undefined) {
		if (customFileName) {
			fileName = customFileName;
			this._databaseFile = require('../../../' + customFileName);
			this._subscribers = this._databaseFile.subscribers;
		}
	}

	public append(subscriber: Subscriber): boolean {
		if (this.isEmailExist(subscriber?.getEmail())) return false;
		this._subscribers.push(subscriber);
		this.save();
		return true;
	}

	public remove(subscriber: Subscriber): boolean {
		if (!this.isEmailExist(subscriber?.getEmail())) return false;
		const index = this._subscribers.indexOf(subscriber);
		this._subscribers.splice(index, 1);
		this.save();
		return true;
	}

	public isEmailExist(email: string): boolean {
		return this._subscribers.some((item: FileSubscriberModel) => item.email === email);
	}

	public getByEmail(email: string): Subscriber | undefined {
		const subscriber = this._subscribers.find((item: FileSubscriberModel) => {
			return item.email === email;
		});
		if (!subscriber) return undefined;
		return new Subscriber(subscriber.email);
	}

	public getAll(): Subscriber[] {
		const subscribersInstances: Subscriber[] = [];
		this._subscribers.forEach((subscriber: FileSubscriberModel) => {
			subscribersInstances.push(new Subscriber(subscriber.email));
		});
		return subscribersInstances;
	}

	public save() {
		const dbFile = this._databaseFile;
		dbFile.subscribers = this._subscribers;
		fs.writeFile(fileName, JSON.stringify(dbFile, null, 2), function writeJSON(err) {
			if (err) return log.error(err);
			log.info(`Writing to ${fileName}: ${JSON.stringify(dbFile)}`);
		});
	}
}

export default FileSubscriberRepository;
