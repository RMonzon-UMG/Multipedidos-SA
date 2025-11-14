'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPedido, updatePedido, deletePedido } from '../api/componenteA';

// Crear un nuevo pedido
export async function createPedidoAction(prevState: any, formData: FormData) {
  const clienteId = formData.get('clienteId') as string;
  const productosJson = formData.get('productos') as string;

  // Validaciones
  if (!clienteId) {
    return { error: 'Debes seleccionar un cliente' };
  }

  if (!productosJson) {
    return { error: 'Debes agregar al menos un producto' };
  }

  try {
    const productos = JSON.parse(productosJson);

    if (productos.length === 0) {
      return { error: 'Debes agregar al menos un producto' };
    }

    await createPedido({
      clienteId: parseInt(clienteId),
      productos: productos,
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    return { error: 'Error al crear el pedido. Verifica los datos e intenta nuevamente.' };
  }

  revalidatePath('/dashboard/pedidos');
  redirect('/dashboard/pedidos');
}

// Actualizar un pedido
export async function updatePedidoAction(id: number, prevState: any, formData: FormData) {
  const clienteId = formData.get('clienteId') as string;
  const productosJson = formData.get('productos') as string;

  // Validaciones
  if (!clienteId) {
    return { error: 'Debes seleccionar un cliente' };
  }

  if (!productosJson) {
    return { error: 'Debes agregar al menos un producto' };
  }

  try {
    const productos = JSON.parse(productosJson);

    if (productos.length === 0) {
      return { error: 'Debes agregar al menos un producto' };
    }

    await updatePedido(id, {
      clienteId: parseInt(clienteId),
      productos: productos,
    });
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    return { error: 'Error al actualizar el pedido. Verifica los datos e intenta nuevamente.' };
  }

  revalidatePath('/dashboard/pedidos');
  redirect('/dashboard/pedidos');
}

// Eliminar un pedido
export async function deletePedidoAction(id: number) {
  try {
    await deletePedido(id);
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    return { error: 'Error al eliminar el pedido.' };
  }

  revalidatePath('/dashboard/pedidos');
  redirect('/dashboard/pedidos');
}
