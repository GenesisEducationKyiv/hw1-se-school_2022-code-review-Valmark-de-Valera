import RateErrorModel from './rate-error.model';

class RateErrorMessage extends Error {
	public message: string;
	public code: number;

	constructor(error: RateErrorModel) {
		super(error.message);
		this.message = error.message || 'No description provided';
		this.code = error.code || 500;
	}
}

export default RateErrorMessage;
