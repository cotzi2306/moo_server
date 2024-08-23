import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();

export async function getUser(id) {
    try {
        // Consulta para obtener las fincas asociadas al usuario
       //const [fincas] = await pool.query(
       //    `SELECT f.*
       //     FROM finca f
       //     JOIN usuario_finca uf ON f.id = uf.finca_id
       //     WHERE uf.usuario_id = ?;`, [id]
       //);

        // Consulta para obtener la información del usuario
        const [user] = await pool.query(
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

export async function getBovino(id) {
    const [row] = await pool.query(
        `SELECT * FROM Bovinos WHERE id = ?`, [id]
    )
    return row[0];
}

export async function getBovinosFinca(id, filtervalue, order) {
    let [rows] = '';
    if (filtervalue && order ){
        [rows] = await pool.query(
            `SELECT * FROM Bovinos WHERE finca_id = ?  ORDER BY ?? ${order}`, [id, filtervalue]
        )
    }
    else{
        [rows] = await pool.query(
            `SELECT * FROM Bovinos WHERE finca_id = ?`, [id]
        )
    }
    
    return rows;
}

export async function getFinca(id) {
    const [row] = await pool.query(
        `SELECT * FROM finca WHERE id = ?`, [id]
    )
    return row[0];
}

export async function getFincasUser(uid) {
    const [rows] = await pool.query(
        `SELECT f.*
        FROM finca f
        JOIN usuario_finca uf ON f.id = uf.finca_id
        WHERE uf.usuario_id = ?; `,[uid]
    )
    return rows;
}

export async function addBovino(bovino) {
    const { finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive} = bovino;

    const sql = ` 
        INSERT INTO Bovinos (finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [ finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive]);

    return result.insertId;
}

export async function updateBovino(id, bovino) {
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

    const [result] = await pool.query(sql,values);

    return getBovino(id);

}

