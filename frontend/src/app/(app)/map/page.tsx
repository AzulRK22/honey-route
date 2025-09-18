// frontend/src/app/(app)/map/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Evita SSR para Leaflet/react-leaflet
const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

export default function MapPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Auth local: si no hay sesión, mandamos a /login
    const authed = typeof window !== 'undefined' && localStorage.getItem('hr.authed') === '1';
    if (!authed) {
      router.replace('/login');
      return;
    }
    setAllowed(true);
  }, [router]);

  if (!allowed) return null; // evita parpadeo

  return <MapClient />;
}
