//import { addBovino, getBovino, updateBovino } from "../models/mysql/database.js";
//import { bovinoModel } from "../models/mysql/mootest.js"; //Agregar bovinoModel antes del metodo del modelo que se va a usar
import { validateBovino, validatePartialBovino } from "../schemas/bovinos.js";

export class bovinosController {
    constructor ({ bovinoModel }){
        this.bovinoModel = bovinoModel
    }

    getBovinobyId = async (req, res) => {
        const { id } = req.params
        const cow = await this.bovinoModel.getBovino({ id} );
        res.status(200).send(cow);
    }

    addBovino = async (req, res) =>{
        const result = validateBovino(req.body)
    
        if (result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const newBovino = await this.bovinoModel.addBovino({bovino: result.data});
        res.status(201).json({ newBovino , message: 'Bovino agregado exitosamente' });
    }

    updateBovino = async (req, res) => {
        const result = validatePartialBovino(req.body)
    
        if (result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const {id} = req.params
        const updatedBovino = await this.bovinoModel.updateBovino( {id: id, bovino: result.data})
        res.status(201).json({ updatedBovino , message: 'Bovino editado exitosamente' });
    }
}

