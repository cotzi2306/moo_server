import { connection } from '../../config/database.js';

export class fincaModel {
    static async getFinca({id}) {
        const [row] = await connection.query(
            `SELECT * FROM fincas WHERE id = ?`, [id]
        )
        return row[0];
    }

    static async getBovinosFinca({id, filter, order}) {
        let [rows] = '';
        // si existe filtro y orden
        if (filter && order ){
            [rows] = await connection.query(
                `SELECT * FROM bovinos WHERE finca_id = ?  ORDER BY ?? ${order}`, [id, filter]
            )
        }
        //se consultan sin filtros
        else{
            [rows] = await connection.query(
                `SELECT * FROM bovinos WHERE finca_id = ?`, [id]
            )
        }
        return rows;
    }

    static async  addFinca({usuario, finca}) {
        const { nombre, pais, estado_departamento} = finca;
        const user = usuario;
    
        const sql = `INSERT INTO fincas (nombre, pais, estado_departamento) VALUES (?, ?, ?)`;
        const [result] = await connection.query(sql, [nombre, pais, estado_departamento]); //se registra la finca
        const [uf] = await connection.query(`INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (?, ?);`, [user.id, result.insertId]) //se crea el la relación con el usuario que la agregó
        return result.insertId;
    }
    
    static async  updateFinca({id, finca}){
        const fincaId = id;
        const updates = finca;

        const updateFields = Object.keys(updates) //se extraen los campos a modificar en un arreglo
        .map(key => `${key} = ?`)
        .join(', ');
    
        const sql = `UPDATE fincas SET ${updateFields} WHERE id = ?`;
    
        const values = [...Object.values(updates), fincaId];
    
        const [result] = await connection.query(sql,values);
    
        return this.getFinca({id})
    }

    static async deleteFinca({id}){
        const fincaId = id;

        const sql = 'DELETE FROM fincas WHERE id = ?'
        const [result] = await connection.query(sql, [fincaId]);

        return result;
    }
}
