'use client';

import { useMemo, useState } from 'react';
import CardShell from '@/components/shell/CardShell';
import BrandMark from '@/components/BrandMark';
import LangToggle from '@/components/LangToggle';
import NavTab from '@/components/NavTab';
import { useI18n } from '@/i18n/I18nProvider';

type Center = { lat: number; lon: number };

export default function MapClient() {
  const { t } = useI18n();

  // centro por defecto: Brasília, BR
  const [center, setCenter] = useState<Center>({ lat: -15.793889, lon: -47.882778 });
  // "delta" para tamaño del bbox; menor => más zoom
  const [delta, setDelta] = useState<number>(0.08);
  // genera la URL de OSM embed según centro/delta (sin dependencias externas)
  const osmUrl = useMemo(() => {
    const minLon = center.lon - delta;
    const minLat = center.lat - delta;
    const maxLon = center.lon + delta;
    const maxLat = center.lat + delta;
    const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
    const marker = `${center.lat},${center.lon}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
  }, [center, delta]);

  const locateMe = () => {
    if (!('geolocation' in navigator)) return alert(t('map.noGeo') || 'Geolocation unavailable');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setDelta(0.025);
      },
      () => alert(t('map.geoDenied') || 'Permission denied'),
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 10_000 }
    );
  };

  const zoomIn = () => setDelta((d) => Math.max(0.005, d / 1.6));
  const zoomOut = () => setDelta((d) => Math.min(1.2, d * 1.6));

  return (
    <CardShell
      headerLeft={<BrandMark />}
      headerRight={<LangToggle />}
      contentClassName="pb-24 pt-2"
      footer={<NavTab active="map" />}
    >
      <h1 className="sr-only">{t('map.title') ?? 'Map'}</h1>

      {/* search pill */}
      <div className="mb-3">
        <label className="block">
          <input
            type="search"
            placeholder={t('map.searchPh') ?? 'Search hives or locations'}
            className="w-full rounded-full bg-neutral-900 px-4 py-3 text-sm placeholder:text-neutral-500 ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-amber-400"
            // TODO: hookear a búsqueda real
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // placeholder
              }
            }}
          />
        </label>
      </div>

      {/* mapa embebido + UI de controles flotantes */}
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl ring-1 ring-black/5">
        <iframe
          key={osmUrl}
          src={osmUrl}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Map"
        />
        {/* controles de zoom */}
        <div className="absolute right-3 bottom-20 grid overflow-hidden rounded-xl bg-white/90 text-black shadow">
          <button onClick={zoomIn} className="px-3 py-2 font-semibold hover:bg-black/5">
            +
          </button>
          <div className="h-px bg-black/10" />
          <button onClick={zoomOut} className="px-3 py-2 font-semibold hover:bg-black/5">
            −
          </button>
        </div>
        {/* localizar */}
        <button
          onClick={locateMe}
          className="absolute right-3 bottom-3 rounded-full bg-amber-400 px-4 py-3 font-semibold text-black shadow-lg hover:bg-amber-300"
        >
          {t('map.locate') ?? 'Locate me'}
        </button>
      </div>

      {/* nota inferior */}
      <p className="mt-3 text-center text-xs text-neutral-400">
        {t('map.comingSoon') ?? 'Floral maps & risk zones coming in next versions'}
      </p>
    </CardShell>
  );
}
