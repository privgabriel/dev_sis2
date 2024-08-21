import { Request, Response, NextFunction } from "express";
import Token from "../utils/Auth";

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || "";
  const tokenGenerator = new Token();
  await tokenGenerator.authenticateToken(token);

  next();
};

export default authenticateMiddleware;