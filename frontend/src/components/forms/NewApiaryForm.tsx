'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/forms/Select';
import { useI18n } from '@/i18n/I18nProvider';

type HiveType = 'Langstroth' | 'Top-bar' | 'Warre';

type ApiaryLocal = {
  id: string;
  name: string;
  location?: string;
  createdAt: string; // ISO
};

type HiveLocal = {
  id: string;
  apiaryId: string;
  kind: HiveType;
  label: string;
  notes: string | null;
  createdAt: string; // ISO
};

export default function NewApiaryForm({ onDone }: { onDone?: () => void }) {
  const { t } = useI18n();
  const router = useRouter();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [hiveType, setHiveType] = useState<HiveType>('Langstroth');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);

    if (!name.trim()) {
      setErr(t('apiary.errors.nameReq'));
      return;
    }

    setLoading(true);
    try {
      // IDs básicos
      const apiaryId = `api_${Date.now()}`;
      const hiveId = `hive_${Date.now()}`;

      // Leer existentes de localStorage con tipos
      const storedApiaries = localStorage.getItem('apiaries');
      const apiaries: ApiaryLocal[] = storedApiaries
        ? (JSON.parse(storedApiaries) as ApiaryLocal[])
        : [];

      const storedHives = localStorage.getItem('hives');
      const hives: HiveLocal[] = storedHives ? (JSON.parse(storedHives) as HiveLocal[]) : [];

      // Agregar nuevo apiario
      apiaries.push({
        id: apiaryId,
        name: name.trim(),
        location: location.trim() || undefined,
        createdAt: new Date().toISOString(),
      });

      // Agregar hive inicial
      hives.push({
        id: hiveId,
        apiaryId,
        kind: hiveType,
        label: 'Hive 1',
        notes: null,
        createdAt: new Date().toISOString(),
      });

      // Guardar
      localStorage.setItem('apiaries', JSON.stringify(apiaries));
      localStorage.setItem('hives', JSON.stringify(hives));

      // Navegar (sin expresión con side-effects)
      if (onDone) {
        onDone();
      } else {
        router.replace('/hives');
      }
    } catch {
      setErr(t('common.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xs space-y-4">
      <div>
        <label className="mb-2 block text-sm text-neutral-400">{t('apiary.name')}</label>
        <Input
          placeholder={t('apiary.namePh')}
          value={name}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-neutral-400">{t('apiary.locationOpt')}</label>
        <Input
          placeholder={t('apiary.locationPh')}
          value={location}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setLocation(ev.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-neutral-400">{t('apiary.hiveType')}</label>
        <Select<HiveType>
          value={hiveType}
          onChange={(v) => setHiveType(v)}
          options={[
            { label: 'Langstroth', value: 'Langstroth' },
            { label: 'Top-bar', value: 'Top-bar' },
            { label: 'Warre', value: 'Warre' },
          ]}
        />
      </div>

      {err && <p className="text-sm text-red-400">{err}</p>}

      <Button type="submit" className="h-12 w-full rounded-2xl" disabled={loading}>
        {loading ? '...' : `+ ${t('apiary.createCta')}`}
      </Button>
    </form>
  );
}
