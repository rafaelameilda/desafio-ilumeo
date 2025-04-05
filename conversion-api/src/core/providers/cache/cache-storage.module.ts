import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

import { CacheStorageProvider } from './cache-storage.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore as any,
      url: process.env.REDIS_URL,
    }),
  ],
  providers: [CacheStorageProvider],
  exports: [CacheStorageProvider],
})
export class CacheStorageModule {}
