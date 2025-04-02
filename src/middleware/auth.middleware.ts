import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import UserModel, { User } from "../models/user.model.js";

export interface CustomRequest extends Request {
  user?: User;
  token?: string;
}

interface DecodedToken {
  _id: string;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Authentication failed. Token missing" });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;
    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "Authentication failed. User not found." });
      return;
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ message: "Authentication failed.", error: err });
  }
};

export default auth;
