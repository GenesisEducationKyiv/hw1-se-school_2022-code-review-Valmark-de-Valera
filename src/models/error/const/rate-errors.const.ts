export const rateErrorsDict = {
	INVALID_RATE_VALUE: {
		code: 400,
		message: 'Invalid rate value provided',
	},
	WRONG_PROVIDER_NAME: {
		code: 404,
		message: 'Wrong name provided',
	},
	WRONG_PROVIDER_RESPONSE: {
		code: 500,
		message: 'Wrong answer from provider',
	},
	WRONG_PROVIDER_API_PARSE: {
		code: 500,
		message: 'Invalid value or response from request. Possible API was changed',
	},
};
