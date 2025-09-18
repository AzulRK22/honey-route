/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/lib/supabase/client.ts
// Stub sin dependencias ni variables de entorno. No falla en build si queda algún import.

type AuthApi = {
  signOut: () => Promise<{ error: null }>;
  signInWithPassword: (_: unknown) => Promise<{ data: null; error: Error }>;
  getUser: () => Promise<{ data: { user: null }; error: null }>;
};

type QueryBuilder = {
  // Soporta select('id', { count: 'exact', head: true }).eq(...).single()
  select: (
    _?: unknown,
    __?: unknown
  ) => QueryBuilder & {
    single: () => Promise<{ data: any; error: null }>;
  };
  eq: (_: string, __: unknown) => QueryBuilder;
  // Soporta insert(...).select()
  insert: (_: unknown) => {
    select: (_?: unknown) => Promise<{ data: any; error: null }>;
  };
};

function makeBuilder(): QueryBuilder {
  return {
    select: () =>
      Object.assign(makeBuilder(), {
        single: async () => ({ data: null, error: null }),
      }),
    eq: () => makeBuilder(),
    insert: () => ({
      select: async () => ({ data: null, error: null }),
    }),
  };
}

export function supabaseBrowser(): {
  auth: AuthApi;
  from: (_: string) => QueryBuilder;
} {
  return {
    auth: {
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({
        data: null,
        error: new Error('Supabase deshabilitado (flujo local)'),
      }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => makeBuilder(),
  };
}
