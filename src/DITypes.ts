const DIServices = {
	CacheService: Symbol.for('CacheService'),
	SubscribersService: Symbol.for('SubscribersService'),
	FinanceService: Symbol.for('FinanceService'),
	EmailService: Symbol.for('EmailService'),
	FinanceProviderFabric: Symbol.for('FinanceProviderFabric'),
};
const DIRepositories = {
	SubscribersRepository: Symbol.for('SubscribersRepository'),
};

export { DIServices, DIRepositories };
