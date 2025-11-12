// Funciones para consumir el Componente B (PostgreSQL - Puerto 8082)

const COMPONENTE_B_URL = process.env.NEXT_PUBLIC_COMPONENTE_B_URL || 'http://localhost:8082';

// Tipos TypeScript
export interface Proveedor {
  id: number;
  nombre: string;
  correo: string;
}

export interface ProveedorInput {
  nombre: string;
  correo: string;
}

export interface PedidoReferencia {
  pedidoId: number;
  total: number;
}

export interface Factura {
  id: number;
  proveedorId: number;
  pedidos: PedidoReferencia[];
  totalFactura: number;
}

export interface FacturaInput {
  proveedorId: number;
  pedidos: PedidoReferencia[];
}

// ============== PROVEEDORES ==============

/**
 * Obtener todos los proveedores
 */
export async function getProveedores(): Promise<Proveedor[]> {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/proveedores`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener proveedores: ${response.status}`);
    }

    const proveedores = await response.json();
    return proveedores;
  } catch (error) {
    console.error('Error en getProveedores:', error);
    throw error;
  }
}

/**
 * Crear un proveedor
 */
export async function createProveedor(data: ProveedorInput): Promise<Proveedor> {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/proveedores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear proveedor: ${response.status}`);
    }

    const nuevoProveedor = await response.json();
    return nuevoProveedor;
  } catch (error) {
    console.error('Error en createProveedor:', error);
    throw error;
  }
}

// ============== FACTURAS ==============

/**
 * Obtener todas las facturas
 */
export async function getFacturas(): Promise<Factura[]> {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/facturas`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener facturas: ${response.status}`);
    }

    const facturas = await response.json();
    return facturas;
  } catch (error) {
    console.error('Error en getFacturas:', error);
    throw error;
  }
}

/**
 * Obtener una factura por ID
 */
export async function getFacturaById(id: number): Promise<Factura> {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/facturas/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener factura ${id}: ${response.status}`);
    }

    const factura = await response.json();
    return factura;
  } catch (error) {
    console.error(`Error en getFacturaById(${id}):`, error);
    throw error;
  }
}

/**
 * Crear una factura
 */
export async function createFactura(data: FacturaInput): Promise<Factura> {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/facturas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear factura: ${response.status}`);
    }

    const nuevaFactura = await response.json();
    return nuevaFactura;
  } catch (error) {
    console.error('Error en createFactura:', error);
    throw error;
  }
}

// ============== ESTADÍSTICAS ==============

/**
 * Obtener total de proveedores
 */
export async function getTotalProveedores(): Promise<number> {
  const proveedores = await getProveedores();
  return proveedores.length;
}

/**
 * Obtener total de facturas
 */
export async function getTotalFacturas(): Promise<number> {
  const facturas = await getFacturas();
  return facturas.length;
}

/**
 * Obtener total de facturación (suma de todas las facturas)
 */
export async function getTotalFacturacion(): Promise<number> {
  const facturas = await getFacturas();
  return facturas.reduce((sum, factura) => sum + factura.totalFactura, 0);
}

/**
 * Obtener últimas 5 facturas
 */
export async function getUltimasFacturas(): Promise<Factura[]> {
  const facturas = await getFacturas();
  return facturas.slice(-5).reverse(); // Las últimas 5, en orden inverso
}
