import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "cashier" | "tablet";
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Unauthorized.", 401);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError("Invalid token.", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
      role: "cashier" | "tablet";
    };

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch {
    next(new AppError("Unauthorized.", 401));
  }
};