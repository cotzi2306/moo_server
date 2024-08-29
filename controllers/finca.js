//import { getFinca, getBovinosFinca, addFinca, updateFinca } from "../models/mysql/database.js";
import { validateFinca, validatePartialFinca } from "../schemas/fincas.js";

export class fincasController {
constructor ({fincaModel}){
    this.fincaModel = fincaModel
}

     getFinca = async (req, res) => {
        const {id} = req.params
        const finca = await this.fincaModel.getFinca({id});
        res.status(200).send(finca);
    }

     getBovinosFinca = async (req, res) => {

        const {id} = req.params;
        const {filter, order} = req.query
    
        if (order !== 'ASC' && order !== 'DESC' && order) {
            return res.status(400).json({ error: 'Invalid order parameter' });
          }
        // todo: si el filtro no incluye un campo válido
        // if (filter includes  )
        const cows = await this.fincaModel.getBovinosFinca({id, filter, order});
        
        res.status(200).send(cows);
    }

     addFinca = async (req, res) => {
        const result = validateFinca(req.body)

        if (result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        const newFinca = await this.fincaModel.addFinca({finca: result.data});
        res.status(201).json({ newFinca , message: 'Finca agregada exitosamente' });
    
        //res.status(200).send(result);
    }

     updateFinca = async (req, res) => {
        const result = validatePartialFinca(req.body);

        if (result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        const {id} = req.params
        const updatedFinca = await this.fincaModel.updateFinca({id: id, finca: result.data})
        res.status(201).json({updatedFinca, message: 'Finca editada exitosamente'});
    }

}