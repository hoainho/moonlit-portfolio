'use client';

import { cn } from '@/lib/utils';

interface CloudProps {
  className?: string;
  variant?: 'night' | 'dawn' | 'day' | 'sunset';
  speed?: 'slow' | 'medium' | 'fast';
  baseOpacity?: number;
  id: string;
}

function Cloud({ className, variant = 'night', speed = 'medium', baseOpacity = 0.2, id }: CloudProps) {
  const gradientColors = {
    night: { center: '#E8E4D9', edge: '#9B8DC7' },
    dawn: { center: '#FFD4A8', edge: '#FF9966' },
    day: { center: '#FFFFFF', edge: '#E0F0FF' },
    sunset: { center: '#FFB366', edge: '#FF6B6B' },
  };

  const speedMap = {
    slow: '80s',
    medium: '50s',
    fast: '30s',
  };

  const colors = gradientColors[variant];
  const gradientId = `cloud-grad-${id}`;

  return (
    <svg
      className={cn('absolute', className)}
      viewBox="0 0 200 60"
      fill="none"
      style={{
        animation: `drift ${speedMap[speed]} linear infinite`,
        opacity: baseOpacity,
      }}
    >
      <ellipse cx="50" cy="40" rx="50" ry="20" fill={`url(#${gradientId})`} />
      <ellipse cx="90" cy="35" rx="40" ry="18" fill={`url(#${gradientId})`} />
      <ellipse cx="130" cy="40" rx="45" ry="20" fill={`url(#${gradientId})`} />
      <ellipse cx="70" cy="30" rx="35" ry="15" fill={`url(#${gradientId})`} />
      <ellipse cx="110" cy="28" rx="30" ry="14" fill={`url(#${gradientId})`} />
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.center} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.edge} stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

interface CloudsLayerProps {
  currentPage?: number;
}

export function CloudsLayer({ currentPage = 0 }: CloudsLayerProps) {
  const getVariant = (): 'night' | 'dawn' | 'day' | 'sunset' => {
    if (currentPage === 0) return 'night';
    if (currentPage === 1) return 'dawn';
    if (currentPage === 2 || currentPage === 3) return 'day';
    return 'sunset';
  };

  const getOpacity = () => {
    if (currentPage === 0) return 0.15;
    if (currentPage === 1) return 0.25;
    if (currentPage === 2 || currentPage === 3) return 0.4;
    return 0.35;
  };

  const variant = getVariant();
  const opacity = getOpacity();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3] transition-opacity duration-1000">
      <Cloud 
        id="c1"
        className="w-[350px] top-[15%] -left-[80px]" 
        variant={variant}
        speed="slow" 
        baseOpacity={opacity}
      />
      <Cloud 
        id="c2"
        className="w-[280px] top-[25%] left-[55%]" 
        variant={variant}
        speed="medium" 
        baseOpacity={opacity * 0.8}
      />
      <Cloud 
        id="c3"
        className="w-[320px] top-[55%] -left-[40px]" 
        variant={variant}
        speed="fast" 
        baseOpacity={opacity * 0.6}
      />
      <Cloud 
        id="c4"
        className="w-[260px] top-[65%] left-[65%]" 
        variant={variant}
        speed="slow" 
        baseOpacity={opacity * 0.7}
      />
      <Cloud 
        id="c5"
        className="w-[300px] top-[35%] left-[25%]" 
        variant={variant}
        speed="medium" 
        baseOpacity={opacity * 0.5}
      />
    </div>
  );
}
