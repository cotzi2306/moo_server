import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Conexión a la base de datos
const connectionString = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const db = mysql.createConnection(connectionString);

// Función para actualizar el estado reproductivo de un bovino
const updateReproductiveStatus = async (bovinoId, nuevoEstado) => {
    try {
        const query = `
            UPDATE Bovinos
            SET estado_reproductivo = ?
            WHERE id = ?
        `;
        const [results] = await db.execute(query, [nuevoEstado, bovinoId]);
        return results.affectedRows > 0; // Retorna verdadero si se actualizó
    } catch (error) {
        console.error('Error al actualizar el estado reproductivo:', error);
        throw error;
    }
};

// Función para gestionar el estado reproductivo
const manageReproductiveStates = async () => {
    // Aquí puedes definir las condiciones y estados

    const query = `SELECT * FROM Bovinos WHERE estado_reproductivo = 'Celo'`;
    try {
        const [bovinosEnCelo] = await db.execute(query);
        for (const bovino of bovinosEnCelo) {
            // Lógica para determinar el estado a actualizar
            if (bovino /* condición para embarazo */) {
                await updateReproductiveStatus(bovino.id, 'Embarazada');
            } else if (bovino /* condición para lactancia */) {
                await updateReproductiveStatus(bovino.id, 'Lactando');
            } else if (bovino /* condición para parto */) {
                await updateReproductiveStatus(bovino.id, 'Por dar a luz');
            }
        }
    } catch (error) {
        console.error('Error al gestionar estados reproductivos:', error);
    }
};

// Exporta la función necesaria
export { manageReproductiveStates };

const scheduleDailyReproductiveChecks = () => {
    const horaChequeo = '05:00:00'; // Hora deseada para el chequeo

    setInterval(() => {
        const now = moment();
        const currentTime = now.format('HH:mm:ss');

        if (currentTime === horaChequeo) {
            manageReproductiveStates();
        }
    }, 60000); // Revisa cada minuto
};

// Llama a la función para iniciar el chequeo diario (se llama en el  archivo principal)
scheduleDailyReproductiveChecks();

