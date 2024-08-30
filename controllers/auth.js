import { validateUser, validatePartialUser } from "../schemas/users.js";
//aquí se genera el token
import jwt from 'jsonwebtoken';


export class authController {
    constructor ({userModel}){
        this.userModel = userModel
    }

    login = async (req, res) => {
        const {email, contrasena} = req.body

        const result = validatePartialUser({email, contrasena})

        if (result.error) {return res.status(401).send("Datos invalidos")}

        const [authorized] = await this.userModel.getByEmail({user: result.data})

        const token = jwt.sign({nombre: authorized.nombre}, "secretkey", {expiresIn: '1h'})

        res.status(200).send(token);
    }
}