import { Secret } from "jsonwebtoken";
import type { StringValue } from "ms";
export const PORT = process.env.PORT || 3000;
export const ENV = process.env.ENV || "development";
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
export const JWT_SECRET: Secret = process.env.JWT_SECRET || "secret";
export const JWT_LIFETIME = (process.env.JWT_LIFETIME || "1d") as StringValue;
