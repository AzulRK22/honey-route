// Server Component (NO 'use client')
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-2xl font-extrabold">Not found</h1>
      <p className="mt-2 text-neutral-400">La página que buscas no existe.</p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-xl bg-amber-400 px-4 py-2 font-semibold text-black"
      >
        Ir al inicio
      </Link>
    </main>
  );
}
