import Form from '@/app/ui/clientes/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { getClienteById } from '@/app/lib/api/componenteA';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const cliente = await getClienteById(parseInt(id));

  if (!cliente) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/dashboard/clientes' },
          {
            label: 'Editar Cliente',
            href: `/dashboard/clientes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form cliente={cliente} />
    </main>
  );
}
