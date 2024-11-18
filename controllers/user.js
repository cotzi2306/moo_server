//import { getUser, getFincasUser, addUser } from "../models/mysql/database.js";
import { validateUser, validatePartialUser } from "../schemas/users.js";
import bcrypt from "bcrypt";

export class usersController {
    constructor ({userModel}) {
        this.userModel = userModel
    }
    getUser = async (req, res) => {
        const {id} = req.params
        try {
            const user = await this.userModel.getUser({id});
            res.status(200).send(user);    
        } catch (error) {
            res.status(500).json({message: 'Error al consultar perfil', err: error})
        }
    }

    getProfile = async (req, res) => {
        const {id} = req.user;
        const token = req.cookies;
        //console.log(token);
        try {
            const profile = await this.userModel.getUser({id});
            res.status(200).send(profile);
        } catch (error) {
            res.status(500).json({message: 'Error al consultar perfil'})
        }
        
    }

    getFincasUser = async (req, res) => {
        const {id} = req.user
        try {
            const fincas = await this.userModel.getFincasUser({id});
            res.status(200).send(fincas);
        } catch (error) {
            res.status(500).json({message: "Error al consultar fincas o fincas no existentes"});
        }
        
    }

    //addUser = async (req, res) =>{
    //    const result = validateUser (req.body)
//
    //    if (result.error){
    //        return res.status(400).json({error: JSON.parse(result.error.message)})
    //    }
//
    //    result.data.contrasena = await bcrypt.hash(result.data.contrasena, 10)
//
    //    const newUser = await this.userModel.addUser({user: result.data});
    //    res.status(201).json({ newUser, message: 'Usuario registrado exitosamente' });
    //}

    //completeProfile = async (req, res) =>{
    //    const {id} = req.user;
    //    console.log(req.body);
    //    const result = validatePartialUser (req.body)
//
    //    if (result.error){
    //        return res.status(400).json({error: JSON.parse(result.error.message)})
    //    }
//
    //    //result.data.contrasena = await bcrypt.hash(result.data.contrasena, 10)
    //    
    //    const updatedUser = await this.userModel.completeUser({id, user: result.data});
    //    res.status(200).json({ message: 'Perfil completado' });
    //}

    updateProfile = async (req, res) => {
        const {id} = req.user;
        try {
            const updatedProfile = await this.userModel.updateUser({id: id, data: req.body});
            res.status(201).json({message: 'Perfil actualizado exitosamente'});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Error al actualizar perfil'});
        }
        
    }
}