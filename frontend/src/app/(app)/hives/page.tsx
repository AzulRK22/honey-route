import HivesClient from './HivesClient';
import { getMockApiaries } from './mock';

// Server Component simple: sin Supabase, sólo mocks.
export default function HivesPage() {
  const cards = getMockApiaries();
  return <HivesClient cards={cards} />;
}
