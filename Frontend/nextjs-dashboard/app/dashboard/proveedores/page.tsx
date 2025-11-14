import { getProveedores } from '@/app/lib/api/componenteB';
import { Metadata } from 'next';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ProveedoresTable from '@/app/ui/proveedores/table';

export const metadata: Metadata = {
  title: 'Proveedores',
};

export default async function ProveedoresPage() {
  const proveedores = await getProveedores();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Proveedores</h1>
        <Link
          href="/dashboard/proveedores/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Crear Proveedor</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <ProveedoresTable proveedores={proveedores} />
          </div>
        </div>
      </div>
    </div>
  );
}
