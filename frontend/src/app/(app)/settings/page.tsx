import { supabaseBrowser } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Settings</h1>
      <p>Idioma EN/ES (próximo)</p>
      <button
        onClick={async () => {
          await supabaseBrowser().auth.signOut();
          router.replace('/login');
        }}
        className="text-red-400 underline-offset-4 hover:underline"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
