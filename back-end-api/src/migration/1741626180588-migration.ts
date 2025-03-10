import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741626180588 implements MigrationInterface {
  name = 'Migration1741626180588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "url" character varying NOT NULL, "type" character varying NOT NULL, "scraper_id" uuid NOT NULL, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "scraper" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "scraper" DROP COLUMN "image_urls"`);
    await queryRunner.query(`ALTER TABLE "scraper" DROP COLUMN "video_urls"`);
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_ab47d1bdeb8697bfd3811bc5859" FOREIGN KEY ("scraper_id") REFERENCES "scraper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_ab47d1bdeb8697bfd3811bc5859"`,
    );
    await queryRunner.query(`ALTER TABLE "scraper" ADD "video_urls" jsonb`);
    await queryRunner.query(`ALTER TABLE "scraper" ADD "image_urls" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "scraper" ADD "title" character varying`,
    );
    await queryRunner.query(`DROP TABLE "media"`);
  }
}
