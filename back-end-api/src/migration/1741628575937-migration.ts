import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741628575937 implements MigrationInterface {
  name = 'Migration1741628575937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scraper" ADD CONSTRAINT "UQ_837459a9e8166bee54449901b23" UNIQUE ("url")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scraper" DROP CONSTRAINT "UQ_837459a9e8166bee54449901b23"`,
    );
  }
}
