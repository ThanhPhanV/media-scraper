import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741604335864 implements MigrationInterface {
  name = 'Migration1741604335864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6"`,
    );
  }
}
