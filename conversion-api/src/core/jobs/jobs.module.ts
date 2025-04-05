import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { RefreshMaterializedViewJob } from './refresh-materialized-view.job'

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [RefreshMaterializedViewJob],
  exports: [RefreshMaterializedViewJob],
})
export class JobsModule {}
