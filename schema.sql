CREATE DATABASE MooTest;
USE MooTest;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada usuario
    nombre VARCHAR(100) NOT NULL, -- Nombre del usuario
    email VARCHAR(255) UNIQUE NOT NULL, -- Email del usuario (único)
    numero_telefonico VARCHAR(15), -- Número telefónico del usuario
    contrasena VARCHAR(255) NOT NULL, -- Contraseña del usuario (almacenada de forma segura)
    no_identificacion VARCHAR(50) NOT NULL, -- Número de identificación del usuario
    ubicacion VARCHAR(255), -- Ubicación del usuario
    rol ENUM('Admin', 'Usuario', 'Gestor') NOT NULL, -- Rol del usuario
    puesto VARCHAR(100) -- Puesto del usuario
);

CREATE TABLE finca (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada finca
    nombre VARCHAR(255) NOT NULL, -- Nombre de la finca
    pais VARCHAR(100) NOT NULL, -- País donde se encuentra la finca
    estado_departamento VARCHAR(100) -- Estado o departamento donde se encuentra la finca
);

CREATE TABLE Bovinos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  finca_id INT,
  numero VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100),
  fecha_nacimiento DATE,
  raza VARCHAR(100),
  id_papa INT,
  id_mama INT,
  procedencia VARCHAR(255),
  sexo  ENUM('macho', 'hembra') NOT NULL,
  proposito VARCHAR(25),
  peso DECIMAL(10, 2),
  ciclo_de_vida VARCHAR(50),
  isAlive  BOOLEAN,
  FOREIGN KEY (finca_id) REFERENCES finca(id) ON DELETE SET NULL,
  FOREIGN KEY (id_mama) REFERENCES Bovinos(id) ON DELETE SET NULL, -- Relación con la misma tabla
  FOREIGN KEY (id_papa) REFERENCES Bovinos(id) ON DELETE SET NULL
);

CREATE TABLE usuario_finca (
    usuario_id INT,
    finca_id INT,
    PRIMARY KEY (usuario_id, finca_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (finca_id) REFERENCES finca(id) ON DELETE CASCADE
);


-- Agregar usuarios 
INSERT INTO usuarios (nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto)
VALUES ('Julian Hernandez', 'julianh@example.com', '31234123890', 'hashed_password', '1003454656', 'Cundinamarca', 'Admin', 'Propietario'),
('Mario García', 'mario.g@example.com', '31234567890', 'hashed_password', '1003456656', 'Bogotá', 'Admin', 'Propietario'),
('Julian Hernandez', 'julianh@example.com', '31234123890', 'hashed_password', '1003454656', 'Cundinamarca', 'Admin', 'Propietario');

-- Agregar fincas
INSERT INTO finca (nombre, pais, estado_departamento) VALUES 
('Finca Valle del Sol', 'Colombia', 'Antioquia'),
('Finca La Esperanza', 'Colombia', 'Antioquia'),
('Finca El Manzano', 'Colombia', 'Bogotá'),
('Finca Monte Verde', 'Colombia', 'Cundinamarca'),
('Finca Piedra Blanca', 'Colombia', 'Cundinamarca');

-- Relacionar propietarios con fincas
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (1, 1);
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (1, 2);
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (1, 3); 
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (2, 4); 
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (2, 5); 

INSERT INTO Bovinos (finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive)
VALUES (1, 'BOV123', 'Ramón', '2023-05-01', 'Charolais', NULL, NULL, 'Finca La Esperanza', 'macho','carne', 600.00, 'ternero', 1);

-- Inserta 10 bovinos, distribuidos entre fincas del 1 al 5
INSERT INTO Bovinos (finca_id, numero, nombre, fecha_nacimiento, raza, id_papa, id_mama, procedencia, sexo, proposito, peso, ciclo_de_vida, isAlive)
VALUES 
(1, 'BOV001', 'Ramón', '2023-05-01', 'Charolais', NULL, NULL, 'Finca La Esperanza', 'macho', 'carne', 600.00, 'ternero', 1),
(2, 'BOV002', 'Lola', '2023-03-15', 'Angus', NULL, NULL, 'Finca El Paraíso', 'hembra', 'carne', 550.00, 'ternero', 1),
(3, 'BOV003', 'Juan', '2023-04-10', 'Hereford', NULL, NULL, 'Finca La Cabaña', 'macho', 'carne', 620.00, 'ternero', 1),
(4, 'BOV004', 'Marta', '2023-06-20', 'Piedmontese', NULL, NULL, 'Finca Santa Ana', 'hembra', 'leche', 500.00, 'ternero', 1),
(5, 'BOV005', 'Carlos', '2023-07-12', 'Charolais', NULL, NULL, 'Finca El Sol', 'macho', 'carne', 580.00, 'ternero', 1),
(1, 'BOV006', 'Sofía', '2023-08-01', 'Angus', NULL, NULL, 'Finca La Esperanza', 'hembra', 'carne', 570.00, 'ternero', 1),
(2, 'BOV007', 'Miguel', '2023-02-25', 'Hereford', NULL, NULL, 'Finca El Paraíso', 'macho', 'carne', 590.00, 'ternero', 1),
(3, 'BOV008', 'Ana', '2023-01-30', 'Piedmontese', NULL, NULL, 'Finca La Cabaña', 'hembra', 'leche', 480.00, 'ternero', 1),
(4, 'BOV009', 'Pedro', '2023-09-05', 'Charolais', NULL, NULL, 'Finca Santa Ana', 'macho', 'carne', 600.00, 'ternero', 1),
(5, 'BOV010', 'Isabel', '2023-10-15', 'Angus', NULL, NULL, 'Finca El Sol', 'hembra', 'carne', 560.00, 'ternero', 1);

-- Fincas por usuario
SELECT f.*
FROM finca f
JOIN usuario_finca uf ON f.id = uf.finca_id
WHERE uf.usuario_id = 1; -- Reemplaza 1 con el ID del usuario

SELECT * FROM usuarios;
SELECT * FROM finca;
SELECT * FROM usuario_finca;
SELECT * FROM Bovinos;

SELECT finca_id  from usuario_finca WHERE usuario_id = ?;


------- BUENA  -----
-- Table: usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, --  Identificador único y autoincrementable
    nombre VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL , -- El email no es UNIQUE porque podría haber un usuario con roles distintos
    numero_telefonico VARCHAR(20),
    contrasena VARCHAR(255),
    no_identificacion VARCHAR(50),
    ubicacion VARCHAR(255), 
    foto_url VARCHAR(255),
    rol VARCHAR(50) NOT NULL
);

-- Table: finca
CREATE TABLE fincas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    estado_departamento VARCHAR(100) NOT NULL
);

-- Table: usuario_finca
CREATE TABLE usuario_finca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    finca_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (finca_id) REFERENCES fincas(id) ON DELETE CASCADE
);

-- Table: veterinarios
CREATE TABLE veterinarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    especialidad VARCHAR(100),
    numero_cedula VARCHAR(50),
    asignacion VARCHAR(100),
    foto_cedula_url VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Table: bovinos
CREATE TABLE bovinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    finca_id INT,
    nombre VARCHAR(255) NOT NULL,
    numero VARCHAR(50) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    raza VARCHAR(100) NOT NULL,
    id_padre INT,
    id_madre INT,
    procedencia VARCHAR(255),
    peso DECIMAL(10, 2),
    sexo ENUM('Macho', 'Hembra') NOT NULL,
    estado ENUM('Vivo', 'Muerto', 'Vendido') NOT NULL,
    etapa_vida VARCHAR(100),
    proposito VARCHAR(100),
    estado_salud VARCHAR(100),
    estado_reproductivo VARCHAR(100),
    fecha_ultimo_chequeo DATE,
    foto VARCHAR(255),
    FOREIGN KEY (finca_id) REFERENCES fincas(id) ON DELETE SET NULL,
    FOREIGN KEY (id_madre) REFERENCES bovinos(id) ON DELETE SET NULL, -- Relación con la misma tabla
    FOREIGN KEY (id_padre) REFERENCES bovinos(id) ON DELETE SET NULL
);

-- Table: pesajes
CREATE TABLE pesajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    fecha DATE NOT NULL,
    peso DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id)
);


-- Table: procedimientos_medicos
CREATE TABLE procedimientos_medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    tipo ENUM('Vacuna', 'Cirugía', 'Chequeo') NOT NULL,
    fecha DATE NOT NULL,
    detalles VARCHAR(255),
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id)
);

-- Table: ciclos_reproductivos
CREATE TABLE ciclos_rep (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    fecha_inicio_celo DATE NOT NULL,
    fecha_fin_celo DATE,
    FOREIGN KEY (bovino_id) REFERENCES Bovinos(id) ON DELETE CASCADE
);

CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    toro_id INT,
    fecha_servicio DATE NOT NULL,
    tipo_servicio ENUM('monta natural', 'inseminación') NOT NULL,
    pajilla_lote VARCHAR(255),  -- Campo para la pajilla
    exitoso BOOLEAN NOT NULL,
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id) ON DELETE CASCADE,
	FOREIGN KEY (toro_id) REFERENCES bovinos(id) ON DELETE SET NULL
);


CREATE TABLE embarazos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    fecha_embarazo DATE NOT NULL,
    fecha_parto DATE,
    tipo_finalizacion ENUM('aborto', 'parto', 'reabsorción'),
    FOREIGN KEY (bovino_id) REFERENCES Bovinos(id) ON DELETE CASCADE
);


-- Table: decesos
CREATE TABLE decesos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    fecha_deceso DATE NOT NULL,
    causa_deceso VARCHAR(255) NOT NULL,
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id)
);
-- Table: pajillas
CREATE TABLE pajillas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    lote VARCHAR(100),
    fecha_extraccion DATE NOT NULL,
    cantidad_extraida INT NOT NULL,
    cantidad_disponible INT NOT NULL,
    pedigree VARCHAR(255),
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id)
);

-- Table: ventas
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    fecha_venta DATE NOT NULL,
    comprador VARCHAR(255),
    precio DECIMAL(10, 2),
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id)
);

-- Table: tareas
CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    usuario_id INT,
    finca_id INT,
    status VARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (finca_id) REFERENCES fincas(id)
);

-- Table: produccion_leche
CREATE TABLE produccion_leche (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    fecha DATE NOT NULL,
    produccion_manana DECIMAL(10, 2),
    produccion_tarde DECIMAL(10, 2),
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id)
);

-- Table: produccion_carne
CREATE TABLE produccion_carne (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bovino_id INT,
    fecha DATE NOT NULL,
    cantidad_carne DECIMAL(10, 2),
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id)
);

-- Table: ventas_leche
CREATE TABLE ventas_leche (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_venta DATE NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) AS (cantidad * precio_unitario) STORED,
    comprador VARCHAR(255),
    finca_id INT,
    FOREIGN KEY (finca_id) REFERENCES fincas(id)
);

-- Table: ventas_carne
CREATE TABLE ventas_carne (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_venta DATE NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) AS (cantidad * precio_unitario) STORED,
    comprador VARCHAR(255),
    finca_id INT,
    FOREIGN KEY (finca_id) REFERENCES fincas(id)
);

-- Table: ingresos_gastos
CREATE TABLE ingresos_gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    finca_id INT,
    fecha DATE NOT NULL,
    tipo ENUM('Ingreso', 'Gasto'),
    monto DECIMAL(10, 2) NOT NULL,
    descripcion VARCHAR(255),
    FOREIGN KEY (finca_id) REFERENCES fincas(id)
);

CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    bovino_id INT,
    finca_id INT,
    usuario_id INT,
    allusers BOOLEAN NOT NULL,
    redirect VARCHAR(250),
    fecha_envio DATETIME,
    leida BOOLEAN,
    estado VARCHAR(50),
    reintentos INT DEFAULT 0,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bovino_id) REFERENCES bovinos(id),
    FOREIGN KEY (finca_id) REFERENCES fincas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserción de usuarios
INSERT INTO usuarios (
    nombre, 
    email,
    numero_telefonico,
    contrasena,
    no_identificacion,
    ubicacion,
    foto_url,
    rol
) VALUES
('Juan Pérez', 'juan.perez@example.com', '123456789', '$2a$10$22u7l7/oUnCV5vBmOMQWseldcLHu3tv5IqV7iMpvzzYigUqnTIB3S', 'ID-001', 'Finca Central', NULL, 'Propietario'),
('María Gómez', 'maria.gomez@example.com', '987654321', '$2a$10$x56hZh/RnBbjCo04WFggS.0QLuqRp5fVJDqV2P0d62EPgL0PRNdjy', 'ID-002', 'Finca Central', NULL, 'Trabajador'),
('Dr. Carlos Martínez', 'carlos.martinez@example.com', '555123456', '$2a$10$./Emv7vgnRBDojiNOVST2.vMMCEe3HnT.gWJhwtSfOsV3FDV0/iCm', 'ID-003', 'Consultorio Veterinario', 'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg', 'Veterinario');

-- Inserción de fincas
INSERT INTO fincas (nombre, pais, estado_departamento) VALUES
('Finca Central', 'Colombia', 'Cundinamarca');

-- Vincular usuarios a la finca
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES
(1, 1),  -- Vincular a Juan Pérez
(2, 1),  -- Vincular a María Gómez
(3, 1);  -- Vincular a Dr. Carlos Martínez

-- Inserción de veterinarios
INSERT INTO veterinarios (
    usuario_id,
    especialidad,
    numero_cedula,
    asignacion,
    foto_cedula_url
) VALUES
(3, 'Veterinaria General', 'CED-001', 'Finca Central', 'url_foto_cedula.jpg');

-- Inserción de bovinos
INSERT INTO bovinos (
    finca_id,
    nombre,
    numero,
    fecha_nacimiento,
    raza,
    procedencia,
    peso,
    sexo,
    estado,
    etapa_vida,
    proposito,
    estado_salud,
    fecha_ultimo_chequeo,
    foto
) VALUES
(1, 'Lola', 'BOV-001', '2022-03-15', 'Holstein', 'Finca Central', 450.00, 'Hembra', 'Vivo', 'Vaca', 'Producción de leche', 'Saludable', '2023-10-01', 'https://www.shutterstock.com/es/image-vector/dairy-cow-head-realistic-color-vector-2248218655'),
(1, 'Tito', 'BOV-002', '2022-05-20', 'Brahman', 'Finca Central', 600.00, 'Macho', 'Vivo', 'Toro', 'Reproducción', 'Saludable', '2023-09-15', 'https://www.shutterstock.com/es/image-vector/dairy-cow-head-realistic-color-vector-2248218655'),
(1, 'Betsy', 'BOV-003', '2021-11-30', 'Jersey', 'Finca Central', 380.00, 'Hembra', 'Vivo', 'Vaca', 'Producción de leche', 'Saludable', '2023-10-01', 'https://www.shutterstock.com/es/image-vector/dairy-cow-head-realistic-color-vector-2248218655');

-- Inserción de pesajes
INSERT INTO pesajes (bovino_id, fecha, peso) VALUES
(1, '2023-09-01', 455.00),
(1, '2023-10-01', 460.00),
(2, '2023-09-15', 605.00),
(3, '2023-09-20', 390.00);

-- Inserción de procedimientos médicos
INSERT INTO procedimientos_medicos (bovino_id, tipo, fecha, detalles) VALUES
(1, 'Vacuna', '2023-09-05', 'Vacuna de refuerzo contra brucelosis.'),
(2, 'Cirugía', '2023-06-20', 'Cirugía de castración realizada.'),
(3, 'Chequeo', '2023-08-15', 'Chequeo general con resultado positivo.');

-- Inserción de ciclos reproductivos
INSERT INTO ciclos_rep (bovino_id, fecha_inicio_celo, fecha_fin_celo) VALUES
(1, '2024-09-01', NULL),
(3, '2023-08-01', '2023-09-01');

-- Inserción de embarazos
INSERT INTO embarazos (bovino_id, fecha_embarazo, servicio_id, tipo_finalizacion) VALUES
(3, '2023-09-10', NULL, 'En Embarazo');

-- Inserción de decesos
INSERT INTO decesos (bovino_id, fecha_deceso, causa_deceso) VALUES
(3, '2024-01-15', 'Enfermedad respiratoria');

-- Inserción de pajillas
INSERT INTO pajillas (bovino_id, lote, fecha_extraccion, cantidad_extraida, cantidad_disponible) VALUES
(2, 'Lote-001', '2023-09-10', 15, 5);

-- Inserción de ventas
INSERT INTO ventas (bovino_id, fecha_venta, comprador, precio) VALUES
(1, '2023-09-25', 'Carne S.A.', 1200.00),
(2, '2023-10-01', 'Lácteos Premium', 1500.00);

-- Inserción de tareas
INSERT INTO tareas (descripcion, usuario_id, finca_id, status) VALUES
('Revisar estado de salud de los bovinos', 3, 1, 'Pendiente'),
('Limpiar establos', 2, 1, 'Completada'),
('Aplicar vacunas', 3, 1, 'En progreso');

-- Inserción de producción de leche
INSERT INTO produccion_leche (bovino_id, fecha, produccion_manana, produccion_tarde) VALUES
(1, '2023-10-01', 15.5, 14.0),
(3, '2023-10-01', 12.0, 11.5);

-- Inserción de producción de carne
INSERT INTO produccion_carne (bovino_id, fecha, cantidad_carne) VALUES
(2, '2023-10-01', 250.00);

-- Inserción de ventas de leche
INSERT INTO ventas_leche (fecha_venta, cantidad, precio_unitario, comprador, finca_id) VALUES
('2023-10-01', 100.00, 0.75, 'Lácteos del Campo', 1);

-- Inserción de ventas de carne
INSERT INTO ventas_carne (fecha_venta, cantidad, precio_unitario, comprador, finca_id) VALUES
('2023-09-30', 200.00, 5.00, 'Carnes Frescas', 1);

-- Inserción de ingresos y gastos
INSERT INTO ingresos_gastos (finca_id, fecha, tipo, monto, descripcion) VALUES
(1, '2023-10-01', 'Ingreso', 2000.00, 'Venta de leche'),
(1, '2023-09-28', 'Gasto', 500.00, 'Compra de alimento para ganado');



--------- FLUJO -----------
-- Registrar usuario 
INSERT INTO usuarios (nombre, email, contrasena, numero_telefonico) VALUES 
('Juan Guarnizo', 'juang@example.com', '$2a$10$22u7l7/oUnCV5vBmOMQWseldcLHu3tv5IqV7iMpvzzYigUqnTIB3S', '3213332121');

-- Completar perfil 
UPDATE usuarios SET no_identificacion = '1006646658', ubicacion = 'Bogotá, Colombia', rol = 'Propietario' 
WHERE email = 'juang@example.com';

-- Cuando se cargue la foto 
UPDATE usuarios SET foto_url = 'http://photo.jpg' WHERE email = 'juang@example.com';

-- Si es veterinario, completar perfil veterinario 
INSERT INTO veterinarios (usuario_id, especialidad, numero_cedula, asignacion) VALUES 
((SELECT id FROM usuarios WHERE email = 'juang@example.com'), 'Bovinos', '123456789', 'Reproducción');

-- Iniciar sesión 
SELECT id, nombre, email, contrasena, numero_telefonico, rol FROM usuarios WHERE email = 'juang@example.com';

-- Actualizar contraseña 
UPDATE usuarios SET contrasena = '$2a$10$hash' WHERE id = (SELECT id FROM usuarios WHERE email = 'juang@example.com');

-- Agregar finca 
INSERT INTO fincas (nombre, pais, estado_departamento) VALUES 
('Finca Bacana', 'Colombia', 'Cundinamarca');

-- Vincular finca al usuario
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES
((SELECT id FROM usuarios WHERE email = 'juang@example.com'), LAST_INSERT_ID());

-- Editar finca 
UPDATE fincas SET nombre = 'Finca Actualizada' WHERE id = (SELECT LAST_INSERT_ID());

-- Agregar un bovino a la finca 
INSERT INTO bovinos (
    finca_id,
    nombre,
    numero,
    fecha_nacimiento,
    raza,
    id_padre,
    id_madre,
    procedencia,
    peso,
    sexo,
    estado,
    etapa_vida,
    proposito,
    estado_salud,
    fecha_ultimo_chequeo
) VALUES
(LAST_INSERT_ID(), 'Lola', 'BOV-001', '2022-03-15', 'Holstein', NULL, NULL, 'Finca Central', 450.00, 'Hembra', 'Vivo', 'Vaca', 'Producción de leche', 'Saludable', '2023-10-01');

-- Para actualizar foto de perfil de la vaca
UPDATE bovinos SET foto = 'http://foto_url' WHERE id = LAST_INSERT_ID();

-- Ver los animales de una finca 
SELECT * FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID());

-- Agregar pajillas relacionadas a un bovino
INSERT INTO pajillas (bovino_id, fecha_extraccion, cantidad_extraida, cantidad_disponible) VALUES
((SELECT id FROM bovinos WHERE nombre = 'Lola' AND finca_id = (SELECT LAST_INSERT_ID())), '2023-09-10', 20, 15);
 
-- Ver las pajillas de una finca 
SELECT p.id, p.bovino_id, b.nombre AS NombreBovino, p.fecha_extraccion, p.cantidad_extraida, (p.cantidad_extraida - p.cantidad_disponible) AS cantidad_utilizada 
FROM pajillas p JOIN bovinos b ON p.bovino_id = b.id WHERE b.finca_id = (SELECT LAST_INSERT_ID());

-- Ver las tareas de una finca, status y el empleado asignado
SELECT t.id, t.descripcion, u.nombre, t.finca_id, t.status FROM tareas t JOIN usuarios u ON t.usuario_id = u.id WHERE t.finca_id = (SELECT LAST_INSERT_ID());

-- Ver mis tareas como empleado 
SELECT * FROM tareas WHERE usuario_id = (SELECT id FROM usuarios WHERE email = 'juang@example.com');

-- Cambiar el status de una tarea
UPDATE tareas SET status = 'Pendiente' WHERE id = (SELECT id FROM tareas WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1);

-- Ver los toros para monta natural 
SELECT * FROM bovinos WHERE proposito = 'Monta natural' AND finca_id = (SELECT LAST_INSERT_ID());

-- Ver los decesos de una finca 
SELECT * FROM decesos WHERE bovino_id IN (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()));

-- Registrar un deceso 
INSERT INTO decesos (bovino_id, fecha_deceso, causa_deceso) VALUES 
((SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1), '2024-10-10', 'Muerte natural');

UPDATE bovinos SET estado = 'Muerto' WHERE id = (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1);

-- Control lechero: ver producción de leche de una vaca por día 
SELECT *, (produccion_manana + produccion_tarde) AS produccion_total FROM produccion_leche WHERE bovino_id = (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1);

-- Control lechero: ver producción de leche de una vaca en la fecha actual
SELECT *, (produccion_manana + produccion_tarde) AS produccion_total FROM produccion_leche WHERE bovino_id = (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1) AND fecha = CURDATE(); 

-- Agregar registro de leche de la vaca en un día 
INSERT INTO produccion_leche (bovino_id, fecha, produccion_manana, produccion_tarde) VALUES 
((SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1), CURDATE(), 12, 14);

-- Registro de leche por la mañana 
INSERT INTO produccion_leche (bovino_id, fecha, produccion_manana) VALUES 
((SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1), CURDATE(), 12);

-- Actualizar registro por la tarde 
UPDATE produccion_leche SET produccion_tarde = 14 WHERE bovino_id = (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1) AND fecha = CURDATE();

-- Ver registro de pesaje de una vaca
SELECT * FROM pesajes WHERE bovino_id = (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1);

-- Agregar registro de pesaje 
START TRANSACTION;
INSERT INTO pesajes (bovino_id, fecha, peso) VALUES
((SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1), CURDATE(), 457);

UPDATE bovinos 
SET peso = (SELECT peso FROM pesajes WHERE bovino_id = (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1) ORDER BY id DESC LIMIT 1) 
WHERE id = (SELECT id FROM bovinos WHERE finca_id = (SELECT LAST_INSERT_ID()) LIMIT 1);

COMMIT;

-- Estado reproductivo de una vaca 
Select id, nombre, sexo, estado_reproductivo from bovinos where id = 1;

Select * from ciclos_rep;
-- Registrar celo 
START TRANSACTION;
INSERT INTO ciclos_rep (bovino_id, fecha_inicio_celo, fecha_fin_celo) VALUES (1, '2024-10-03', '2024-10-05');
UPDATE bovinos SET estado_reproductivo = 'En celo' WHERE id = 1;
COMMIT;

SELECT * FROM ciclos_rep;

-- Registrar servicio monta natural
START TRANSACTION;
INSERT INTO servicios (bovino_id, toro_id, fecha_servicio, tipo_servicio, exitoso) VALUES (1, 3, '2024-10-03', 'monta natural', 1);
UPDATE bovinos SET estado_reproductivo = 'Servicio' WHERE id = 1;
COMMIT;

select * from servicios; 

-- Registrar embarazo
START TRANSACTION;
INSERT INTO embarazos (bovino_id, toro_id, fecha_embarazo) VALUES (1, 3, '2024-10-03', 1);
UPDATE bovinos SET estado_reproductivo = 'En embarazo' WHERE id = 1;
COMMIT;

select * from embarazos;

-- Registrar aborto 
UPDATE embarazos SET fecha_parto='2024-10-17', tipo_finalizacion='aborto' WHERE bovino_id = 1 AND fecha_embarazo = '2024-10-03';
UPDATE bovinos SET estado_reproductivo = 'Adulta vacia' WHERE id = 1;


-- venta de un bovino
INSERT INTO ventas (bovino_id, fecha_venta, comprador, precio) VALUES
(1, '2023-09-25', 'Carne S.A.', 1200.00);

UPDATE bovinos SET estado = 'Vendido' WHERE id = 1;



