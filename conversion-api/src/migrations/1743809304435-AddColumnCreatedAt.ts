import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddColumnCreatedAt1743809304435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE inside.users_surveys_responses_aux
      ADD COLUMN created_at TIMESTAMP;
    `)

    await queryRunner.query(`
      UPDATE inside.users_surveys_responses_aux
      SET created_at = NOW() - (TRUNC(random() * 365) || ' days')::INTERVAL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE inside.users_surveys_responses_aux
      DROP COLUMN created_at;
    `)
  }
}
