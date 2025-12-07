//frontend/src/app/(app)/apiaries/[apiaryId]/page.tsx
import ApiaryDetailClient from './ApiaryDetailClient';

export default function ApiaryDetailPage({ params }: { params: { apiaryId: string } }) {
  const { apiaryId } = params;
  return <ApiaryDetailClient apiaryId={apiaryId} />;
}
