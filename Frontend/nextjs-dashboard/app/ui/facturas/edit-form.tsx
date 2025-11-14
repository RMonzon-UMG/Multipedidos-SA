'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateFacturaAction } from '@/app/lib/actions/facturaActions';
import { useActionState, useState } from 'react';
import { TruckIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Proveedor, Factura } from '@/app/lib/api/componenteB';
import type { Pedido } from '@/app/lib/api/componenteA';

export default function EditForm({
  factura,
  proveedores,
  pedidos
}: {
  factura: Factura;
  proveedores: Proveedor[];
  pedidos: Pedido[];
}) {
  const initialState = { error: '' };
  const updateFacturaWithId = updateFacturaAction.bind(null, factura.id);
  const [state, formAction] = useActionState(updateFacturaWithId, initialState);

  const [pedidosSeleccionados, setPedidosSeleccionados] = useState(
    factura.pedidos.map(p => ({
      pedidoId: p.pedidoId.toString(),
      total: p.total.toString()
    }))
  );

  const agregarPedido = () => {
    setPedidosSeleccionados([...pedidosSeleccionados, { pedidoId: '', total: '' }]);
  };

  const eliminarPedido = (index: number) => {
    if (pedidosSeleccionados.length > 1) {
      setPedidosSeleccionados(pedidosSeleccionados.filter((_, i) => i !== index));
    }
  };

  const actualizarPedido = (index: number, pedidoId: string) => {
    const pedido = pedidos.find(p => p.id.toString() === pedidoId);
    const nuevos = [...pedidosSeleccionados];
    nuevos[index] = {
      pedidoId: pedidoId,
      total: pedido ? pedido.total.toString() : ''
    };
    setPedidosSeleccionados(nuevos);
  };

  const handleSubmit = (formData: FormData) => {
    // Convertir pedidos a JSON
    const pedidosValidos = pedidosSeleccionados
      .filter(p => p.pedidoId.trim() && p.total.trim())
      .map(p => ({
        pedidoId: parseInt(p.pedidoId),
        total: parseFloat(p.total)
      }));

    formData.set('pedidos', JSON.stringify(pedidosValidos));
    return formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Proveedor */}
        <div className="mb-4">
          <label htmlFor="proveedorId" className="mb-2 block text-sm font-medium">
            Seleccionar Proveedor
          </label>
          <div className="relative">
            <select
              id="proveedorId"
              name="proveedorId"
              defaultValue={factura.proveedorId}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            >
              <option value="">Seleccione un proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre} ({proveedor.correo})
                </option>
              ))}
            </select>
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Pedidos */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium">Pedidos Referenciados</label>
            <button
              type="button"
              onClick={agregarPedido}
              className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-500"
            >
              <PlusIcon className="h-4 w-4" />
              Agregar Pedido
            </button>
          </div>

          {pedidosSeleccionados.map((pedidoSel, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <select
                value={pedidoSel.pedidoId}
                onChange={(e) => actualizarPedido(index, e.target.value)}
                className="flex-1 rounded-md border border-gray-200 py-2 px-3 text-sm"
                required
              >
                <option value="">Seleccione un pedido</option>
                {pedidos.map((pedido) => (
                  <option key={pedido.id} value={pedido.id}>
                    Pedido #{pedido.id} - Q{pedido.total.toFixed(2)}
                  </option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                placeholder="Total"
                value={pedidoSel.total}
                readOnly
                className="w-32 rounded-md border border-gray-200 bg-gray-100 py-2 px-3 text-sm"
              />
              {pedidosSeleccionados.length > 1 && (
                <button
                  type="button"
                  onClick={() => eliminarPedido(index)}
                  className="rounded-md bg-red-500 px-3 text-white hover:bg-red-400"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          <p className="mt-2 text-xs text-gray-500">
            El total de la factura se calculará sumando los pedidos seleccionados
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
          href="/dashboard/facturas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Actualizar Factura</Button>
      </div>
    </form>
  );
}
