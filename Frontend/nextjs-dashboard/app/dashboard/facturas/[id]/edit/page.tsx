import Form from '@/app/ui/facturas/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { getFacturaById, getProveedores } from '@/app/lib/api/componenteB';
import { getPedidos } from '@/app/lib/api/componenteA';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [factura, proveedores, pedidos] = await Promise.all([
    getFacturaById(parseInt(id)),
    getProveedores(),
    getPedidos(),
  ]);

  if (!factura) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Facturas', href: '/dashboard/facturas' },
          {
            label: 'Editar Factura',
            href: `/dashboard/facturas/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form factura={factura} proveedores={proveedores} pedidos={pedidos} />
    </main>
  );
}
