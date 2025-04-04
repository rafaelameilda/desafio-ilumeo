import { Global, Module } from '@nestjs/common';

import { ProvidersModule } from './providers/providers.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Global()
@Module({
  imports: [ProvidersModule, RepositoriesModule],
  exports: [ProvidersModule, RepositoriesModule],
})
export class CoreModule {}
