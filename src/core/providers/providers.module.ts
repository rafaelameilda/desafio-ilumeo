import { Module } from '@nestjs/common';

import { CacheStorageModule } from './cache/cache-storage.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CacheStorageModule],
  exports: [DatabaseModule, CacheStorageModule],
})
export class ProvidersModule {}
