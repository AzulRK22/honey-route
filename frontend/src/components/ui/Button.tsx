import * as React from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'lg';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const stylesByVariant: Record<Variant, string> = {
  primary:
    'bg-amber-400 text-black hover:bg-amber-300 active:bg-amber-500 focus-visible:ring-2 ring-amber-500',
  ghost:
    'bg-transparent text-white hover:bg-white/10 active:bg-white/20 focus-visible:ring-2 ring-white/40',
};

const stylesBySize: Record<Size, string> = {
  md: 'h-11 px-4 rounded-xl text-base',
  lg: 'h-14 px-6 rounded-2xl text-lg',
};

const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', size = 'md', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors outline-none disabled:opacity-50 disabled:pointer-events-none',
        stylesByVariant[variant],
        stylesBySize[size],
        className
      )}
      {...props}
    />
  );
});

export default Button;
