import { cn } from '../../lib/cn';

export default function Badge({
  className,
  icon,
  children,
}: {
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-neutral-900/60 text-honey-400',
        'px-3 py-1 text-sm backdrop-blur ring-1 ring-white/10',
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
