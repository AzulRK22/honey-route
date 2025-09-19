import HiveDetailClient from './HiveDetailClient';

export default function HiveDetailPage({ params }: { params: { apiaryId: string } }) {
  return <HiveDetailClient apiaryId={params.apiaryId} />;
}
