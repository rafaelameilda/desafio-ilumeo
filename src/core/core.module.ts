import { Global, Module } from '@nestjs/common'

import { JobsModule } from './jobs/jobs.module'
import { ProvidersModule } from './providers/providers.module'
import { RepositoriesModule } from './repositories/repositories.module'

@Global()
@Module({
  imports: [ProvidersModule, RepositoriesModule, JobsModule],
  exports: [ProvidersModule, RepositoriesModule, JobsModule],
})
export class CoreModule {}
