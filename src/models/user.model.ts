import { Schema, model, Document, HydratedDocument, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_LIFETIME } from "../config.js";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
}

export interface UserDocument extends User, Document {
  generateAuthToken(): Promise<string>;
}

export interface UserModel extends Model<UserDocument> {
  findByCredentials: (
    email: string,
    password: string,
  ) => Promise<HydratedDocument<UserDocument>>;
}

const emailValidator = {
  validator: (email: string): boolean => {
    return !!email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  },
  message: "Please provide a valid email.",
};

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please provide a  name"],
    minlength: 3,
    maxlength: 56,
  },
  email: {
    type: String,
    validate: emailValidator,
    required: [true, "Please provide an email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

export default model<UserDocument, UserModel>("User", userSchema);
