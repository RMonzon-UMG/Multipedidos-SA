import Form from '@/app/ui/clientes/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Cliente',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/dashboard/clientes' },
          {
            label: 'Crear Cliente',
            href: '/dashboard/clientes/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
