'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createFactura, updateFactura, deleteFactura } from '../api/componenteB';

// Crear una nueva factura
export async function createFacturaAction(prevState: any, formData: FormData) {
  const proveedorId = formData.get('proveedorId') as string;
  const pedidosJson = formData.get('pedidos') as string;

  // Validaciones
  if (!proveedorId) {
    return { error: 'Debes seleccionar un proveedor' };
  }

  if (!pedidosJson) {
    return { error: 'Debes agregar al menos un pedido' };
  }

  try {
    const pedidos = JSON.parse(pedidosJson);

    if (pedidos.length === 0) {
      return { error: 'Debes agregar al menos un pedido' };
    }

    await createFactura({
      proveedorId: parseInt(proveedorId),
      pedidos: pedidos,
    });
  } catch (error) {
    console.error('Error al crear factura:', error);
    return { error: 'Error al crear la factura. Verifica los datos e intenta nuevamente.' };
  }

  revalidatePath('/dashboard/facturas');
  redirect('/dashboard/facturas');
}

// Actualizar una factura
export async function updateFacturaAction(id: number, prevState: any, formData: FormData) {
  const proveedorId = formData.get('proveedorId') as string;
  const pedidosJson = formData.get('pedidos') as string;

  // Validaciones
  if (!proveedorId) {
    return { error: 'Debes seleccionar un proveedor' };
  }

  if (!pedidosJson) {
    return { error: 'Debes agregar al menos un pedido' };
  }

  try {
    const pedidos = JSON.parse(pedidosJson);

    if (pedidos.length === 0) {
      return { error: 'Debes agregar al menos un pedido' };
    }

    await updateFactura(id, {
      proveedorId: parseInt(proveedorId),
      pedidos: pedidos,
    });
  } catch (error) {
    console.error('Error al actualizar factura:', error);
    return { error: 'Error al actualizar la factura. Verifica los datos e intenta nuevamente.' };
  }

  revalidatePath('/dashboard/facturas');
  redirect('/dashboard/facturas');
}

// Eliminar una factura
export async function deleteFacturaAction(id: number) {
  try {
    await deleteFactura(id);
  } catch (error) {
    console.error('Error al eliminar factura:', error);
    return { error: 'Error al eliminar la factura.' };
  }

  revalidatePath('/dashboard/facturas');
  redirect('/dashboard/facturas');
}
