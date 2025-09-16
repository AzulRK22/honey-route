'use client';

import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nProvider';

export default function SettingsPage() {
  const { t } = useI18n();
  const router = useRouter();

  const signOut = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">{t('settings.title') ?? 'Settings'}</h1>

      <div className="mt-6 space-y-3">
        <Button className="w-full h-11 rounded-xl" onClick={signOut}>
          {t('settings.signOut') ?? 'Sign out'}
        </Button>
      </div>
    </main>
  );
}
