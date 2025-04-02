import { Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { CustomRequest } from "../middleware/auth.middleware.js";

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("Name, Email and Password are required");
    return;
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }
    const newUser = new UserModel({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }
  try {
    const user = await UserModel.findByCredentials(email, password);
    if (user) {
      const token = await user.generateAuthToken();
      res.json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
}

export async function logoutAll(
  req: CustomRequest,
  res: Response,
): Promise<void> {
  if (req.user) {
    req.user.tokens = [];
    await req.user.save();
  }
  res.status(200).json({
    message: "User logged out from all devices successfully.",
  });
}

export async function logout(req: CustomRequest, res: Response): Promise<void> {
  if (req.user && req.token) {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await req.user.save();
  }
  res.status(200).json({
    message: "User logged out successfully.",
  });
}
