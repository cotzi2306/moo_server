// Definición del mapa de permisos por rol
const rolePermissions = {
    admin: ['create', 'read', 'update', 'delete'],
    user: ['read'],
    // otros roles...
};

// Middleware para autorización
export const authorizeAction = ( fincaKey) => {
    return (req, res, next) => {
        const { user } = req;

        // Verificar finca
        if (fincaKey && !user.fincas.includes(parseInt(fincaKey))) {
            return res.status(401).json({ message: 'No autorizado a acceder a esta finca' });
        }

        // Verificar permiso
        //if (requiredPermission && !rolePermissions[user.rol].includes(requiredPermission)) {
        //    return res.status(403).json({ message: 'Acceso denegado: permiso no autorizado' });
        //}

        // Si todo es válido, proceder
        next();
    };
};
