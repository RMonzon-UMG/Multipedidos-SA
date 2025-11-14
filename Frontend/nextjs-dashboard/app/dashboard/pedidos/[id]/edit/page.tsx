import Form from '@/app/ui/pedidos/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { getPedidoById, getClientes } from '@/app/lib/api/componenteA';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [pedido, clientes] = await Promise.all([
    getPedidoById(parseInt(id)),
    getClientes(),
  ]);

  if (!pedido) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pedidos', href: '/dashboard/pedidos' },
          {
            label: 'Editar Pedido',
            href: `/dashboard/pedidos/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form pedido={pedido} clientes={clientes} />
    </main>
  );
}
