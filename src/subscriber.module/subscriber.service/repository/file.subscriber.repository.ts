import * as fs from 'fs';
import ISubscriberRepository from './interfaces/interface.subscriber.repository';
import { Subscriber } from '../../models/subscriber.model';
import { Injectable, Logger } from '@nestjs/common';

interface FileSubscriberModel {
	email: string;
}

@Injectable()
export class FileSubscriberRepository implements ISubscriberRepository {
	private readonly logger = new Logger(FileSubscriberRepository.name);
	private _fileName: string;
	private _databaseFile: any;
	private _subscribers: any;

	constructor() {
		this.setDatabaseFile('data/subscribers.json');
	}

	public setDatabaseFile(fileName: string) {
		this._fileName = fileName;
		try {
			this._databaseFile = require('../../../../' + this._fileName);
			this._subscribers = this._databaseFile.subscribers;
		} catch (e) {
			this.logger.error(
				`Database file did not set to ${this._fileName}. Reason is ${e.message}`,
			);
			return false;
		}
		this.logger.log(`Database file set to ${this._fileName}`);
		return true;
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
		const logger = this.logger;
		const fileName = this._fileName;
		const dbFile = this._databaseFile;
		dbFile.subscribers = this._subscribers;
		fs.writeFile(fileName, JSON.stringify(dbFile, null, 2), function writeJSON(err) {
			if (err) return logger.error(err);
			logger.log(`Writing to ${fileName}: ${JSON.stringify(dbFile)}`);
		});
	}
}
