import Form from '@/app/ui/pedidos/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { getClientes } from '@/app/lib/api/componenteA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Pedido',
};

export default async function Page() {
  const clientes = await getClientes();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pedidos', href: '/dashboard/pedidos' },
          {
            label: 'Crear Pedido',
            href: '/dashboard/pedidos/create',
            active: true,
          },
        ]}
      />
      <Form clientes={clientes} />
    </main>
  );
}
