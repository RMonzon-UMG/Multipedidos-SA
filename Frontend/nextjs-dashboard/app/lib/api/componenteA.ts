// Funciones para consumir el Componente A (MariaDB - Puerto 8081)

const COMPONENTE_A_URL = process.env.NEXT_PUBLIC_COMPONENTE_A_URL || 'http://localhost:8081';

// Tipos TypeScript
export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

export interface ClienteInput {
  nombre: string;
  correo: string;
}

export interface Producto {
  nombre: string;
  precio: number;
}

export interface Pedido {
  id: number;
  clienteId: number;
  productos: Producto[];
  total: number;
}

export interface PedidoInput {
  clienteId: number;
  productos: Producto[];
}

// ============== CLIENTES ==============

/**
 * Obtener todos los clientes
 */
export async function getClientes(): Promise<Cliente[]> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener clientes: ${response.status}`);
    }

    const clientes = await response.json();
    return clientes;
  } catch (error) {
    console.error('Error en getClientes:', error);
    throw error;
  }
}

/**
 * Obtener un cliente por ID
 */
export async function getClienteById(id: number): Promise<Cliente> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener cliente ${id}: ${response.status}`);
    }

    const cliente = await response.json();
    return cliente;
  } catch (error) {
    console.error(`Error en getClienteById(${id}):`, error);
    throw error;
  }
}

/**
 * Crear un cliente
 */
export async function createCliente(data: ClienteInput): Promise<Cliente> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear cliente: ${response.status}`);
    }

    const nuevoCliente = await response.json();
    return nuevoCliente;
  } catch (error) {
    console.error('Error en createCliente:', error);
    throw error;
  }
}

/**
 * Actualizar un cliente
 */
export async function updateCliente(id: number, data: ClienteInput): Promise<Cliente> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar cliente ${id}: ${response.status}`);
    }

    const clienteActualizado = await response.json();
    return clienteActualizado;
  } catch (error) {
    console.error(`Error en updateCliente(${id}):`, error);
    throw error;
  }
}

/**
 * Eliminar un cliente
 */
export async function deleteCliente(id: number): Promise<void> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar cliente ${id}: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error en deleteCliente(${id}):`, error);
    throw error;
  }
}

// ============== PEDIDOS ==============

/**
 * Obtener todos los pedidos
 */
export async function getPedidos(): Promise<Pedido[]> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener pedidos: ${response.status}`);
    }

    const pedidos = await response.json();
    return pedidos;
  } catch (error) {
    console.error('Error en getPedidos:', error);
    throw error;
  }
}

/**
 * Obtener pedidos de un cliente específico
 */
export async function getPedidosByClienteId(clienteId: number): Promise<Pedido[]> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos?clienteId=${clienteId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener pedidos del cliente ${clienteId}: ${response.status}`);
    }

    const pedidos = await response.json();
    return pedidos;
  } catch (error) {
    console.error(`Error en getPedidosByClienteId(${clienteId}):`, error);
    throw error;
  }
}

/**
 * Obtener un pedido por ID
 */
export async function getPedidoById(id: number): Promise<Pedido> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error al obtener pedido ${id}: ${response.status}`);
    }

    const pedido = await response.json();
    return pedido;
  } catch (error) {
    console.error(`Error en getPedidoById(${id}):`, error);
    throw error;
  }
}

/**
 * Crear un pedido
 */
export async function createPedido(data: PedidoInput): Promise<Pedido> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear pedido: ${response.status}`);
    }

    const nuevoPedido = await response.json();
    return nuevoPedido;
  } catch (error) {
    console.error('Error en createPedido:', error);
    throw error;
  }
}

/**
 * Actualizar un pedido
 */
export async function updatePedido(id: number, data: PedidoInput): Promise<Pedido> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar pedido ${id}: ${response.status}`);
    }

    const pedidoActualizado = await response.json();
    return pedidoActualizado;
  } catch (error) {
    console.error(`Error en updatePedido(${id}):`, error);
    throw error;
  }
}

/**
 * Eliminar un pedido
 */
export async function deletePedido(id: number): Promise<void> {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar pedido ${id}: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error en deletePedido(${id}):`, error);
    throw error;
  }
}

// ============== ESTADÍSTICAS ==============

/**
 * Obtener total de clientes
 */
export async function getTotalClientes(): Promise<number> {
  const clientes = await getClientes();
  return clientes.length;
}

/**
 * Obtener total de pedidos
 */
export async function getTotalPedidos(): Promise<number> {
  const pedidos = await getPedidos();
  return pedidos.length;
}

/**
 * Obtener total de ventas (suma de todos los pedidos)
 */
export async function getTotalVentas(): Promise<number> {
  const pedidos = await getPedidos();
  return pedidos.reduce((sum, pedido) => sum + pedido.total, 0);
}

/**
 * Obtener últimos 5 pedidos
 */
export async function getUltimosPedidos(): Promise<Pedido[]> {
  const pedidos = await getPedidos();
  return pedidos.slice(-5).reverse(); // Los últimos 5, en orden inverso
}
