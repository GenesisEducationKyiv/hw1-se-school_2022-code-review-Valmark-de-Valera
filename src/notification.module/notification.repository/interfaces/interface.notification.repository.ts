/* eslint-disable no-unused-vars */

export interface INotificationRepository {
	append(email: string): boolean;

	remove(email: string): boolean;

	isEmailExist(email: string): boolean;

	getAll(): string[];

	save(): void;

	setDatabaseFile(fileName: string): boolean;
}
