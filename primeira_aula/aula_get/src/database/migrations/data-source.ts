import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1723592020543 } from "./1723592020543-CreateUsersTable"
import { CreateSeedUsersTable1723594502848 } from "./1723594502848-CreateSeedUsersTable";
import User from "../../app/entities/Users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "projeto_typeorm",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [CreateUsersTable1723592020543,
    CreateSeedUsersTable1723594502848],
  subscribers: [],
});

