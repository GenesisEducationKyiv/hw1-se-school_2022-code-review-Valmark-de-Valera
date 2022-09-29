export const UserErrorsDict = {
	INVALID_EMAIL_VALIDATION: {
		code: 400,
		message: 'Пошта не є вірною, перевірте введенні дані',
	},
	EMAIL_ALREADY_EXIST: {
		code: 409,
		message: 'Вже є в базі',
	},
	EMAIL_ALREADY_DELETED: {
		code: 404,
		message: 'Пошта вже видалена з бази даних',
	},
	EMAIL_SEND_ERROR: {
		code: 400,
		message: 'Помилка виконання запиту до API провайдеру',
	},
	NO_SUBSCRIBER: {
		code: 204,
		message: 'Підписники відсутні',
	},
};
