/* eslint-disable no-unused-vars */
import { User } from '../../../models/user.model';

export interface IUserRepository {
	append(user: User): boolean;

	remove(user: User): boolean;

	isEmailExist(email: string): boolean;

	getByEmail(email: string): User | undefined;

	getAll(): User[];

	save(): void;

	setDatabaseFile(fileName: string): boolean;
}
