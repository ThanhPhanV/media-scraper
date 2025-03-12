import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741760144943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public."user"
        (id, "createdAt", "updatedAt", user_name, "password")
        VALUES(
            '30747dac-3169-4fc1-ba5d-40db2b9fea3b'::uuid,
            '2025-03-12 06:13:21.518',
            '2025-03-12 06:13:21.518',
            'admin',
            '$2b$10$zWsLTtLLzUBztLoHyaSsGedW64sN4K98ynRO.UnHoSx2anQesHs8C');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public."user" WHERE id = '30747dac-3169-4fc1-ba5d-40db2b9fea3b';`,
    );
  }
}
