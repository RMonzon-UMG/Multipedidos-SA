import { getClientes } from '@/app/lib/api/componenteA';
import { Metadata } from 'next';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Clientes',
};

export default async function ClientesPage() {
  const clientes = await getClientes();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <Link
          href="/dashboard/clientes/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Crear Cliente</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
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
                    Nombre
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Correo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {clientes.map((cliente, index) => (
                  <tr
                    key={cliente.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {cliente.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {cliente.nombre}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {cliente.correo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile version */}
            <div className="md:hidden">
              {clientes.map((cliente) => (
                <div
                  key={cliente.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p className="font-semibold">{cliente.nombre}</p>
                      </div>
                      <p className="text-sm text-gray-500">{cliente.correo}</p>
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
