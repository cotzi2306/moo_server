import { connection } from '../../config/database.js';

export class authModel{
    static async addUser({user}) {
        try {
            const {nombre, email, numero_telefonico, contrasena } = user;
    
            const sql = `INSERT INTO usuarios (nombre, email, numero_telefonico, contrasena) VALUES (?, ?, ?, ?)`
            const [result] = await connection.query(sql, [nombre, email, numero_telefonico, contrasena]);
    
            return result.insertId;
        } catch (error){
            console.error('Error al agregar usuario:', error);
            throw error;
        }
    }

    static async getCredentials({user}){
        const {email} = user;
        try {
            const sql = `SELECT id, nombre, contrasena, rol FROM usuarios WHERE email = ?;`
            const [usuario] = await connection.query(sql, [email]);
            if (usuario[0]) { //si existe el usuario se consultan sus fincas
                const [fincasResult] = await connection.query(
                    `SELECT finca_id from usuario_finca WHERE usuario_id = ?;`, [usuario[0].id]
                );
                const fincas = fincasResult.map(row => row.finca_id);
                usuario[0].fincas = fincas; //se añaden las fincas como propiedad en forma de arreglo
                console.log(usuario[0])
            }   
            return usuario[0];
        }
        catch (error){
            console.error('Error executing queries:', error);
            throw error;
        }
        
    }
}