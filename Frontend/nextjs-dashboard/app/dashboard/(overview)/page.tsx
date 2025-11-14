import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  getTotalClientes,
  getTotalPedidos,
  getTotalVentas,
  getUltimosPedidos,
  getClientes,
} from '@/app/lib/api/componenteA';
import {
  getTotalProveedores,
  getTotalFacturas,
  getTotalFacturacion,
  getUltimasFacturas,
  getProveedores,
} from '@/app/lib/api/componenteB';

export default async function Page() {
  // Obtener datos de Componente A (MariaDB)
  const totalClientes = await getTotalClientes();
  const totalPedidos = await getTotalPedidos();
  const totalVentas = await getTotalVentas();
  const ultimosPedidos = await getUltimosPedidos();
  const clientes = await getClientes();

  // Obtener datos de Componente B (PostgreSQL)
  const totalProveedores = await getTotalProveedores();
  const totalFacturas = await getTotalFacturas();
  const totalFacturacion = await getTotalFacturacion();
  const ultimasFacturas = await getUltimasFacturas();
  const proveedores = await getProveedores();

  // Crear mapas para lookup
  const clienteMap = new Map(clientes.map(c => [c.id, c.nombre]));
  const proveedorMap = new Map(proveedores.map(p => [p.id, p.nombre]));

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard MultiPedidos
      </h1>

      {/* Sección Componente A - MariaDB */}
      <div className="mb-8">
        <h2 className={`${lusitana.className} mb-4 text-lg md:text-xl text-blue-600`}>
          Componente A - Clientes y Pedidos (MariaDB)
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-6 shadow-sm border border-blue-200">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-blue-700">Total Clientes</h3>
            </div>
            <p className="text-3xl font-bold text-blue-900">{totalClientes}</p>
          </div>

          <div className="rounded-lg bg-green-50 p-6 shadow-sm border border-green-200">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-green-700">Total Pedidos</h3>
            </div>
            <p className="text-3xl font-bold text-green-900">{totalPedidos}</p>
          </div>

          <div className="rounded-lg bg-purple-50 p-6 shadow-sm border border-purple-200">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-purple-700">Total Ventas</h3>
            </div>
            <p className="text-3xl font-bold text-purple-900">Q{totalVentas.toFixed(2)}</p>
          </div>
        </div>

        {/* Últimos 5 pedidos */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Últimos 5 Pedidos</h3>
          <div className="space-y-2">
            {ultimosPedidos.map((pedido) => (
              <div key={pedido.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="text-sm font-medium">Pedido #{pedido.id}</p>
                  <p className="text-xs text-gray-500">
                    Cliente: {clienteMap.get(pedido.clienteId) || `#${pedido.clienteId}`}
                  </p>
                </div>
                <p className="text-sm font-semibold text-green-600">Q{pedido.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección Componente B - PostgreSQL */}
      <div>
        <h2 className={`${lusitana.className} mb-4 text-lg md:text-xl text-orange-600`}>
          Componente B - Proveedores y Facturas (PostgreSQL)
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-orange-50 p-6 shadow-sm border border-orange-200">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-orange-700">Total Proveedores</h3>
            </div>
            <p className="text-3xl font-bold text-orange-900">{totalProveedores}</p>
          </div>

          <div className="rounded-lg bg-teal-50 p-6 shadow-sm border border-teal-200">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-teal-700">Total Facturas</h3>
            </div>
            <p className="text-3xl font-bold text-teal-900">{totalFacturas}</p>
          </div>

          <div className="rounded-lg bg-indigo-50 p-6 shadow-sm border border-indigo-200">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-indigo-700">Total Facturación</h3>
            </div>
            <p className="text-3xl font-bold text-indigo-900">Q{totalFacturacion.toFixed(2)}</p>
          </div>
        </div>

        {/* Últimas 5 facturas */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Últimas 5 Facturas</h3>
          <div className="space-y-2">
            {ultimasFacturas.map((factura) => (
              <div key={factura.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="text-sm font-medium">Factura #{factura.id}</p>
                  <p className="text-xs text-gray-500">
                    Proveedor: {proveedorMap.get(factura.proveedorId) || `#${factura.proveedorId}`}
                  </p>
                </div>
                <p className="text-sm font-semibold text-green-600">Q{factura.totalFactura.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}