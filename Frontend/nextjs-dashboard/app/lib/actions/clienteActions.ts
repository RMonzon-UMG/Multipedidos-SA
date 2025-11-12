'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createCliente } from '../api/componenteA';

// Crear un nuevo cliente
export async function createClienteAction(prevState: any, formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const correo = formData.get('correo') as string;

  // Validaciones
  if (!nombre || nombre.trim() === '') {
    return { error: 'El nombre es requerido' };
  }

  if (!correo || correo.trim() === '') {
    return { error: 'El correo es requerido' };
  }

  // Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return { error: 'El correo no tiene un formato válido' };
  }

  try {
    await createCliente({ nombre, correo });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    return { error: 'Error al crear el cliente. Verifica que el microservicio esté corriendo.' };
  }

  // Si llegamos aquí, todo salió bien
  revalidatePath('/dashboard/clientes');
  redirect('/dashboard/clientes');
}
