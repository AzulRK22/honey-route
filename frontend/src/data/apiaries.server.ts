import { supabaseServer } from '@/lib/supabase/server';

export type ApiaryCard = {
  id: string;
  name: string;
  hiveCount: number;
  imageUrl: string;
  status: 'healthy' | 'attention' | 'critical';
};

type HiveId = { id: string };
type ApiaryWithHives = {
  id: string;
  name: string | null;
  location: string | null;
  hives: HiveId[] | null;
};

export async function listApiaryCards(userId: string): Promise<ApiaryCard[]> {
  const supabase = await supabaseServer(); // 👈 AWAIT

  const { data, error } = await supabase
    .from('apiaries')
    .select('id,name,location,hives(id)')
    .eq('owner_id', userId)
    .order('created_at', { ascending: true });

  if (error) return [];

  // PNG reales en /public/images/cards/
  const imgs = ['/images/apiary1.png', '/images/apiary2.png', '/images/apiary3.png'];

  const rows: ApiaryWithHives[] = data ?? [];
  return rows.map((a, i) => {
    const hiveCount = (a.hives ?? []).length;
    const status: ApiaryCard['status'] =
      hiveCount === 0 ? 'attention' : hiveCount >= 12 ? 'critical' : 'healthy';

    return {
      id: a.id,
      name: a.name ?? '—',
      hiveCount,
      imageUrl: imgs[i % imgs.length],
      status,
    };
  });
}
