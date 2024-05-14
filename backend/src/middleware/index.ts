import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const verifyUser = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    req.user = user;
    next();
  })(req, res, next);
