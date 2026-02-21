'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-300';
    
    const variants = {
      primary: 'bg-gradient-to-r from-river-teal to-celestial-blue text-midnight-blue hover:scale-105 hover:shadow-lg hover:shadow-celestial-blue/20',
      secondary: 'glass text-soft-cream hover:scale-105 hover:bg-dark-indigo/80',
      ghost: 'text-silver-mist hover:text-soft-cream',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
