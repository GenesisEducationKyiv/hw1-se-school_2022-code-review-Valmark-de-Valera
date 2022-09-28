/* eslint-disable no-unused-vars */

import { Subscriber } from '../../../models/subscriber.model';

interface ISubscriberRepository {
	append(subscriber: Subscriber): boolean;

	remove(subscriber: Subscriber): boolean;

	isEmailExist(email: string): boolean;

	getByEmail(email: string): Subscriber | undefined;

	getAll(): Subscriber[];

	save(): void;

	setDatabaseFile(fileName: string): boolean;
}

export default ISubscriberRepository;
