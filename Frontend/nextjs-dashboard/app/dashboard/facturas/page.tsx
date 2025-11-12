import { getFacturas, getProveedores } from '@/app/lib/api/componenteB';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facturas',
};

export default async function FacturasPage() {
  const facturas = await getFacturas();
  const proveedores = await getProveedores();

  // Crear un mapa de proveedores para acceso rápido
  const proveedorMap = new Map(proveedores.map(p => [p.id, p.nombre]));

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Facturas</h1>
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
                    Proveedor
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Pedidos
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Factura
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {facturas.map((factura) => (
                  <tr
                    key={factura.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {factura.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {proveedorMap.get(factura.proveedorId) || `Proveedor #${factura.proveedorId}`}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col gap-1">
                        {factura.pedidos.map((pedido, idx) => (
                          <span key={idx} className="text-xs">
                            Pedido #{pedido.pedidoId} - ${pedido.total.toFixed(2)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-semibold text-green-600">
                      ${factura.totalFactura.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile version */}
            <div className="md:hidden">
              {facturas.map((factura) => (
                <div
                  key={factura.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p className="font-semibold">Factura #{factura.id}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Proveedor: {proveedorMap.get(factura.proveedorId) || `#${factura.proveedorId}`}
                      </p>
                      <div className="mt-2">
                        {factura.pedidos.map((pedido, idx) => (
                          <p key={idx} className="text-xs text-gray-600">
                            Pedido #{pedido.pedidoId} - ${pedido.total.toFixed(2)}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="font-semibold text-green-600">
                      ${factura.totalFactura.toFixed(2)}
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
