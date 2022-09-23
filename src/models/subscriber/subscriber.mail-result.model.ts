class SubscriberMailResultResponse {
	public email: string;
	public result: boolean;

	constructor(email: string, result: boolean) {
		this.email = email;
		this.result = result;
	}
}

export default SubscriberMailResultResponse;
