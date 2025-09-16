// frontend/src/app/(app)/layout.tsx
import { supabaseServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import '../globals.css';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');
  return <>{children}</>;
}
