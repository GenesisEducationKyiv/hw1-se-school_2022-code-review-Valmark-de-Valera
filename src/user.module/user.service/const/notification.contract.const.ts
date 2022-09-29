export interface NotificationSubscriberContract {
	email: string;
}

export interface NotificationRateContract {
	rate: number;
	countOfEmails?: number;
}

export interface ErrorContract {
	message: string;
}

export const NotificationContractPatterns = {
	addSubscriber: 'add-subscriber',
	removeSubscriber: 'remove-subscriber',
	sendRate: 'send-rate',
};
