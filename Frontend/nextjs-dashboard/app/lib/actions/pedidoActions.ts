'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPedido } from '../api/componenteA';

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

    revalidatePath('/dashboard/pedidos');
    redirect('/dashboard/pedidos');
  } catch (error) {
    console.error('Error al crear pedido:', error);
    return { error: 'Error al crear el pedido. Verifica los datos e intenta nuevamente.' };
  }
}
