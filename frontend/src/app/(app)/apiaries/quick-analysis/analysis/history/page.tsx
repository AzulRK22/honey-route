//frontend/src/app/(app)/apiaries/quick-analysis/analysis/history/page.tsx
import HistoryClient from './HistoryClient';
import { listHistoryMock } from '@/data/history.mock';

export default async function HistoryPage({
  searchParams,
}: {
  searchParams?: { hiveId?: string };
}) {
  const hiveId = searchParams?.hiveId ?? null;
  const { kpis, entries, hiveName } = await listHistoryMock('demo-user', hiveId);

  return <HistoryClient kpis={kpis} entries={entries} hiveName={hiveName ?? undefined} />;
}
