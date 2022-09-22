/* eslint-disable no-unused-vars */
interface ICacheService {
	get(key: string): string | undefined;
	set(key: string, value: string): void;
	del(key: string): void;
	flushAll(): void;
}

export default ICacheService;
