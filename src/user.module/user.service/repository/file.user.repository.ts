import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { IUserRepository } from './interfaces/interface.user.repository';
import { User } from '../../models/user.model';

interface FileUserModel {
	email: string;
}

@Injectable()
export class FileUserRepository implements IUserRepository {
	private readonly logger = new Logger(FileUserRepository.name);
	private _fileName: string;
	private _databaseFile: any;
	private _users: any;

	constructor() {
		this.setDatabaseFile('data/user.db.json');
	}

	public setDatabaseFile(fileName: string) {
		this._fileName = fileName;
		try {
			this._databaseFile = require('../../../../' + this._fileName);
			this._users = this._databaseFile.users;
		} catch (e) {
			this.logger.error(
				`Database file did not set to ${this._fileName}. Reason is ${e.message}`,
			);
			return false;
		}
		this.logger.log(`Database file set to ${this._fileName}`);
		return true;
	}

	public append(user: User): boolean {
		if (this.isEmailExist(user?.getEmail())) return false;
		const userObj: FileUserModel = { email: user.getEmail() };
		this._users.push(userObj);
		this.save();
		return true;
	}

	public remove(user: User): boolean {
		if (!this.isEmailExist(user?.getEmail())) return false;
		const userObj: FileUserModel = { email: user.getEmail() };
		const index = this._users.indexOf(userObj);
		this._users.splice(index, 1);
		this.save();
		return true;
	}

	public isEmailExist(email: string): boolean {
		return this._users.some((item: FileUserModel) => item.email === email);
	}

	public getByEmail(email: string): User | undefined {
		const user = this._users.find((item: FileUserModel) => {
			return item.email === email;
		});
		if (!user) return undefined;
		return new User(user.email);
	}

	public getAll(): User[] {
		const userInstance: User[] = [];
		this._users.forEach((subscriber: FileUserModel) => {
			userInstance.push(new User(subscriber.email));
		});
		return userInstance;
	}

	public save() {
		const logger = this.logger;
		const fileName = this._fileName;
		const dbFile = this._databaseFile;
		dbFile.users = this._users;
		fs.writeFile(fileName, JSON.stringify(dbFile, null, 2), function writeJSON(err) {
			if (err) return logger.error(err);
			logger.log(`Writing to ${fileName}: ${JSON.stringify(dbFile)}`);
		});
	}
}
