import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMaterializedViewConversationByChannel1743809381238
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE MATERIALIZED VIEW inside.mv_conversion_by_channel AS
            SELECT
              origin,
              DATE(created_at) AS response_date,
              COUNT(*) AS total_responses,
              COUNT(CASE WHEN response_status_id = 1 THEN 1 END) AS total_converted
            FROM
              inside.users_surveys_responses_aux
            GROUP BY
              origin,
              DATE(created_at);
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP MATERIALIZED VIEW IF EXISTS inside.mv_conversion_by_channel;
          `)
  }
}
