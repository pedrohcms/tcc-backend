import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * MIDDLEWARE RESPONSIBLE FOR VALIDATING JWT
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
    verifyToken(token);

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}
