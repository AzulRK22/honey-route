import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';

export default async function RootGate() {
  const supabase = await supabaseServer(); // 👈 AWAIT

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/onboarding');

  const { count, error } = await supabase
    .from('apiaries')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', session.user.id);

  if (error) redirect('/apiaries/new');
  if (!count || count === 0) redirect('/apiaries/new');

  redirect('/hives');
}
