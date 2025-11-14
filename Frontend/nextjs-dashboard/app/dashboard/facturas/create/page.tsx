import Form from '@/app/ui/facturas/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { getProveedores } from '@/app/lib/api/componenteB';
import { getPedidos } from '@/app/lib/api/componenteA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Factura',
};

export default async function Page() {
  const proveedores = await getProveedores();
  const pedidos = await getPedidos();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Facturas', href: '/dashboard/facturas' },
          {
            label: 'Crear Factura',
            href: '/dashboard/facturas/create',
            active: true,
          },
        ]}
      />
      <Form proveedores={proveedores} pedidos={pedidos} />
    </main>
  );
}
