import { Router } from "express";
//import { vetsController } from "../controllers/vets.js";
//import { authController } from "../controllers/auth.js";
import authenticateToken from "../middlewares/authMiddleware.js";

export const createVetsRouter = ({vetModel}) => {
    const vetsRouter = Router()
    

    const VetsController = new VetsController ({vetModel})

    vetsRouter.post("/", VetsController.addVet);

    vetsRouter.get("/foto_cedula", authenticateToken, VetsController.uploadDocument);

    vetsRouter.get("/invitations", authenticateToken, VetsController.getInvitations);

    vetsRouter.put("/invitations/:id", authenticateToken, VetsController.respondInvitation);

    vetsRouter.put("/info", authenticateToken, VetsController.updateVetProfile); //completar o actualizar perfil

    return vetsRouter
}