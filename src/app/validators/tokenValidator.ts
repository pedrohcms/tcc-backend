import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Middleware responsible for validating JWT
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
export function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const [_, token] = authorization.split("Bearer ");

  try {
    req.body.user_id = verifyToken(token);

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}
