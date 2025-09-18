// frontend/src/data/hives.ts
export type HiveKind = 'Langstroth' | 'Top-bar' | 'Warre' | 'Flow' | 'Other';

export interface Hive {
  id: string;
  apiaryId: string;
  kind: HiveKind;
  label: string;
  notes?: string | null;
  lat: number;
  lng: number;
}

// Coordenadas base: Brasilia (match con alerts/mock)
const BR = { lat: -15.793889, lng: -47.882778 };

/**
 * Hives mock para un apiario (4 colmenas que ya usas en Alerts/Map)
 */
export function listHivesForApiary(apiaryId: string): Hive[] {
  return [
    {
      id: 'hive-1',
      apiaryId,
      kind: 'Langstroth',
      label: 'Hive 1',
      notes: null,
      lat: BR.lat + 0.01,
      lng: BR.lng - 0.01,
    },
    {
      id: 'hive-2',
      apiaryId,
      kind: 'Langstroth',
      label: 'Hive 2',
      notes: null,
      lat: BR.lat - 0.008,
      lng: BR.lng + 0.014,
    },
    {
      id: 'hive-3',
      apiaryId,
      kind: 'Warre',
      label: 'Hive 3',
      notes: null,
      lat: BR.lat - 0.02,
      lng: BR.lng - 0.012,
    },
    {
      id: 'hive-4',
      apiaryId,
      kind: 'Top-bar',
      label: 'Hive 4',
      notes: null,
      lat: BR.lat + 0.016,
      lng: BR.lng + 0.006,
    },
  ];
}

/**
 * Crear hive en localStorage (si lo necesitas desde algún form)
 */
export async function createHive(input: {
  apiary_id: string;
  kind: HiveKind;
  label?: string;
  notes?: string | null;
}): Promise<{ id: string }> {
  const id = `hive-${Date.now()}`;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('hives');
      const arr: Hive[] = raw ? JSON.parse(raw) : [];
      arr.push({
        id,
        apiaryId: input.apiary_id,
        kind: input.kind,
        label: input.label ?? 'Hive',
        notes: input.notes ?? null,
        lat: BR.lat,
        lng: BR.lng,
      });
      localStorage.setItem('hives', JSON.stringify(arr));
    } catch {
      // noop
    }
  }
  return { id };
}
