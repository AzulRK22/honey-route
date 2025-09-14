import { supabaseServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import '../globals.css';
import NavTab from '@/components/NavTab';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/login');
  return (
    <div className="min-h-dvh pb-20">
      {children}
      <NavTab />
    </div>
  );
}
