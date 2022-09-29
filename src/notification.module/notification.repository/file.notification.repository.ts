import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { INotificationRepository } from './interfaces/interface.notification.repository';

@Injectable()
export class FileNotificationRepository implements INotificationRepository {
	private readonly logger = new Logger(FileNotificationRepository.name);
	private _fileName: string;
	private _databaseFile: any;
	private _subscribers: any;

	constructor() {
		this.setDatabaseFile('data/notification.db.json');
	}

	public setDatabaseFile(fileName: string) {
		this._fileName = fileName;
		try {
			this._databaseFile = require('../../../' + this._fileName);
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

	public append(email: string): boolean {
		if (this.isEmailExist(email)) return false;
		this._subscribers.push(email);
		this.save();
		return true;
	}

	public remove(email: string): boolean {
		if (!this.isEmailExist(email)) return false;
		const index = this._subscribers.indexOf(email);
		this._subscribers.splice(index, 1);
		this.save();
		return true;
	}

	public isEmailExist(email: string): boolean {
		return this._subscribers.includes(email);
	}

	public getAll(): string[] {
		return this._subscribers;
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
