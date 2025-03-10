import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741614248184 implements MigrationInterface {
  name = 'Migration1741614248184';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scraper" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "url" character varying NOT NULL, "title" character varying, "image_urls" jsonb, "video_urls" jsonb, "status" character varying NOT NULL DEFAULT 'pending', CONSTRAINT "PK_29dd98b0cceac88740b4e4a3970" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "scraper"`);
  }
}
