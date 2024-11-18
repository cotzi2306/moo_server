//Controlador de autenticación
import { validateUser, validatePartialUser } from "../schemas/users.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import { userModel } from "../models/mysql/user.model.js";
dotenv.config();

export class authController {
    constructor({ authModel }) {
        this.authModel = authModel
    }

    signup = async (req, res) => {
        try {
            const { nombre, email, contrasena, numero_telefonico } = req.body;
            const result = validatePartialUser({nombre, email, contrasena, numero_telefonico});

            if (result.error) {
                return res.status(401).send("Datos invalidos");
            }

            result.data.contrasena = await bcrypt.hash(result.data.contrasena, 10)

            const newUser = await this.authModel.addUser({user: result.data});
            res.status(201).json({ newUser, message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno del servidor");
        }
    }

    resetPassword = async (req, res) => { //Solo debe haber un usuario asociado a un correo electronico
        try {
            const {email} = req.body
            const result = validatePartialUser({email});

            if (result.error) {
                return res.status(401).send("Datos invalidos, ingrese un email valido");
            }

            const user = await userModel.getByEmail({user: result.data });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const resetToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            console.log(user.id);
            const resetLink = `http://localhost:8080/auth/reset-password/${resetToken}`;
            
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: 'Restablece tu contraseña',
              html: `<p>Moo app <br> Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${resetLink}">Reestablecer contraseña</a></p>`
            };
            res.status(200).json({mailOptions});
            
            // transporter.sendMail(mailOptions, (err, info) => { // instalar nodemailer
            //   if (err) {
            //     console.log(err);
            //     return res.status(500).json({ message: 'Error al enviar el correo' });
            //   }
            //   return res.status(200).json({ message: 'Correo enviado con éxito' });
            // });
            
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno del servidor");
        }
        
    }

    setNewPassword = async (req, res)=> {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Verificar el token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
          }

          const user = userModel.getUser({id: decoded.userId });
          if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }

          // Encriptar la nueva contraseña y actualizarla en la "base de datos"
          bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ message: 'Error al encriptar la contraseña' });
          }
          console.log({id: decoded.userId, data: req.body});
          const passwordUpdated =  userModel.updateUser({id: decoded.userId, data: {contrasena: hashedPassword}})
          if (!passwordUpdated){
            return res.status(500).json({message: "Error al actualizar contraseña"})
          }

          return res.status(200).json({ message: 'Contraseña actualizada exitosamente', p: passwordUpdated });
          });
        });
    }

    login = async (req, res) => {
        try {
            const { email, contrasena } = req.body;
            const result = validatePartialUser({ email, contrasena });
    
            if (result.error) {
                return res.status(401).send("Datos invalidos");
            }
    
            const usuario = await this.authModel.getCredentials({ user: result.data });
            if (!usuario) {
                return res.status(401).json({ message: "El usuario no existe" });
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
            }, process.env.SECRET_KEY, { expiresIn: '1h' });
            
            return res.cookie('access_token', token, {
                 httpOnly: true, 
                 path: '/',
                 //sameSite: 'None',
             }).status(200).send({
                 message: 'Autorizado',
                 //token: token, 
                 //usuario: usuario
             });
    
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno del servidor");
        }
    }

    logout = (req, res) => {
        res.clearCookie('access_token').json({message: "logout succesfull"})
    }


}