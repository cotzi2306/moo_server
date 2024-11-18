// Controlador de autenticación
import { validateUser, validatePartialUser } from "../schemas/users.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class authController {
    constructor({ userModel }) {
        this.userModel = userModel;
    }

    login = async (req, res) => {
        try {
            const { email, contrasena } = req.body;
            const result = validatePartialUser({ email, contrasena });

            if (result.error) {
                return res.status(401).send("Datos invalidos");
            }

            const usuario = await this.userModel.getCredentials({ user: result.data });
            if (!usuario) {
                return res.status(401).json({ message: "No existe el usuario" });
            }

            const authorized = bcrypt.compareSync(result.data.contrasena, usuario.contrasena);
            if (!authorized) {
                return res.status(401).json({ message: "No autorizado" });
            }

            const token = jwt.sign({ 
                id: usuario.id, 
                nombre: usuario.nombre, 
                rol: usuario.rol, 
                fincas: usuario.fincas 
            }, "secretkey", { expiresIn: '1h' });
            
            // Enviar el token en la respuesta
            return res.status(200).json({
                message: 'Autorizado',
                token: token, // Enviar el token aquí
                //usuario: usuario // Puedes enviar el usuario también si lo deseas
            });

        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno del servidor");
        }
    }

    logout = (req, res) => {
        // Simplemente retornar un mensaje de logout
        return res.status(200).json({ message: "Logout exitoso" });
    }
}
