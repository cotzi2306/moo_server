import { connection } from '../../config/database.js';

export class userModel {

    static async getByEmail({user}) {
        try {
            const {email} = user;
            const sql = `SELECT nombre, id FROM usuarios WHERE email = ?;` 
            const [row] = await connection.query(sql, [email]);
            return row[0];
        } catch (error){
            console.error('Error executing queries:', error);
            throw error;
        }
    }

    static async getUser({id}) {
        try {
            // Consulta para obtener la información del usuario
            
            const [user] = await connection.query(
                `SELECT nombre, email, numero_telefonico, no_identificacion, ubicacion, rol
                 FROM usuarios WHERE id = ?;`, [id]
            );
            
            return user[0]  // Devolver solo el primer registro (suponiendo ID es único)

        } catch (error) {
            console.error('Error executing queries:', error);
            throw error;
        }
    }

    static async getFincasUser({id}) {
        try {
            const [rows] = await connection.query(
                `SELECT f.* FROM fincas f
                JOIN usuario_finca uf ON f.id = uf.finca_id
                WHERE uf.usuario_id = ?; `,[id]
            )
            return rows; //devuelve las fincas asociadas a un usuario
        }
        catch (error){
            console.error('Error executing queries:', error);
            throw error;
        }
        
    }

    static async updateUser({ id, data }) {
        const uid  = id; // Separamos el ID del resto de los campos a actualizar
        const {  ...updates } = data; 
        // Verificamos que haya al menos un campo para actualizar
        if (Object.keys(updates).length === 0) {
            throw new Error('No hay campos para actualizar');
        }
    
        // Construimos la consulta SQL
        const setClause = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const sql = `UPDATE usuarios SET ${setClause} WHERE id = ?;`;
    
        try {
            console.log(uid);
            const values = [...Object.values(updates), uid]; // Los valores de los campos a actualizar + el ID
            console.log(values);
            const [result] = await connection.query(sql, values);
    
            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('No se encontró el usuario con ese ID');
            }
            return result; // Devuelve el resultado si lo necesitas
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    }

    //No necesario, dado que si actualizo el perfil lo puedo completar
    //static async completeUser({id, user}){
    //    try{
    //        const {no_identificacion, ubicacion, rol } = user;
    //
    //        const sql = `UPDATE usuarios SET no_identificacion = ?, ubicacion = ?, rol = ? WHERE id = ?`
    //        const result = await connection.query(sql, [no_identificacion, ubicacion, rol, id]);
    //
    //        return result;
    //    }catch (error){
    //        console.error('Error al completar perfil:', error);
    //        throw error;
    //    }
    //}

    static async setProfilePic({id, url}){
        try {
            const sql = `UPDATE usuarios SET foto_url = ? WHERE email = ?;`
            const result = await connection.query(sql, [url, id]);
            return result;
        } catch (error) {
            console.error('Error al actualizar foto:', error);
            throw error;
        }
    }

    static async completeVeterinary({vet}){
        try {
            const {usuario_id, especialidad, numero_cedula, asignacion} = vet;
            const sql = `INSERT INTO veterinarios (usuario_id, especialidad, numero_cedula, asignacion) 
            VALUES (?, ?, ?, ?);`
            const result = await connection.query(sql, [usuario_id, especialidad, numero_cedula, asignacion]);
            return result;
        } catch (error) {
            console.error('Error al completar perfil:', error);
            throw error;
        }
    }

    
}