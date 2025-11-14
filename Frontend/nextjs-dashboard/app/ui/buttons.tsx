import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UpdateButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({ id, onDelete }: { id: number; onDelete: (id: number) => void }) {
  return (
    <button
      onClick={() => {
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
          onDelete(id);
        }
      }}
      className="rounded-md border border-gray-300 p-2 hover:bg-red-100"
    >
      <TrashIcon className="w-5 text-red-600" />
    </button>
  );
}
