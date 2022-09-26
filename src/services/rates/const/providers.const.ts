import BinanceProvider from '../providers/binance.provider';
import CoinbaseProvider from '../providers/coinbase.provider';
import KunaProvider from '../providers/kuna.provider';
import NomicsProvider from '../providers/nomics.provider';

export const providersNamesDict = {
	binance: 'Binance',
	coinbase: 'Coinbase',
	kuna: 'Kuna',
	nomics: 'Nomics',
	test: 'Test',
};

export const providersKeysDict = {
	binance: 'binance-pk',
	coinbase: 'coinbase-pk',
	kuna: 'kuna-pk',
	nomics: 'nomics-pk',
	test: 'test-pk',
};

export const providersClassesDict = {
	binance: BinanceProvider,
	coinbase: CoinbaseProvider,
	kuna: KunaProvider,
	nomics: NomicsProvider,
};
