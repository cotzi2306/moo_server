//import { getFinca, getBovinosFinca, addFinca, updateFinca } from "../models/mysql/database.js";
import { validateFinca, validatePartialFinca } from "../schemas/fincas.js";
import jwt from 'jsonwebtoken';

export class fincasController {
constructor ({fincaModel}){
    this.fincaModel = fincaModel
}

    getFinca = async (req, res) => {
        const { id } = req.params;
        const { user } = req; // Obtén el usuario del token

        // Verifica si la finca solicitada está en las fincas permitidas del usuario
        if (!user.fincas.includes(parseInt(id))) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        try {
            // Obtén la finca desde la base de datos
            const finca = await this.fincaModel.getFinca({ id });

            // Verifica si se encontró la finca
            if (!finca) {
                return res.status(404).json({ message: 'Finca no encontrada' });
            }

            // Envía la información de la finca
            res.status(200).send(finca);
        } catch (error) {
            // Manejo de errores
            console.error('Error al obtener la finca:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };


     getBovinosFinca = async (req, res) => {

        const {id} = req.params;
        const { user } = req;
        const {filter, order} = req.query;

        if (!user.fincas.includes(parseInt(id))) {
            return res.status(401).json({ message: 'No autorizado' });
        }
    
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
        const { user } = req;

        if (result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const newFinca = await this.fincaModel.addFinca({usuario: user, finca: result.data});

        const oldToken = req.cookies['access_token'];
        const decodedToken = jwt.verify(oldToken, 'secretkey');
        
        // Añadir la nueva finca a la lista de fincas del usuario
        const updatedFincas = [...decodedToken.fincas, newFinca];

        // Crear el nuevo token
        const newToken = jwt.sign({
            id: decodedToken.id,
            nombre: decodedToken.nombre,
            rol: decodedToken.rol,
            fincas: updatedFincas
        }, "secretkey", {expiresIn: '1h'});

        // Enviar el nuevo token al cliente
        res.cookie('access_token', newToken, { httpOnly: true });
        res.status(201).json({ message: 'Finca agregada y token actualizado', newFinca });
    
        //res.status(200).send(result);
    }

     updateFinca = async (req, res) => {
        const result = validatePartialFinca(req.body);
        const { user } = req;
        const {id} = req.params

        if (result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        if (!user.fincas.includes(parseInt(id))) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        const updatedFinca = await this.fincaModel.updateFinca({id: id, finca: result.data})
        res.status(201).json({updatedFinca, message: 'Finca editada exitosamente'});
    }

    deleteFinca = async (req, res) => {
        const {id} = req.params;
        const { user } = req;

        if (!user.fincas.includes(parseInt(id))) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        const deletedFinca = await this.fincaModel.deleteFinca({id: id})
        res.status(201).json({deletedFinca: deletedFinca, message: 'Finca eliminada exitosamente'});
    }

}