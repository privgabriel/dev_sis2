import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import routers from "./app/routes";
import ErrorMiddleware from "./app/middlewares/ErrorMiddleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

app.use(ErrorMiddleware);

AppDataSource.initialize().then(async () => {
  console.log("Database started");
  app.listen(process.env.PORT || 3333, () => {
    console.log("Server started on port 3333!");
  });
});