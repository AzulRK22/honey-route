import { supabaseBrowser } from '@/lib/supabase/client';

export interface ApiaryInput {
  name: string;
  location?: string;
}
export interface ApiaryRecord extends ApiaryInput {
  id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export async function createApiary(input: ApiaryInput): Promise<ApiaryRecord> {
  const supabase = supabaseBrowser();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('auth/no-session');

  const { data, error } = await supabase
    .from('apiaries')
    .insert([{ owner_id: user.id, name: input.name, location: input.location ?? null }])
    .select()
    .single();

  if (error) throw new Error('apiaries/insert-failed');
  return data as ApiaryRecord;
}
