import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741670510558 implements MigrationInterface {
  name = 'Migration1741670510558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scraper" ADD "user_id" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "scraper" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "scraper" ADD CONSTRAINT "FK_235080e98abdbb74338fbaacdf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scraper" DROP CONSTRAINT "FK_235080e98abdbb74338fbaacdf4"`,
    );
    await queryRunner.query(`ALTER TABLE "scraper" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "scraper" DROP COLUMN "user_id"`);
  }
}
