'use client';

import { cn } from '@/lib/utils';

interface MoonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Moon({ className, size = 'md' }: MoonProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 md:w-32 md:h-32',
    lg: 'w-32 h-32 md:w-40 md:h-40',
  };

  return (
    <div
      className={cn(
        'rounded-full animate-pulse-glow',
        sizeClasses[size],
        className
      )}
      style={{
        background: `radial-gradient(circle at 30% 30%, 
          #FFFEF5 0%, 
          #E8E4D9 40%, 
          #C4C4D4 70%,
          #9B8DC7 100%
        )`,
      }}
    />
  );
}
