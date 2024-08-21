import { Router } from "express";
import UserRouter from "../controllers/UserController";

const routers = Router();

routers.use("/users", UserRouter);

export default routers;