'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProveedor, updateProveedor, deleteProveedor } from '../api/componenteB';

// Crear un nuevo proveedor
export async function createProveedorAction(prevState: any, formData: FormData) {
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
    await createProveedor({ nombre, correo });
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    return { error: 'Error al crear el proveedor. Verifica que el microservicio esté corriendo.' };
  }

  revalidatePath('/dashboard/proveedores');
  redirect('/dashboard/proveedores');
}

// Actualizar un proveedor
export async function updateProveedorAction(id: number, prevState: any, formData: FormData) {
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
    await updateProveedor(id, { nombre, correo });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    return { error: 'Error al actualizar el proveedor. Verifica que el microservicio esté corriendo.' };
  }

  revalidatePath('/dashboard/proveedores');
  redirect('/dashboard/proveedores');
}

// Eliminar un proveedor
export async function deleteProveedorAction(id: number) {
  try {
    await deleteProveedor(id);
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    return { error: 'Error al eliminar el proveedor.' };
  }

  revalidatePath('/dashboard/proveedores');
  redirect('/dashboard/proveedores');
}
