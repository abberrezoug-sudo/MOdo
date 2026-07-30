import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";

type UserRole = "cashier" | "tablet";

export const checkRole =
  (...roles: UserRole[]) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(new AppError("Unauthorized.", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden.", 403));
    }

    next();
  };