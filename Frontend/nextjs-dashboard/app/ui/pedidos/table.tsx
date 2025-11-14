'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePedidoAction } from '@/app/lib/actions/pedidoActions';
import type { Pedido } from '@/app/lib/api/componenteA';

export default function PedidosTable({ pedidos }: { pedidos: Pedido[] }) {
  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      await deletePedidoAction(id);
    }
  };

  return (
    <>
      {/* Desktop version */}
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              ID
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Cliente ID
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Total
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Productos
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {pedidos.map((pedido) => (
            <tr
              key={pedido.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                {pedido.id}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {pedido.clienteId}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                Q{pedido.total.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {pedido.productos.length} productos
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/dashboard/pedidos/${pedido.id}/edit`}
                    className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(pedido.id)}
                    className="rounded-md border border-gray-300 p-2 hover:bg-red-100"
                  >
                    <TrashIcon className="w-5 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile version */}
      <div className="md:hidden">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="mb-2 w-full rounded-md bg-white p-4"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <p className="font-semibold">Pedido #{pedido.id}</p>
                </div>
                <p className="text-sm text-gray-500">Cliente ID: {pedido.clienteId}</p>
                <p className="text-sm font-medium">Q{pedido.total.toFixed(2)}</p>
                <p className="text-xs text-gray-400">{pedido.productos.length} productos</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/pedidos/${pedido.id}/edit`}
                  className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
                >
                  <PencilIcon className="w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(pedido.id)}
                  className="rounded-md border border-gray-300 p-2 hover:bg-red-100"
                >
                  <TrashIcon className="w-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
