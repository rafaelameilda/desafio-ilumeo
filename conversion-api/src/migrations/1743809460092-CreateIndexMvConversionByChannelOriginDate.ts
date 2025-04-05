import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateIndexMvConversionByChannelOriginDate1743809460092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX idx_mv_conversion_by_channel_origin_date
            ON inside.mv_conversion_by_channel (origin, response_date);
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX IF EXISTS inside.idx_mv_conversion_by_channel_origin_date;
      `)
  }
}
