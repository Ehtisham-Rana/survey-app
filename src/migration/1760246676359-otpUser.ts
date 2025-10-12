import { MigrationInterface, QueryRunner } from "typeorm";

export class OtpUser1760246676359 implements MigrationInterface {
    name = 'OtpUser1760246676359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "otpCode" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "optValidity" TIMESTAMP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "optValidity"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "otpCode"
        `);
    }

}
