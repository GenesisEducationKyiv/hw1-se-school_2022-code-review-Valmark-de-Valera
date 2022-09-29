export const subscribeDoc = {
	ApiOperation: {
		summary: 'Підписати емейл на отримання поточного курсу',
		description:
			'Запит має перевірити, чи немає данної електронної адреси в поточній базі даних (файловій) і, в разі її відсутності, записувати її. Пізніше, за допомогою іншого запиту ми будемо відправляти лист на ті електронні адреси, які будуть в цій базі. ',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'E-mail додано',
		},
		{ status: 409, description: 'Повертати, якщо e-mail вже є в базі даних (файловій)' },
		{ status: 400, description: "(Необов'язковий) Невдала валідація пошти" },
	],
	ApiConsumes: ['application/x-www-form-urlencoded'],
	ApiBody: [
		{
			schema: {
				type: 'object',
				properties: {
					email: {
						description: 'Електронна адреса, яку потрібно підписати',
						type: 'string',
						required: ['true'],
					},
				},
			},
		},
	],
};

export const unsubscribeDoc = {
	ApiOperation: {
		summary: 'Відписатися від отримання поточного курсу',
		description: 'Запит має видалити пошту зі списку для отримання курсу.',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'E-mail видалено',
		},
		{ status: 409, description: 'Пошта вже видалена з бази даних' },
		{ status: 400, description: "(Необов'язковий) Невдала валідація пошти" },
	],
	ApiConsumes: ['application/x-www-form-urlencoded'],
	ApiBody: [
		{
			schema: {
				type: 'object',
				properties: {
					email: {
						description: 'Електронна адреса, яку потрібно відписати',
						type: 'string',
						required: ['true'],
					},
				},
			},
		},
	],
};

export const sendEmailsDoc = {
	ApiOperation: {
		summary: 'Відправити e-mail з поточним курсом на всі підписані електронні пошти.',
		description:
			'Запит має отримувати актуальний курс BTC до UAH за допомогою third-party сервісу та відправляти його на всі електронні адреси, які були підписані раніше.  ',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'E-mailʼи відправлено',
		},
		{ status: 204, description: "(Необов'язковий) В базі відсутня пошта" },
	],
};

export const isSubscriberExistDoc = {
	ApiOperation: {
		summary: 'Перевірити підписку',
		description: 'Запит має перевірити чи пошта є в списку для отримання курсу.',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'Користувач існує',
		},
		{ status: 404, description: 'Користувача не існує' },
	],
	ApiConsumes: ['application/x-www-form-urlencoded'],
	ApiBody: [
		{
			schema: {
				type: 'object',
				properties: {
					email: {
						description: 'Електронна адреса, яку потрібно відписати',
						type: 'string',
						required: ['true'],
					},
				},
			},
		},
	],
};

export const subscribersDoc = {
	ApiOperation: {
		summary: 'Список підписаних на отримання поточного курсу',
		description: 'Запит має повернути масив з поштами, що є підписаними на отримання курсу.',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'Список електроних пошт',
		},
	],
};
