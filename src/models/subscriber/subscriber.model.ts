import { validateEmail } from '../../services/utils';

class Subscriber {
	private email: string;

	constructor(email: string) {
		if (!validateEmail(email)) email = '';
		this.email = email;
	}

	public setEmail(email: string) {
		if (!validateEmail(email)) return false;
		this.email = email;
		return true;
	}

	public getEmail(): string {
		return this.email;
	}
}

export default Subscriber;
