export const rateBTC2UAH = {
	ApiOperation: {
		summary: 'Отримати поточний курс BTC до UAH',
		description:
			'Запит має повертати поточний курс BTC до UAH використовуючи будь-який third party сервіс з публічним АРІ',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'Повертається актуальний курс BTC до UAH.',
		},
		{ status: 400, description: 'Помилка виконання запиту' },
	],
};

export const changeProviderByName = {
	ApiOperation: {
		summary: 'Змінити постачальника даних курсу по імені провайдера.',
		description:
			'Запит має змінити постачальника(third-party сервіс) курсу валют та повідомити про успіх.',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'Провайдер успішно змінено',
		},
		{ status: 404, description: 'Провайдер не знайдено' },
	],
	ApiConsumes: ['application/x-www-form-urlencoded'],
	ApiBody: [
		{
			schema: {
				type: 'object',
				properties: {
					name: {
						description: "Ім'я провайдера (З великої літери)",
						type: 'string',
						required: ['true'],
						enum: ['Binance', 'Coinbase', 'Kuna', 'Nomics', 'Test', '[WrongToTest]'],
					},
				},
			},
		},
	],
};

export const changeProviderByKey = {
	ApiOperation: {
		summary: 'Змінити постачальника даних курсу по коду провайдера.',
		description:
			'Запит має змінити постачальника(third-party сервіс) курсу валют та повідомити про успіх.',
	},
	ApiResponses: [
		{
			status: 200,
			description: 'Провайдер успішно змінено',
		},
		{ status: 404, description: 'Провайдер не знайдено' },
	],
	ApiConsumes: ['application/x-www-form-urlencoded'],
	ApiBody: [
		{
			schema: {
				type: 'object',
				properties: {
					key: {
						description: 'Код провайдера',
						type: 'string',
						required: ['true'],
						enum: [
							'binance-pk',
							'coinbase-pk',
							'kuna-pk',
							'nomics-pk',
							'test-pk',
							'[WrongToTest]',
						],
					},
				},
			},
		},
	],
};
