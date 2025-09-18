// frontend/src/app/(app)/alerts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertsClient from './AlertsClient';

export default function AlertsPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const authed = typeof window !== 'undefined' && localStorage.getItem('hr.authed') === '1';
    if (!authed) {
      router.replace('/login');
      return;
    }
    setAllowed(true);
  }, [router]);

  if (!allowed) return null;
  return <AlertsClient />;
}
