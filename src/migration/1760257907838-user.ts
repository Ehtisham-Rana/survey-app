import { MigrationInterface, QueryRunner } from "typeorm";

export class User1760257907838 implements MigrationInterface {
    name = 'User1760257907838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otpCode"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "otpCode" integer`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "optValidity" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "optValidity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otpCode"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "otpCode" character varying NOT NULL`);
    }

}
