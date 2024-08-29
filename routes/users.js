import { Router } from "express";
import { usersController } from "../controllers/user.js";


export const createUsersRouter = ({userModel}) => {
    const usersRouter = Router()

    const UsersController = new usersController ({userModel})

    usersRouter.get('/:id', UsersController.getUser);

    usersRouter.get("/:id/fincas", UsersController.getFincasUser);

    usersRouter.post("/", UsersController.addUser)

    return usersRouter
}

