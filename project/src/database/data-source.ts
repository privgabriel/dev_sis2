import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1724197561428 } from "./migrations/1724197561428-CreateUsersTable";
import { CreateSeedUsersTable1664154782764 } from "./migrations/1724197819524-CreateSeedUsersTable";
import User from "../app/entities/Users";

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
  migrations: [CreateUsersTable1724197561428, CreateSeedUsersTable1664154782764],
  subscribers: [],
});