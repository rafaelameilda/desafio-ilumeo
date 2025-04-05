import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { DataSource } from 'typeorm'

@Injectable()
export class RefreshMaterializedViewJob {
  private readonly logger = new Logger(RefreshMaterializedViewJob.name)
  constructor(private readonly dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    try {
      await this.dataSource.manager.query(
        `REFRESH MATERIALIZED VIEW inside.mv_conversion_by_channel`,
      )

      this.logger.log('✅ Materialized view refreshed with success.')
    } catch (error) {
      console.error('Error for refresh MaterializedView:', error)
    }
  }
}
