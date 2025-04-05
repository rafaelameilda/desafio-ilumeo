import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

const TEN_MINUTES_IN_SECONDS = 10 * 60

interface CacheSetOptions {
  ttl?: number
}

@Injectable()
export class CacheStorageProvider {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set<T>(key: string, value: T, options?: CacheSetOptions): Promise<void> {
    const ttl = options?.ttl ?? TEN_MINUTES_IN_SECONDS
    const serialized = JSON.stringify(value)
    await this.cacheManager.set(key, serialized, { ttl } as any)
  }

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.cacheManager.get<string>(key)
    if (!cached) return null

    try {
      return JSON.parse(cached)
    } catch {
      return null
    }
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key)
  }
}
