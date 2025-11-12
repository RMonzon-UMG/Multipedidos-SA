-- Script COMPLETO para crear y poblar la base de datos en PostgreSQL
-- Base de datos: multipedidos_postgres

-- ==================================================
-- PASO 1: CREAR LAS TABLAS
-- ==================================================

-- Eliminar tablas si existen (para poder ejecutar el script múltiples veces)
DROP TABLE IF EXISTS factura_pedidos CASCADE;
DROP TABLE IF EXISTS facturas CASCADE;
DROP TABLE IF EXISTS proveedores CASCADE;

-- Crear tabla de proveedores
CREATE TABLE proveedores (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL
);

-- Crear tabla de facturas
CREATE TABLE facturas (
    id BIGSERIAL PRIMARY KEY,
    proveedor_id BIGINT NOT NULL,
    total_factura DOUBLE PRECISION NOT NULL
);

-- Crear tabla de referencias de pedidos en facturas (relación @ElementCollection)
CREATE TABLE factura_pedidos (
    factura_id BIGINT NOT NULL,
    pedido_id BIGINT,
    total DOUBLE PRECISION,
    FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE CASCADE
);

-- ==================================================
-- PASO 2: INSERTAR DATOS DE PRUEBA
-- ==================================================

-- Insertar Proveedores de prueba
INSERT INTO proveedores (nombre, correo) VALUES
('Distribuidora TechWorld', 'ventas@techworld.com'),
('Importadora GlobalParts', 'contacto@globalparts.com'),
('Suministros OfficeMax', 'pedidos@officemax.com'),
('Electrónica ModernTech', 'info@moderntech.com'),
('Comercial ComputerZone', 'compras@computerzone.com');

-- Insertar Facturas de prueba
INSERT INTO facturas (proveedor_id, total_factura) VALUES
(1, 1467.76),
(2, 464.80),
(3, 495.04),
(4, 324.80),
(5, 529.76);

-- Insertar Referencias de Pedidos para las Facturas
-- Factura 1
INSERT INTO factura_pedidos (factura_id, pedido_id, total) VALUES
(1, 1, 1372.56),
(1, 2, 95.20);

-- Factura 2
INSERT INTO factura_pedidos (factura_id, pedido_id, total) VALUES
(2, 3, 464.80);

-- Factura 3
INSERT INTO factura_pedidos (factura_id, pedido_id, total) VALUES
(3, 4, 313.60),
(3, 5, 181.44);

-- Factura 4
INSERT INTO factura_pedidos (factura_id, pedido_id, total) VALUES
(4, 6, 106.40),
(4, 7, 218.40);

-- Factura 5
INSERT INTO factura_pedidos (factura_id, pedido_id, total) VALUES
(5, 8, 61.60),
(5, 9, 89.60),
(5, 10, 378.56);
