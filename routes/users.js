import { Router } from "express";
import { usersController } from "../controllers/user.js";
//import { authController } from "../controllers/auth.js";
import authenticateToken from "../middlewares/authMiddleware.js";

export const createUsersRouter = ({userModel}) => {
    const usersRouter = Router()
    

    const UsersController = new usersController ({userModel})
    //const AuthController = new authController({userModel})

    //usersRouter.get('/:id', UsersController.getUser);

    //usersRouter.get("/:id/fincas", UsersController.getFincasUser);

    usersRouter.post("/", UsersController.addUser);

    usersRouter.get("/profile", authenticateToken, UsersController.getProfile);

    usersRouter.get("/fincas", authenticateToken, UsersController.getFincasUser);

    return usersRouter
}

