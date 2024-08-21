import { MigrationInterface, QueryRunner } from "typeorm";
import userSeed from "../seeders/user.seed";
import User from "../../app/entities/Users";
import { AppDataSource } from "../../database/data-source";

export class CreateSeedUsersTable1664154782764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = AppDataSource.getRepository(User);
    await usersRepository.save(userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}