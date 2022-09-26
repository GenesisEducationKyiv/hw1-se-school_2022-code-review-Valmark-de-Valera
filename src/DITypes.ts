const DIServices = {
	CacheService: Symbol.for('CacheService'),
	SubscribersService: Symbol.for('SubscribersService'),
	FinanceService: Symbol.for('FinanceService'),
	EmailService: Symbol.for('EmailService'),
	FinanceProviderFabric: Symbol.for('FinanceProviderFabric'),
	RatePresenterFabric: Symbol.for('RatePresenterFabric'),
};
const DIRepositories = {
	SubscribersRepository: Symbol.for('SubscribersRepository'),
};
const DIPresenter = {
	RatePresenter: Symbol.for('RatePresenter'),
	NumberPresenter: Symbol.for('NumberPresenter'),
	XmlPresenter: Symbol.for('XmlPresenter'),
};

export { DIServices, DIRepositories, DIPresenter };
