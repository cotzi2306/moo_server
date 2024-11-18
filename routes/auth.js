import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";



export const createAuthRouter = ({authModel}) => {
    const authRouter = Router()

    const AuthController = new authController ({authModel})

    authRouter.post("/login", AuthController.login);

    authRouter.post("/logout", AuthController.logout);

    authRouter.post("/signup", AuthController.signup);

    authRouter.post("/reset-password", AuthController.resetPassword);

    authRouter.post("/reset-password/:token", AuthController.setNewPassword);

    return authRouter
}