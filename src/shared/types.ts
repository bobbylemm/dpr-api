import { Request, Response, NextFunction } from "express";

export type MyContext = {
  req: Request;
  res: Response;
  next: NextFunction
};