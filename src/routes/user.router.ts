import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
