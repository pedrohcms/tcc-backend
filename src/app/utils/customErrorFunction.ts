import { Request, Response, NextFunction } from "express";
import { isCelebrate, CelebrateInternalError } from "celebrate";

/**
 * Overrides the celebrate error function
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
export function errors(
  err: CelebrateInternalError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isCelebrate(err)) {
    return res.status(400).json({
      error: err.joi.message,
    });
  }

  return next(err);
}
