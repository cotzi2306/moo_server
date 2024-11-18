import { connection } from '../../config/database.js';

export class bovinoModel {
    static async getBovino ({id}) {
        const [row] = await connection.query(
            `SELECT * FROM Bovinos WHERE id = ?`, [id]
        )
        return row[0];
    }

    static async addBovino({bovino}) {
        const { finca_id, numero, nombre, fecha_nacimiento, raza, id_padre, id_madre, procedencia, peso, sexo, estado, etapa_vida, proposito, estado_salud, fecha_ultimo_chequeo, foto, estado_reproductivo} = bovino;
    
        const sql = ` INSERT INTO Bovinos 
            (finca_id, numero, nombre, fecha_nacimiento, raza, id_padre, id_madre, procedencia, peso, sexo, estado, etapa_vida, proposito, estado_salud, fecha_ultimo_chequeo, foto, estado_reproductivo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await connection.query(sql, [ finca_id, numero, nombre, fecha_nacimiento, raza, id_padre, id_madre, procedencia, peso, sexo, estado, etapa_vida, proposito, estado_salud, fecha_ultimo_chequeo, foto, estado_reproductivo]);
    
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
    
        return this.getBovino({id: bovinoId}); //se consulta el bovino despues de actualizarlo
    }

    static async deleteBovino({id}){
        const bovinoId = id;
        const sql = `DELETE FROM bovinos WHERE id = ?`;

        const [result] = await connection.query(sql, bovinoId);

        return result;
    }
}

