import { RateErrorModel } from './rate-error.model';

export class RateErrorMessage extends Error {
	public code: number;
	public message: string;

	constructor(error: RateErrorModel) {
		super(error.message);
		this.message = error.message || 'No description provided';
		this.code = error.code || 500;
	}
}
