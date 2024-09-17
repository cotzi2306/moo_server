import cookieParser from "cookie-parser";
import { validateUser, validatePartialUser } from "../schemas/users.js";
//aquí se genera el token
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


export class authController {
    constructor({ userModel }) {
        this.userModel = userModel
    }

    login = async (req, res) => {
        try {
            const { email, contrasena } = req.body;
    
            const result = validatePartialUser({ email, contrasena });
    
            if (result.error) {
                return res.status(401).send("Datos invalidos");
            }
    
            const usuario = await this.userModel.getCredentials({ user: result.data });
            //console.log(usuario)
            if (!usuario) {
                return res.status(401).json({ message: "No existe el usuario" });
            }
    
            const authorized = bcrypt.compareSync(result.data.contrasena, usuario.contrasena);
            if (!authorized) {
                return res.status(401).json({ message: "No autorizado" });
            }
    
            // Código comentado
            const token = jwt.sign({ 
                id: usuario.id, 
                nombre: usuario.nombre, 
                rol: usuario.rol, 
                fincas: usuario.fincas 
            }, "secretkey", { expiresIn: '1h' });
            
            return res.cookie('access_token', token, {
                 httpOnly: true, path: '/'
             }).status(200).send({
                 message: 'Autorizado',
                 token: token, 
                 usuario: usuario
             });
    
            // Enviar respuesta final solo si no se ha enviado ninguna otra respuesta antes
            //return res.status(200).json({ message: "Autorizado" });
    
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno del servidor");
        }
    }

    //uthenticateToken = (req, res, next) => {
    //   const token = req.cookies['access_token']; // Obtener el token de la cookie
    //   if (!token) return res.status(401).json({ message: 'No token provided' });
    //   jwt.verify(token, 'secretkey', (err, user) => {
    //       if (err) return res.status(403).json({ message: 'Invalid token' });
    //       req.user = user; // Guardar la información del usuario en el request
    //       console.log(user);
    //       next();
    //   });
    //;

    logout = (req, res) => {
        res.clearCookie('access_token').json({message: "logout succesfull"})
    }
}