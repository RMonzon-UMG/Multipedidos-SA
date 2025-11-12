'use client';

import Link from 'next/link';
import { UserCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createClienteAction } from '@/app/lib/actions/clienteActions';
import { useActionState } from 'react';

export default function Form() {
  const initialState = { error: '' };
  const [state, formAction] = useActionState(createClienteAction, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
            Nombre del Cliente
          </label>
          <div className="relative">
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ingrese el nombre completo"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label htmlFor="correo" className="mb-2 block text-sm font-medium">
            Correo Electrónico
          </label>
          <div className="relative">
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="ejemplo@email.com"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Error Message */}
        {state?.error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">
            {state.error}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/clientes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Cliente</Button>
      </div>
    </form>
  );
}
