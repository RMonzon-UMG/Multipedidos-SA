-- Script COMPLETO para crear y poblar la base de datos en MariaDB
-- Base de datos: multipedidos_mariadb

-- ==================================================
-- PASO 1: CREAR LAS TABLAS
-- ==================================================

-- Eliminar tablas si existen (para poder ejecutar el script múltiples veces)
DROP TABLE IF EXISTS pedido_productos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS clientes;

-- Crear tabla de clientes
CREATE TABLE clientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Crear tabla de pedidos
CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    total DOUBLE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Crear tabla de productos de pedidos (relación @ElementCollection)
CREATE TABLE pedido_productos (
    pedido_id BIGINT NOT NULL,
    nombre VARCHAR(255),
    precio DOUBLE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==================================================
-- PASO 2: INSERTAR DATOS DE PRUEBA
-- ==================================================

-- Insertar Clientes de prueba
INSERT INTO clientes (nombre, correo) VALUES
('Juan Pérez', 'juan.perez@email.com'),
('María García', 'maria.garcia@email.com'),
('Carlos López', 'carlos.lopez@email.com'),
('Ana Martínez', 'ana.martinez@email.com'),
('Luis Rodríguez', 'luis.rodriguez@email.com'),
('Carmen Sánchez', 'carmen.sanchez@email.com'),
('Pedro Fernández', 'pedro.fernandez@email.com'),
('Laura Torres', 'laura.torres@email.com');

-- Insertar Pedidos de prueba
INSERT INTO pedidos (cliente_id, total) VALUES
(1, 1372.56),
(1, 95.20),
(2, 464.80),
(3, 313.60),
(3, 181.44),
(4, 106.40),
(5, 218.40),
(6, 61.60),
(7, 89.60),
(8, 378.56);

-- Insertar Productos para los Pedidos
-- Pedido 1
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(1, 'Laptop Dell XPS', 1200.00),
(1, 'Mouse Logitech', 25.50);

-- Pedido 2
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(2, 'Teclado Mecánico', 85.00);

-- Pedido 3
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(3, 'Monitor LG 27 pulgadas', 350.00),
(3, 'Webcam HD', 65.00);

-- Pedido 4
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(4, 'Impresora HP LaserJet', 280.00);

-- Pedido 5
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(5, 'Escáner Epson', 150.00),
(5, 'Cable HDMI', 12.00);

-- Pedido 6
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(6, 'Disco Duro Externo 2TB', 95.00);

-- Pedido 7
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(7, 'Memoria RAM 16GB', 120.00),
(7, 'SSD 500GB', 75.00);

-- Pedido 8
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(8, 'Router TP-Link', 55.00);

-- Pedido 9
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(9, 'Auriculares Bluetooth', 45.00),
(9, 'Micrófono USB', 35.00);

-- Pedido 10
INSERT INTO pedido_productos (pedido_id, nombre, precio) VALUES
(10, 'Tablet Samsung', 320.00),
(10, 'Funda protectora', 18.00);
