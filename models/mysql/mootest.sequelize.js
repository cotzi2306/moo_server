import mysql from 'mysql2/promise';
import {Sequelize, DataTypes}from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
 //conexión a la base de datos mediante variables de entorno
 const sequelize = new Sequelize(
   process.env.MYSQL_DATABASE,
   process.env.MYSQL_USER,
   process.env.MYSQL_PASSWORD,
   {
     host: process.env.MYSQL_HOST,
     dialect: "mysql",
   }
 );

 try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

// Modelo para la tabla usuarios
const Usuario = sequelize.define('Usuario', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  nombre: {
      type: DataTypes.STRING,
  },
  email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
  },
  numero_telefonico: {
      type: DataTypes.STRING,
  },
  contrasena: {
      type: DataTypes.STRING,
  },
  no_identificacion: {
      type: DataTypes.STRING,
  },
  ubicacion: {
      type: DataTypes.STRING,
  },
  foto_url: {
      type: DataTypes.STRING,
  },
  rol: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

// Modelo para la tabla fincas
const Finca = sequelize.define('Finca', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  nombre: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  pais: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  estado_departamento: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  tableName: 'fincas',
  timestamps: false,
});

// Modelo para la tabla usuario_finca
const UsuarioFinca = sequelize.define('UsuarioFinca', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
}, {
  tableName: 'usuario_finca',
  timestamps: false,
});

// Modelo para la tabla veterinarios
const Veterinario = sequelize.define('Veterinario', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  usuario_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Usuario,
          key: 'id',
      },
  },
  especialidad: {
      type: DataTypes.STRING,
  },
  numero_cedula: {
      type: DataTypes.STRING,
  },
  asignacion: {
      type: DataTypes.STRING,
  },
  foto_cedula_url: {
      type: DataTypes.STRING,
  },
}, {
  tableName: 'veterinarios',
  timestamps: false,
});

// Modelo para la tabla bovinos
const Bovino = sequelize.define('Bovino', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  finca_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Finca,
          key: 'id',
      },
      onDelete: 'SET NULL',
  },
  nombre: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  numero: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
  },
  fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  raza: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  id_padre: {
      type: DataTypes.INTEGER,
      references: {
          model: 'bovinos',
          key: 'id',
      },
      onDelete: 'SET NULL',
  },
  id_madre: {
      type: DataTypes.INTEGER,
      references: {
          model: 'bovinos',
          key: 'id',
      },
      onDelete: 'SET NULL',
  },
  procedencia: {
      type: DataTypes.STRING,
  },
  peso: {
      type: DataTypes.DECIMAL(10, 2),
  },
  sexo: {
      type: DataTypes.ENUM('Macho', 'Hembra'),
      allowNull: false,
  },
  estado: {
      type: DataTypes.ENUM('Vivo', 'Muerto', 'Vendido'),
      allowNull: false,
  },
  etapa_vida: {
      type: DataTypes.STRING,
  },
  proposito: {
      type: DataTypes.STRING,
  },
  estado_salud: {
      type: DataTypes.STRING,
  },
  estado_reproductivo: {
      type: DataTypes.STRING,
  },
  fecha_ultimo_chequeo: {
      type: DataTypes.DATE,
  },
  foto: {
      type: DataTypes.STRING,
  },
}, {
  tableName: 'bovinos',
  timestamps: false,
});

// Modelo para la tabla pesajes
const Pesaje = sequelize.define('Pesaje', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Bovino,
          key: 'id',
      },
  },
  fecha: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  peso: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
}, {
  tableName: 'pesajes',
  timestamps: false,
});

// Modelo para procedimientos_medicos
const ProcedimientoMedico = sequelize.define('ProcedimientoMedico', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Bovino,
          key: 'id',
      },
  },
  tipo: {
      type: DataTypes.ENUM('Vacuna', 'Cirugía', 'Chequeo'),
      allowNull: false,
  },
  fecha: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  detalles: {
      type: DataTypes.STRING,
  },
}, {
  tableName: 'procedimientos_medicos',
  timestamps: false,
});

// Modelo para ciclos_reproductivos
const CicloReproductivo = sequelize.define('CicloReproductivo', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Bovino,
          key: 'id',
      },
  },
  fecha_inicio_celo: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  fecha_fin_celo: {
      type: DataTypes.DATE,
  },
}, {
  tableName: 'ciclos_rep',
  timestamps: false,
});

// Modelo para servicios
const Servicio = sequelize.define('Servicio', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Bovino,
          key: 'id',
      },
  },
  toro_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Bovino,
          key: 'id',
      },
      onDelete: 'SET NULL',
  },
  fecha_servicio: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  tipo_servicio: {
      type: DataTypes.ENUM('monta natural', 'inseminación'),
      allowNull: false,
  },
  pajilla_lote: {
      type: DataTypes.STRING,
  },
  exitoso: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
}, {
  tableName: 'servicios',
  timestamps: false,
});

// Modelo para embarazos
const Embarazo = sequelize.define('Embarazo', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Bovino,
          key: 'id',
      },
  },
  fecha_embarazo: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  fecha_parto: {
      type: DataTypes.DATE,
  },
  tipo_finalizacion: {
      type: DataTypes.ENUM('aborto', 'parto', 'reabsorción'),
  },
}, {
  tableName: 'embarazos',
  timestamps: false,
});

// Modelo para decesos
const Deceso = sequelize.define('Deceso', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Bovino,
          key: 'id',
      },
  },
  fecha_deceso: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  causa_deceso: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  tableName: 'decesos',
  timestamps: false,
});

const Pajillas = sequelize.define('Pajillas', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'bovinos',
          key: 'id',
      },
  },
  lote: {
      type: DataTypes.STRING(100),
  },
  fecha_extraccion: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  cantidad_extraida: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  cantidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  pedigree: {
      type: DataTypes.STRING(255),
  },
}, {
  tableName: 'pajillas',
  timestamps: false,
});

const Ventas = sequelize.define('Ventas', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'bovinos',
          key: 'id',
      },
  },
  fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  comprador: {
      type: DataTypes.STRING(255),
  },
  precio: {
      type: DataTypes.DECIMAL(10, 2),
  },
}, {
  tableName: 'ventas',
  timestamps: false,
});

const Tareas = sequelize.define('Tareas', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  descripcion: {
      type: DataTypes.STRING(255),
  },
  usuario_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'usuarios',
          key: 'id',
      },
  },
  finca_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'fincas',
          key: 'id',
      },
  },
  status: {
      type: DataTypes.STRING(50),
  },
}, {
  tableName: 'tareas',
  timestamps: false,
});


const ProduccionLeche = sequelize.define('ProduccionLeche', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'bovinos',
          key: 'id',
      },
  },
  fecha: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  produccion_manana: {
      type: DataTypes.DECIMAL(10, 2),
  },
  produccion_tarde: {
      type: DataTypes.DECIMAL(10, 2),
  },
}, {
  tableName: 'produccion_leche',
  timestamps: false,
});

const ProduccionCarne = sequelize.define('ProduccionCarne', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'bovinos',
          key: 'id',
      },
  },
  fecha: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  cantidad_carne: {
      type: DataTypes.DECIMAL(10, 2),
  },
}, {
  tableName: 'produccion_carne',
  timestamps: false,
});

const VentasLeche = sequelize.define('VentasLeche', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
  precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
  total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: sequelize.literal('cantidad * precio_unitario'),
  },
  comprador: {
      type: DataTypes.STRING(255),
  },
  finca_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'fincas',
          key: 'id',
      },
  },
}, {
  tableName: 'ventas_leche',
  timestamps: false,
});

const VentasCarne = sequelize.define('VentasCarne', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
  precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
  total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: sequelize.literal('cantidad * precio_unitario'),
  },
  comprador: {
      type: DataTypes.STRING(255),
  },
  finca_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'fincas',
          key: 'id',
      },
  },
}, {
  tableName: 'ventas_carne',
  timestamps: false,
});

const IngresosGastos = sequelize.define('IngresosGastos', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  finca_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'fincas',
          key: 'id',
      },
  },
  fecha: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  tipo: {
      type: DataTypes.ENUM('Ingreso', 'Gasto'),
  },
  monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
  },
  descripcion: {
      type: DataTypes.STRING(255),
  },
}, {
  tableName: 'ingresos_gastos',
  timestamps: false,
});

const Notificaciones = sequelize.define('Notificaciones', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
  },
  tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
  },
  bovino_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'bovinos',
          key: 'id',
      },
  },
  finca_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'fincas',
          key: 'id',
      },
  },
  usuario_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'usuarios',
          key: 'id',
      },
  },
  allusers: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
  redirect: {
      type: DataTypes.STRING(250),
  },
  fecha_envio: {
      type: DataTypes.DATE,
  },
  leida: {
      type: DataTypes.BOOLEAN,
  },
  estado: {
      type: DataTypes.STRING(50),
  },
  reintentos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
  },
  fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'notificaciones',
  timestamps: false,
});

export class bovinoModel {
    static async getBovino ({id}) {
        const [row] = await connection.query(
            `SELECT * FROM Bovinos WHERE id = ?`, [id]
        )
        return row[0];
    }

    static async addBovino({bovino}) {
        const { finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive} = bovino;
    
        const sql = ` INSERT INTO Bovinos 
            (finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive)
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
        // si existe filtro y orden
        if (filter && order ){
            [rows] = await connection.query(
                `SELECT * FROM Bovinos WHERE finca_id = ?  ORDER BY ?? ${order}`, [id, filter]
            )
        }
        //se consultan sin filtros
        else{
            [rows] = await connection.query(
                `SELECT * FROM Bovinos WHERE finca_id = ?`, [id]
            )
        }
        return rows;
    }

    static async  addFinca({usuario, finca}) {
        const { nombre, pais, estado_departamento} = finca;
        const user = usuario;
    
        const sql = `INSERT INTO finca (nombre, pais, estado_departamento) VALUES (?, ?, ?)`;
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
    
        const sql = `UPDATE finca SET ${updateFields} WHERE id = ?`;
    
        const values = [...Object.values(updates), fincaId];
    
        const [result] = await connection.query(sql,values);
    
        return this.getFinca({id})
    }

    static async deleteFinca({id}){
        const fincaId = id;

        const sql = 'DELETE FROM finca WHERE id = ?'
        const [result] = await connection.query(sql, [fincaId]);

        return result;
    }
}

export class userModel {

    static async getCredentials({user}){
      const {email, contrasena} = user;
      // const sql = `SELECT id, nombre, contrasena, rol FROM usuarios WHERE email = ?;`
        // const [usuario] = await connection.query(sql, [email, contrasena]);
        // if (usuario[0]) { //si existe el usuario se consultan sus fincas
        //     const [fincasResult] = await connection.query(
        //         `SELECT finca_id from usuario_finca WHERE usuario_id = ?;`, [usuario[0].id]
        //     );
        //     const fincas = fincasResult.map(row => row.finca_id);
        //     usuario[0].fincas = fincas; //se añaden las fincas como propiedad en forma de arreglo
        //     console.log(usuario[0])
        // }   
        // return usuario[0];

      const usuario = await Usuario.findOne({attributes: ['id', 'nombre', 'email', 'contrasena'], where: { email } });
      if (usuario) {
        const [fincas] = await usuario_finca.findOne({attributes: [id], where: { usuario_id : usuario.id }})
          console.log('Información del usuario:', usuario.toJSON());
      } else {
          console.log('Usuario no encontrado');
      }
      return usuario;
    }

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
            //return{
            //    user: user[0],
            //    fincas: fincas
            //} 
            return user[0]  // Devolver solo el primer registro (suponiendo ID es único)

        } catch (error) {
            console.error('Error executing queries:', error);
            throw error;
        }
    }

    static async getFincasUser({id}) {
        const [rows] = await connection.query(
            `SELECT f.* FROM finca f
            JOIN usuario_finca uf ON f.id = uf.finca_id
            WHERE uf.usuario_id = ?; `,[id]
        )
        return rows; //devuelve las fincas asociadas a un usuario
    }

    static async addUser({user}) {
        const {nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto } = user;
    
        const sql = `INSERT INTO usuarios (nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const [result] = await connection.query(sql, [nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto]);
    
        return result.insertId;
    }
}