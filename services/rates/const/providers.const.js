const providersNamesDict = {
	binance: 'Binance',
	coinbase: 'Coinbase',
	kuna: 'Kuna',
	nomics: 'Nomics',
	test: 'Test',
};

const providersKeysDict = {
	binance: 'binance-pk',
	coinbase: 'coinbase-pk',
	kuna: 'kuna-pk',
	nomics: 'nomics-pk',
	test: 'test-pk',
};

module.exports = {
	providersNamesDict: Object.freeze(providersNamesDict),
	providersKeysDict: Object.freeze(providersKeysDict),
};
