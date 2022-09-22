import ICacheService from './interfaces/interface.cache-service';
import NodeCache from 'node-cache';
import 'dotenv/config';
import { injectable } from 'inversify';

@injectable()
class NodeCacheService implements ICacheService {
	private cacheProvider: NodeCache = new NodeCache({
		stdTTL: parseInt(process.env.CACHE_EXPIRE_SECONDS || '300'),
	});

	get(key: string): string | undefined {
		return this.cacheProvider.get(key);
	}

	set(key: string, value: string): void {
		this.cacheProvider.set(key, value);
	}

	del(key: string): void {
		this.cacheProvider.del(key);
	}

	flushAll(): void {
		this.cacheProvider.flushAll();
	}
}

export default NodeCacheService;
