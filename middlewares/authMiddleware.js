//Midelware para validar la sesión con las cookies
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authenticateToken (req, res, next) {
    const token = req.cookies['access_token']; // Obtener el token de la cookie
    //console.log(token)
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user; // Guardar la información del usuario en el request
        //console.log(user);
        next();
    });
};