// frontend/src/app/(app)/settings/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import CardShell from '@/components/shell/CardShell';
import BrandMark from '@/components/BrandMark';
import LangToggle from '@/components/LangToggle';
import NavTab from '@/components/NavTab';
import BackBtn from '@/components/BackBtn';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nProvider';

type Profile = {
  name: string;
  email: string;
  org: string;
  role: string;
};

function loadProfile(): Profile {
  if (typeof window === 'undefined') {
    return {
      name: '',
      email: '',
      org: '',
      role: '',
    };
  }
  try {
    const raw = localStorage.getItem('hr.profile');
    if (!raw) {
      return {
        name: '',
        email: '',
        org: '',
        role: '',
      };
    }
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      name: parsed.name ?? '',
      email: parsed.email ?? '',
      org: parsed.org ?? '',
      role: parsed.role ?? '',
    };
  } catch {
    return {
      name: '',
      email: '',
      org: '',
      role: '',
    };
  }
}

export default function ProfilePage() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile>(() => loadProfile());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setProfile(loadProfile());
  }, []);

  const onChange = (field: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      localStorage.setItem('hr.profile', JSON.stringify(profile));
      setSaved(true);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <CardShell
      headerLeft={
        <div className="flex items-center gap-2">
          <BackBtn />
          <BrandMark />
        </div>
      }
      headerRight={<LangToggle />}
      contentClassName="pb-24 pt-2"
      footer={<NavTab active="settings" />}
    >
      <h1 className="text-[26px] font-extrabold tracking-tight">
        {t('settings.profileTitle') || 'Profile'}
      </h1>
      <p className="mt-1 text-sm text-neutral-400">
        {t('settings.profileSubtitle') ||
          'Update your basic information. This is stored locally for the demo.'}
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-4 max-w-sm">
        <div>
          <label className="mb-2 block text-sm text-neutral-400">
            {t('settings.profile.name') || 'Name'}
          </label>
          <Input
            value={profile.name}
            onChange={onChange('name')}
            placeholder={t('settings.profile.namePh') || 'e.g. Ana Martínez'}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">
            {t('settings.profile.email') || 'Email'}
          </label>
          <Input
            type="email"
            value={profile.email}
            onChange={onChange('email')}
            placeholder={t('settings.profile.emailPh') || 'you@example.com'}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">
            {t('settings.profile.org') || 'Organization'}
          </label>
          <Input
            value={profile.org}
            onChange={onChange('org')}
            placeholder={t('settings.profile.orgPh') || 'Cooperative / Farm / Apiary'}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">
            {t('settings.profile.role') || 'Role'}
          </label>
          <Input
            value={profile.role}
            onChange={onChange('role')}
            placeholder={t('settings.profile.rolePh') || 'Beekeeper, technician, etc.'}
          />
        </div>

        {saved && (
          <p className="text-sm text-emerald-400">
            {t('settings.profile.saved') || 'Saved locally.'}
          </p>
        )}

        <Button type="submit" className="h-11 w-full rounded-xl" disabled={saving}>
          {saving ? '...' : t('settings.profile.saveCta') || 'Save profile'}
        </Button>

        <p className="mt-2 text-xs text-neutral-500">
          {t('settings.profile.localNote') ||
            'For this demo, profile data is stored only in your browser.'}
        </p>
      </form>
    </CardShell>
  );
}
