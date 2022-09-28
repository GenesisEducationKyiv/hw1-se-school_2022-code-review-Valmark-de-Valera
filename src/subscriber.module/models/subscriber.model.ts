import { isEmail, IsEmail } from 'class-validator';

export class SubscriberHttpModel {
	@IsEmail()
	public email: string;
}

export class Subscriber {
	private email: string;

	constructor(email: string) {
		if (!isEmail(email)) email = '';
		this.email = email;
	}

	public setEmail(email: string) {
		if (!isEmail(email)) return false;
		this.email = email;
		return true;
	}

	public getEmail(): string {
		return this.email;
	}
}
