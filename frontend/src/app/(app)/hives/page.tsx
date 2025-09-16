import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import { listApiaryCards } from '@/data/apiaries.server';
import HivesClient from './HivesClient';

export default async function HivesPage() {
  const supabase = await supabaseServer(); // 👈 AWAIT

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const cards = await listApiaryCards(session.user.id);
  return <HivesClient cards={cards} />;
}
