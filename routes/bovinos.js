import { Router } from "express";
import { bovinosController } from "../controllers/bovinos.js";
import authenticateToken from "../middlewares/authMiddleware.js";


export const createBovinosRouter = ({bovinoModel}) => {
    const bovinosRouter = Router()

    const BovinosController = new bovinosController ({bovinoModel})

    bovinosRouter.get('/:id', authenticateToken, BovinosController.getBovinobyId);

    bovinosRouter.post('/',  authenticateToken, BovinosController.addBovino);

    bovinosRouter.patch('/:id', BovinosController.updateBovino);

    return bovinosRouter
}
