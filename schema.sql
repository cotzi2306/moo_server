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


-- Agregar fincas
INSERT INTO finca (nombre, pais, estado_departamento) VALUES 
('Finca Valle del Sol', 'Colombia', 'Antioquia'),
('Finca La Esperanza', 'Colombia', 'Antioquia'),
('Finca El Manzano', 'Colombia', 'Bogotá'),
('Finca Monte Verde', 'Colombia', 'Cundinamarca'),
('Finca Piedra Blanca', 'Colombia', 'Cundinamarca');

-- Agregar usuarios 
INSERT INTO usuarios (nombre, email, numero_telefonico, contrasena, no_identificacion, ubicacion, rol, puesto)
VALUES ('Julian Hernandez', 'julianh@example.com', '31234123890', 'hashed_password', '1003454656', 'Cundinamarca', 'Admin', 'Propietario'),
('Mario García', 'mario.g@example.com', '31234567890', 'hashed_password', '1003456656', 'Bogotá', 'Admin', 'Propietario'),
('Julian Hernandez', 'julianh@example.com', '31234123890', 'hashed_password', '1003454656', 'Cundinamarca', 'Admin', 'Propietario');

-- Relacionar propietarios con fincas
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (1, 1);
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (1, 2);
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (1, 3); 
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (2, 4); 
INSERT INTO usuario_finca (usuario_id, finca_id) VALUES (2, 5); 

-- Fincas por usuario
SELECT f.*
FROM finca f
JOIN usuario_finca uf ON f.id = uf.finca_id
WHERE uf.usuario_id = 1; -- Reemplaza 1 con el ID del usuario

SELECT * FROM usuarios;
SELECT * FROM finca;
SELECT * FROM usuario_finca;
SELECT * FROM Bovinos;


