import { getPedidos, getClientes } from '@/app/lib/api/componenteA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedidos',
};

export default async function PedidosPage() {
  const pedidos = await getPedidos();
  const clientes = await getClientes();

  // Crear un mapa de clientes para acceso rápido
  const clienteMap = new Map(clientes.map(c => [c.id, c.nombre]));

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Pedidos</h1>
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Cliente
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Productos
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total
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
                      {clienteMap.get(pedido.clienteId) || `Cliente #${pedido.clienteId}`}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col gap-1">
                        {pedido.productos.map((producto, idx) => (
                          <span key={idx} className="text-xs">
                            {producto.nombre} - ${producto.precio.toFixed(2)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-semibold">
                      ${pedido.total.toFixed(2)}
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
                      <p className="text-sm text-gray-500">
                        Cliente: {clienteMap.get(pedido.clienteId) || `#${pedido.clienteId}`}
                      </p>
                      <div className="mt-2">
                        {pedido.productos.map((producto, idx) => (
                          <p key={idx} className="text-xs text-gray-600">
                            {producto.nombre} - ${producto.precio.toFixed(2)}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="font-semibold text-green-600">
                      ${pedido.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
