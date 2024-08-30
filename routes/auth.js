import { Router } from "express";
import { authController } from "../controllers/auth.js";



export const createAuthRouter = ({userModel}) => {
    const authRouter = Router()

    const AuthController = new authController ({userModel})

    authRouter.post("/login", AuthController.login);

    //authRouter.post("/signup", AuthController.signup)

    return authRouter
}