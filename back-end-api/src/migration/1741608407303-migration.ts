import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741608407303 implements MigrationInterface {
  name = 'Migration1741608407303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "logger" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "url" character varying, "body" jsonb, "message" character varying, "status" integer, "method" character varying, CONSTRAINT "PK_46cad7e44f77ea2fa7da01e7828" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "logger"`);
  }
}
