import { Router } from "express";
import { fincasController } from "../controllers/finca.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { authorizeAction } from "../middlewares/authorizeMiddleware.js";


export const createFincasRouter = ({fincaModel}) => {
    const fincasRouter = Router()
    const FincasController = new fincasController ({fincaModel})

    fincasRouter.get("/:id", authenticateToken, FincasController.getFinca);
    fincasRouter.patch("/:id", authenticateToken, FincasController.updateFinca)
    fincasRouter.get("/:id/bovinos", authenticateToken,  FincasController.getBovinosFinca);
    fincasRouter.post("/", authenticateToken, FincasController.addFinca);
    fincasRouter.delete("/:id", authenticateToken, FincasController.deleteFinca);
    //fincasRouter.get("/:id/pajillas", authenticateToken, FincasController.getPajillas); //agregar metodo

    return fincasRouter
}

