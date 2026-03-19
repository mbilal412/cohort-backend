import { Router } from "express";
import { register, login, getMe, verifyEmail, logout } from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js"
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post('/verify-email', verifyEmail)
authRouter.post("/login", loginValidator, login);
authRouter.post("/logout", logout);
authRouter.get("/get-me", authUser, getMe);

export default authRouter; 