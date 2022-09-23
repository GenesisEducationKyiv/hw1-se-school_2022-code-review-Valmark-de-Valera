class RateErrorMessage extends Error {
	public message: string;
	public code: string;

	constructor(message: string, code: string) {
		super(message);
		this.message = message || 'No description provided';
		this.code = code || '500';
	}
}

export default RateErrorMessage;
