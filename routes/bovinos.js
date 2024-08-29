import { Router } from "express";
import { bovinosController } from "../controllers/bovinos.js";


export const createBovinosRouter = ({bovinoModel}) => {
    const bovinosRouter = Router()

    const BovinosController = new bovinosController ({bovinoModel})

    bovinosRouter.get('/:id', BovinosController.getBovinobyId);

    bovinosRouter.post('/',  BovinosController.addBovino);

    bovinosRouter.patch('/:id', BovinosController.updateBovino);

    return bovinosRouter
}
