import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
 //conexión a la base de datos mediante variables de entorno
const connectionString = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
} 
import moment from 'moment'; // Para formatear fechas
import nodemailer from 'nodemailer'; // Para enviar correos electrónicos

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos'
});

// Función para crear una nueva notificación
const createNotification = (titulo, mensaje, tipo, bovinoId, fincaId, usuarioId, metodoEnvio) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Notificaciones (titulo, mensaje, tipo, bovino_id, finca_id, usuario_id, metodo_envio)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [titulo, mensaje, tipo, bovinoId, fincaId, usuarioId, metodoEnvio], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId);
        });
    });
};

// Función para enviar la notificación
const sendNotification = (notificacion) => {
    // Aquí puedes implementar el envío por correo electrónico o cualquier otro método
    const { titulo, mensaje, metodoEnvio, usuarioId } = notificacion;

    // Ejemplo de envío por correo electrónico usando nodemailer
    if (metodoEnvio === 'Correo') {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tu_correo@gmail.com',
                pass: 'tu_contraseña' // Asegúrate de usar una contraseña de aplicación o credenciales seguras
            }
        });

        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: 'correo_del_usuario@example.com', // Obtén el correo del usuario de la base de datos
            subject: titulo,
            text: mensaje
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar correo:', error);
            } else {
                console.log('Correo enviado:', info.response);
            }
        });
    }

    // Otros métodos de envío (SMS, Push, etc.) se pueden implementar aquí
};

// Función para gestionar el envío diario de notificaciones
const scheduleDailyNotifications = () => {
    const horaNotificacion = '04:00:00'; // Configura la hora deseada

    setInterval(() => {
        const now = moment();
        const currentTime = now.format('HH:mm:ss');

        if (currentTime === horaNotificacion) {
            // Aquí podrías buscar bovinos que necesitan notificaciones
            const query = `
                SELECT * FROM Notificaciones
                WHERE estado = 'Pendiente'
            `;

            db.query(query, (error, results) => {
                if (error) {
                    console.error('Error al obtener notificaciones:', error);
                } else {
                    results.forEach((notificacion) => {
                        sendNotification(notificacion);
                        // Actualiza el estado de la notificación después de enviar
                        const updateQuery = `
                            UPDATE Notificaciones
                            SET estado = 'Enviada', fecha_envio = NOW()
                            WHERE id = ?
                        `;
                        db.query(updateQuery, [notificacion.id], (err) => {
                            if (err) console.error('Error al actualizar la notificación:', err);
                        });
                    });
                }
            });
        }
    }, 60000); // Revisa cada minuto
};

// Exporta las funciones necesarias
export {
    createNotification,
    sendNotification,
    scheduleDailyNotifications
};
