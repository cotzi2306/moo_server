import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
} 

const connection =  await mysql.createConnection(connectionString)

export class bovinoModel {
    static async getBovino ({id}) {
        const [row] = await connection.query(
            `SELECT * FROM Bovinos WHERE id = ?`, [id]
        )
        return row[0];
    }

    static async addBovino({bovino}) {
        const { finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive} = bovino;
    
        const sql = ` 
            INSERT INTO Bovinos (finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        const [result] = await connection.query(sql, [ finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive]);
    
        return result.insertId; //devuelve el id del bovino creado
    }

    static async updateBovino({id, bovino}) {
        const bovinoId = id;
        const updates = bovino;
    
        // Construir la parte SET de la consulta SQL
        const updateFields = Object.keys(updates)
        .map(key => `${key} = ?`)
        .join(', ');
    
        // Construir la consulta SQL
        const sql = `UPDATE Bovinos SET ${updateFields} WHERE id = ?`;
    
        // Valores para los placeholders
        const values = [...Object.values(updates), bovinoId];
    
        const [result] = await connection.query(sql,values);
    
        return getBovino({id}); //se consulta el bovino despues de actualizarlo
    
    }
}

export class fincaModel {
    static async getFinca({id}) {
        const [row] = await connection.query(
            `SELECT * FROM finca WHERE id = ?`, [id]
        )
        return row[0];
    }

    static async getBovinosFinca({id, filter, order}) {
        let [rows] = '';
        if (filter && order ){
            [rows] = await connection.query(
                `SELECT * FROM Bovinos WHERE finca_id = ?  ORDER BY ?? ${order}`, [id, filter]
            )
        }
        else{
            [rows] = await connection.query(
                `SELECT * FROM Bovinos WHERE finca_id = ?`, [id]
            )
        }
        
        return rows;
    }

    static async  addFinca({finca}) {
        const { nombre, pais, estado_departamento} = finca;
    
        const sql = `INSERT INTO finca (nombre, pais, estado_departamento) VALUES (?, ?, ?)`;
        const [result] = await connection.query(sql, [nombre, pais, estado_departamento]);
    
        return result.insertId;
    }
    
    static async  updateFinca({id, finca}){
        const fincaId = id;
        const updates = finca;
    
        const updateFields = Object.keys(updates)
        .map(key => `${key} = ?`)
        .join(', ');
    
        const sql = `UPDATE finca SET ${updateFields} WHERE id = ?`;
    
        const values = [...Object.values(updates), fincaId];
    
        const [result] = await connection.query(sql,values);
    
        return getFinca({id})
    }
}

export class userModel {

    static async getByEmail({user}) {
        const {email, contrasena} = user;
        
        const sql = `SELECT nombre, id FROM usuarios WHERE email = ?;`
        const [row] = await connection.query(sql, [email]);
    
        return row
    }
    static async getUser({id}) {
        try {
            
            // Consulta para obtener las fincas asociadas al usuario
           //const [fincas] = await connection.query(
           //    `SELECT f.*
           //     FROM finca f
           //     JOIN usuario_finca uf ON f.id = uf.finca_id
           //     WHERE uf.usuario_id = ?;`, [id]
           //);
    
            // Consulta para obtener la información del usuario
            const [user] = await connection.query(
                `SELECT nombre, email, numero_telefonico, no_identificacion, ubicacion, puesto
                 FROM usuarios
                 WHERE id = ?;`, [id]
            );
    
            // Retorna ambos resultados como un objeto
            return {
                user: user[0],  // Devolver solo el primer registro (suponiendo ID es único)
                //fincas         // Devolver todas las fincas asociadas
            };
        } catch (error) {
            console.error('Error executing queries:', error);
            throw error;
        }
    }

    static async getFincasUser({id}) {
        const [rows] = await connection.query(
            `SELECT f.*
            FROM finca f
            JOIN usuario_finca uf ON f.id = uf.finca_id
            WHERE uf.usuario_id = ?; `,[id]
        )
        return rows;
    }

    static async addUser({user}) {
        const {nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto } = user;
    
        const sql = `INSERT INTO usuarios (nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const [result] = await connection.query(sql, [nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto]);
    
        return result.insertId;
    }
}