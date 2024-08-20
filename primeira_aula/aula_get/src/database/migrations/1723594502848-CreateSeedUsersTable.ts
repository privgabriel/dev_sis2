import { MigrationInterface, QueryRunner } from "typeorm";
import userSeed from "../seeders/user.seeds";
import { AppDataSource } from "./data-source";
import User from "../../app/entities/Users";


export class CreateSeedUsersTable1723594502848
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = AppDataSource.getRepository(User);
    await usersRepository.save(userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}