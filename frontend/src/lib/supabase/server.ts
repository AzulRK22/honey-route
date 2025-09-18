/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/lib/supabase/server.ts
// Stub en servidor para evitar lecturas de ENV y cookies.

type ServerQueryBuilder = {
  select: (
    _?: unknown,
    __?: unknown
  ) => ServerQueryBuilder & {
    single: () => Promise<{ data: any; error: null }>;
  };
  eq: (_: string, __: unknown) => ServerQueryBuilder;
};

function makeServerBuilder(): ServerQueryBuilder {
  return {
    select: () =>
      Object.assign(makeServerBuilder(), {
        single: async () => ({ data: null, error: null }),
      }),
    eq: () => makeServerBuilder(),
  };
}

export async function supabaseServer(): Promise<{
  auth: { getSession: () => Promise<{ data: { session: null } }> };
  from: (_: string) => ServerQueryBuilder;
}> {
  return {
    auth: { getSession: async () => ({ data: { session: null } }) },
    from: () => makeServerBuilder(),
  };
}
