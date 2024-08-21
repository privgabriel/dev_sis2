import { NextFunction, Request, Response } from "express";
import ErrorExtension from "../utils/ErrorExtension";

const httpErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = err as ErrorExtension;
  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;