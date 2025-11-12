import { getProveedores } from '@/app/lib/api/componenteB';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proveedores',
};

export default async function ProveedoresPage() {
  const proveedores = await getProveedores();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Proveedores</h1>
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
                {proveedores.map((proveedor) => (
                  <tr
                    key={proveedor.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {proveedor.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {proveedor.nombre}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {proveedor.correo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile version */}
            <div className="md:hidden">
              {proveedores.map((proveedor) => (
                <div
                  key={proveedor.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p className="font-semibold">{proveedor.nombre}</p>
                      </div>
                      <p className="text-sm text-gray-500">{proveedor.correo}</p>
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
