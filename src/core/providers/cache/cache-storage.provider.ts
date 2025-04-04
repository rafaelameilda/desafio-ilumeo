import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

const TEN_MINUTES_IN_SECONDS = 10 * 60;

interface CacheSetOptions {
  ttl?: number;
}

@Injectable()
export class CacheStorageProvider {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, value: string, options?: CacheSetOptions) {
    const ttl = options?.ttl ?? TEN_MINUTES_IN_SECONDS;
    return await this.cacheManager.set(key, value, { ttl } as any);
  }

  async get<T>(key: string): Promise<T | any> {
    return await this.cacheManager.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
