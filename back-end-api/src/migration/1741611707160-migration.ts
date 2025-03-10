import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741611707160 implements MigrationInterface {
    name = 'Migration1741611707160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logger" ADD "res" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logger" DROP COLUMN "res"`);
    }

}
