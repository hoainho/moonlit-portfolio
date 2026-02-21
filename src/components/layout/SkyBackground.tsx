'use client';

type TimeOfDay = 'midnight' | 'dawn' | 'morning' | 'noon' | 'sunset';

interface SkyBackgroundProps {
  time: TimeOfDay;
  className?: string;
}

const skyGradients: Record<TimeOfDay, string> = {
  midnight: `
    linear-gradient(to bottom,
      #0a0a12 0%,
      #0f1123 20%,
      #151933 40%,
      #1a1d40 60%,
      #1f2347 80%,
      #252850 100%
    )
  `,
  dawn: `
    linear-gradient(to bottom,
      #1a1530 0%,
      #2d1f4a 15%,
      #4a2c5a 30%,
      #7d4466 45%,
      #c76a5e 60%,
      #e8956a 75%,
      #f4b87a 90%,
      #fcd9a8 100%
    )
  `,
  morning: `
    linear-gradient(to bottom,
      #87CEEB 0%,
      #98d4ee 20%,
      #b0e0f0 40%,
      #c8ebf5 60%,
      #e0f4fa 80%,
      #fff8e7 100%
    )
  `,
  noon: `
    linear-gradient(to bottom,
      #4a90c2 0%,
      #5ba3d4 20%,
      #6db6e6 40%,
      #87ceeb 60%,
      #a8dcf0 80%,
      #c9eaf5 100%
    )
  `,
  sunset: `
    linear-gradient(to bottom,
      #2d1b4e 0%,
      #4a2763 10%,
      #6b3a6d 20%,
      #a04e6d 35%,
      #d4735c 50%,
      #e89650 65%,
      #f4b848 80%,
      #fcd670 95%,
      #ffe4a0 100%
    )
  `,
};

export function SkyBackground({ time, className = '' }: SkyBackgroundProps) {
  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-1000 ${className}`}
      style={{ background: skyGradients[time] }}
    />
  );
}

export function MidnightAtmosphere() {
  return (
    <>
      <div 
        className="absolute inset-0"
        style={{ background: skyGradients.midnight }}
      />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(107, 127, 215, 0.15) 0%, transparent 50%)',
        }}
      />
    </>
  );
}

export function DawnAtmosphere() {
  return (
    <>
      <div 
        className="scene-bg absolute inset-0 opacity-0"
        style={{ background: skyGradients.dawn }}
      />
      <div 
        className="scene-bg absolute bottom-0 left-0 right-0 h-[70%] opacity-0"
        style={{
          background: `
            radial-gradient(ellipse 150% 60% at 50% 100%, rgba(252, 180, 100, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse 100% 40% at 50% 100%, rgba(255, 140, 80, 0.3) 0%, transparent 60%)
          `,
        }}
      />
      <div 
        className="scene-bg absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-32 blur-3xl opacity-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 180, 100, 0.5) 0%, transparent 70%)',
        }}
      />
      <div 
        className="scene-bg absolute bottom-[10%] left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-2xl opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 120, 0.8) 0%, rgba(255, 150, 80, 0.4) 50%, transparent 70%)',
        }}
      />
    </>
  );
}

export function MorningAtmosphere() {
  return (
    <>
      <div 
        className="scene-bg absolute inset-0 opacity-0"
        style={{ background: skyGradients.morning }}
      />
      <div 
        className="scene-bg absolute top-[10%] right-[15%] w-32 h-32 rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 220, 1) 0%, rgba(255, 240, 180, 0.8) 30%, rgba(255, 220, 130, 0.4) 60%, transparent 70%)',
          boxShadow: '0 0 60px 30px rgba(255, 240, 180, 0.3), 0 0 120px 60px rgba(255, 220, 130, 0.15)',
        }}
      />
      <div 
        className="scene-bg absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 220, 0.03) 100px,
              rgba(255, 255, 220, 0.03) 200px
            )
          `,
        }}
      />
      <div 
        className="scene-bg absolute top-[8%] right-[12%] w-[400px] h-[400px] opacity-0"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(255, 250, 220, 0.1) 20deg, transparent 40deg, transparent 360deg)',
          transform: 'rotate(-30deg)',
        }}
      />
    </>
  );
}

export function NoonAtmosphere() {
  return (
    <>
      <div 
        className="scene-bg absolute inset-0 opacity-0"
        style={{ background: skyGradients.noon }}
      />
      <div 
        className="scene-bg absolute top-[5%] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 240, 0.9) 40%, rgba(255, 255, 200, 0.5) 70%, transparent 100%)',
          boxShadow: '0 0 80px 40px rgba(255, 255, 255, 0.4), 0 0 160px 80px rgba(255, 255, 200, 0.2)',
        }}
      />
      <svg className="scene-bg absolute w-full h-full opacity-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="cloudGradientNoon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="70%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="20" cy="25" rx="12" ry="5" fill="url(#cloudGradientNoon)" />
        <ellipse cx="25" cy="23" rx="8" ry="4" fill="url(#cloudGradientNoon)" />
        <ellipse cx="15" cy="24" rx="7" ry="3.5" fill="url(#cloudGradientNoon)" />
        
        <ellipse cx="75" cy="35" rx="15" ry="6" fill="url(#cloudGradientNoon)" />
        <ellipse cx="82" cy="33" rx="10" ry="5" fill="url(#cloudGradientNoon)" />
        <ellipse cx="68" cy="34" rx="9" ry="4" fill="url(#cloudGradientNoon)" />
        
        <ellipse cx="50" cy="20" rx="10" ry="4" fill="url(#cloudGradientNoon)" />
        <ellipse cx="55" cy="18" rx="7" ry="3" fill="url(#cloudGradientNoon)" />
      </svg>
    </>
  );
}

export function SunsetAtmosphere() {
  return (
    <>
      <div 
        className="scene-bg absolute inset-0 opacity-0"
        style={{ background: skyGradients.sunset }}
      />
      <div 
        className="scene-bg absolute bottom-[15%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 100, 1) 0%, rgba(255, 150, 50, 0.9) 30%, rgba(255, 100, 50, 0.6) 60%, transparent 80%)',
          boxShadow: '0 0 100px 50px rgba(255, 150, 80, 0.5), 0 0 200px 100px rgba(255, 100, 50, 0.3)',
        }}
      />
      <div 
        className="scene-bg absolute bottom-0 left-0 right-0 h-[50%] opacity-0"
        style={{
          background: `
            linear-gradient(to top, 
              rgba(255, 100, 50, 0.2) 0%,
              rgba(255, 150, 80, 0.15) 30%,
              transparent 100%
            )
          `,
        }}
      />
      <div 
        className="scene-bg absolute inset-0 opacity-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%, rgba(255, 120, 50, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 90%, rgba(255, 80, 100, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 90%, rgba(255, 150, 50, 0.15) 0%, transparent 40%)
          `,
        }}
      />
      <svg className="scene-bg absolute w-full h-full opacity-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cloudGradientSunset" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff9966" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff6b6b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4a2763" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <ellipse cx="15" cy="40" rx="12" ry="4" fill="url(#cloudGradientSunset)" />
        <ellipse cx="22" cy="38" rx="8" ry="3" fill="url(#cloudGradientSunset)" />
        
        <ellipse cx="80" cy="45" rx="14" ry="5" fill="url(#cloudGradientSunset)" />
        <ellipse cx="72" cy="43" rx="9" ry="3.5" fill="url(#cloudGradientSunset)" />
        
        <ellipse cx="45" cy="35" rx="10" ry="3.5" fill="url(#cloudGradientSunset)" />
      </svg>
    </>
  );
}
