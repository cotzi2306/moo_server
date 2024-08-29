//import { getUser, getFincasUser, addUser } from "../models/mysql/database.js";
import { validateUser, validatePartialUser } from "../schemas/users.js";

export class usersController {
    constructor ({userModel}) {
        this.userModel = userModel
    }
    getUser = async (req, res) => {
        const {id} = req.params
        const user = await this.userModel.getUser({id});
        res.status(200).send(user);
    }

    getFincasUser = async (req, res) => {
        const {id} = req.params
        const fincas = await this.userModel.getFincasUser({id});
        res.status(200).send(fincas);
    }

    addUser = async (req, res) =>{
        const result = validateUser (req.body)

        if (result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        const newUser = await this.userModel.addUser ({user: result.data});
        res.status(201).json({ newUser , message: 'Usuario registrado exitosamente' });
    }
}