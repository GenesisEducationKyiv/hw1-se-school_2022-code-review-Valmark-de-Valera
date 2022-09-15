/* eslint-disable no-unused-vars */
const providersNamesDict = {
	binance: 'Binance',
	coinbase: 'Coinbase',
	test: 'Test',
};

const providersKeysDict = {
	binance: 'binance-pk',
	coinbase: 'coinbase-pk',
	test: 'test-pk',
};

module.exports = {
	providersNamesDict: Object.freeze(providersNamesDict),
	providersKeysDict: Object.freeze(providersKeysDict),
};
