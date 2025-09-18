// frontend/src/data/apiaries.client.ts
export interface ApiaryInput {
  name: string;
  location?: string | null;
}

export interface ApiaryRecord extends ApiaryInput {
  id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Crea un apiario en localStorage (flujo local, sin Supabase)
 */
export async function createApiary(input: ApiaryInput): Promise<ApiaryRecord> {
  const now = new Date().toISOString();
  const rec: ApiaryRecord = {
    id: `apiary-${Date.now()}`,
    owner_id: 'local-user',
    name: input.name,
    location: input.location ?? null,
    created_at: now,
    updated_at: now,
  };

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('apiaries');
      const arr: ApiaryRecord[] = raw ? JSON.parse(raw) : [];
      arr.push(rec);
      localStorage.setItem('apiaries', JSON.stringify(arr));
    } catch {
      // noop
    }
  }

  return rec;
}
