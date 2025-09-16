import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
if (!url || !anon) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * Cliente SSR de SOLO LECTURA:
 * - Lee cookies (get)
 * - NO escribe cookies (set/remove son NO-OP) para evitar el error de Next:
 *   "Cookies can only be modified in a Server Action or Route Handler"
 */
export async function supabaseServer() {
  // En tu set-up, cookies() puede ser Promise<ReadonlyRequestCookies>
  const store = await cookies();

  return createServerClient(url, anon, {
    cookies: {
      get(name: string): string | undefined {
        return store.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions): void {
        // NO-OP para evitar modificación de cookies fuera de Server Action/Route Handler
        void name;
        void value;
        void options;
      },
      remove(name: string, options: CookieOptions): void {
        // NO-OP idem
        void name;
        void options;
      },
    },
  });
}
