import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableUserSurveyResponse1743809304420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS inside;
    `)

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS inside.users_surveys_responses_aux (
        id SERIAL PRIMARY KEY,
        origin TEXT,
        response_status_id INT
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS inside.users_surveys_responses_aux;
    `)
  }
}
