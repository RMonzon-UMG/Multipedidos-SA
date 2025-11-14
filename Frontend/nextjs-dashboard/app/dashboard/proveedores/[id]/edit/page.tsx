import Form from '@/app/ui/proveedores/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { getProveedorById } from '@/app/lib/api/componenteB';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const proveedor = await getProveedorById(parseInt(id));

  if (!proveedor) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Proveedores', href: '/dashboard/proveedores' },
          {
            label: 'Editar Proveedor',
            href: `/dashboard/proveedores/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form proveedor={proveedor} />
    </main>
  );
}
