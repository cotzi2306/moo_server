import { Router } from "express";
//import { vetsController } from "../controllers/vets.js";
//import { authController } from "../controllers/auth.js";
import authenticateToken from "../middlewares/authMiddleware.js";

export const createPajillasRouter = ({pajillaModel}) => {
    const pajillasRouter = Router()
    

    const PajillasController = new PajillasController ({pajillaModel})

    pajillasRouter.post("/", PajillasController.addPajilla);

    pajillasRouter.get("/foto_cedula", authenticateToken, VetsController.uploadDocument);

    pajillasRouter.get("/invitations", authenticateToken, VetsController.getInvitations);

    pajillasRouter.put("/invitations/:id", authenticateToken, VetsController.respondInvitation);

    pajillasRouter.put("/info", authenticateToken, VetsController.updateVetProfile); //completar o actualizar perfil

    return pajillasRouter
}