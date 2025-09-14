'use client';
import { useI18n } from '@/i18n/I18nProvider';

export default function LangToggle() {
  const { locale, setLocale } = useI18n();
  const toggle = () => setLocale(locale === 'en' ? 'es' : 'en');

  return (
    <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-300 select-none">
      <span className={locale === 'en' ? 'text-white' : ''}>EN</span>
      <button
        aria-label="toggle language"
        onClick={toggle}
        className="relative h-5 w-10 rounded-full bg-neutral-700 ring-1 ring-white/10 outline-none"
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
            locale === 'en' ? 'left-0.5' : 'left-5'
          }`}
        />
      </button>
      <span className={locale === 'es' ? 'text-white' : ''}>ES</span>
    </div>
  );
}
