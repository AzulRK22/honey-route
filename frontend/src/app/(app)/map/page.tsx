import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import MapClient from './MapClient';

export default async function MapPage() {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  return <MapClient />;
}
