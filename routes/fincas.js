import { Router } from "express";
import { fincasController } from "../controllers/finca.js";


export const createFincasRouter = ({fincaModel}) => {
    const fincasRouter = Router()

    const FincasController = new fincasController ({fincaModel})

    fincasRouter.get("/:id", FincasController.getFinca);

    fincasRouter.patch("/:id", FincasController.updateFinca)

    fincasRouter.get("/:id/bovinos", FincasController.getBovinosFinca);

    fincasRouter.post("/", FincasController.addFinca);

    return fincasRouter
}

