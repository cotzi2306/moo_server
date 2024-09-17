import jwt from 'jsonwebtoken';

export default function authenticateToken (req, res, next) {
    const token = req.cookies['access_token']; // Obtener el token de la cookie

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user; // Guardar la información del usuario en el request
        console.log(user);
        next();
    });
};