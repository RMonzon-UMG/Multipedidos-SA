'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createPedidoAction } from '@/app/lib/actions/pedidoActions';
import { useActionState, useState } from 'react';
import { UserGroupIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Cliente } from '@/app/lib/api/componenteA';

export default function Form({ clientes }: { clientes: Cliente[] }) {
  const initialState = { error: '' };
  const [state, formAction] = useActionState(createPedidoAction, initialState);

  const [productos, setProductos] = useState([{ nombre: '', precio: '' }]);

  const agregarProducto = () => {
    setProductos([...productos, { nombre: '', precio: '' }]);
  };

  const eliminarProducto = (index: number) => {
    if (productos.length > 1) {
      setProductos(productos.filter((_, i) => i !== index));
    }
  };

  const actualizarProducto = (index: number, field: 'nombre' | 'precio', value: string) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][field] = value;
    setProductos(nuevosProductos);
  };

  const handleSubmit = (formData: FormData) => {
    // Convertir productos a JSON
    const productosValidos = productos
      .filter(p => p.nombre.trim() && p.precio.trim())
      .map(p => ({
        nombre: p.nombre,
        precio: parseFloat(p.precio)
      }));

    formData.set('productos', JSON.stringify(productosValidos));
    return formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Cliente */}
        <div className="mb-4">
          <label htmlFor="clienteId" className="mb-2 block text-sm font-medium">
            Seleccionar Cliente
          </label>
          <div className="relative">
            <select
              id="clienteId"
              name="clienteId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} ({cliente.correo})
                </option>
              ))}
            </select>
            <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Productos */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium">Productos</label>
            <button
              type="button"
              onClick={agregarProducto}
              className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-500"
            >
              <PlusIcon className="h-4 w-4" />
              Agregar Producto
            </button>
          </div>

          {productos.map((producto, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={producto.nombre}
                onChange={(e) => actualizarProducto(index, 'nombre', e.target.value)}
                className="flex-1 rounded-md border border-gray-200 py-2 px-3 text-sm"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio"
                value={producto.precio}
                onChange={(e) => actualizarProducto(index, 'precio', e.target.value)}
                className="w-32 rounded-md border border-gray-200 py-2 px-3 text-sm"
                required
              />
              {productos.length > 1 && (
                <button
                  type="button"
                  onClick={() => eliminarProducto(index)}
                  className="rounded-md bg-red-500 px-3 text-white hover:bg-red-400"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          <p className="mt-2 text-xs text-gray-500">
            El total se calculará automáticamente con IVA del 12%
          </p>
        </div>

        {/* Error Message */}
        {state?.error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">
            {state.error}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pedidos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Pedido</Button>
      </div>
    </form>
  );
}
