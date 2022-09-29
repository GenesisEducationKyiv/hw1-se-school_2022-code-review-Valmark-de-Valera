export interface SubscriberContract {
	email: string;
}

export interface RateContract {
	rate: number;
	countOfEmails?: number;
}

export interface ErrorContract {
	message: string;
}

export const ContractPatterns = {
	addSubscriber: 'add-subscriber',
	removeSubscriber: 'remove-subscriber',
	sendRate: 'send-rate',
};
