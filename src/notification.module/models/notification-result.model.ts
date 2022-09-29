export interface MailResultResponse {
	email: string;
	info: {
		type: string;
		result: boolean;
	};
}
