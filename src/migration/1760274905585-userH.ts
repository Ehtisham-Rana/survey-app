import { MigrationInterface, QueryRunner } from "typeorm";

export class UserH1760274905585 implements MigrationInterface {
    name = 'UserH1760274905585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "firstName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "lastName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "resetToken" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "resetTokenExpiry" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "resetTokenExpiry"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "resetToken"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "lastName" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "firstName" character varying NOT NULL
        `);
    }

}
