'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ContinuousSkyProps {
  currentPage: number;
  totalPages: number;
}

export function ContinuousSky({ currentPage, totalPages }: ContinuousSkyProps) {
  const skyRef = useRef<HTMLDivElement>(null);
  const sunMoonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skyRef.current) return;
    
    const targetY = -(currentPage * 100 / totalPages);
    
    gsap.to(skyRef.current, {
      yPercent: targetY,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    if (sunMoonRef.current) {
      gsap.to(sunMoonRef.current, {
        yPercent: targetY,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <div 
        ref={skyRef}
        className="fixed top-0 left-0 w-full pointer-events-none z-0"
        style={{ height: `${totalPages * 100}vh` }}
      >
        <div 
          className="absolute w-full"
          style={{ 
            height: '100vh',
            top: '0vh',
            background: `linear-gradient(to bottom,
              #050510 0%,
              #0a0a18 10%,
              #0f1123 25%,
              #151933 50%,
              #1a1d40 75%,
              #1f2347 90%,
              #252850 100%
            )`,
          }}
        />
        
        <div 
          className="absolute w-full"
          style={{ 
            height: '100vh',
            top: '100vh',
            background: `linear-gradient(to bottom,
              #252850 0%,
              #2d1f4a 10%,
              #4a2c5a 25%,
              #6d3d5d 40%,
              #9d5560 55%,
              #c76a5e 70%,
              #e8956a 85%,
              #f4b87a 100%
            )`,
          }}
        />
        
        <div 
          className="absolute w-full"
          style={{ 
            height: '100vh',
            top: '200vh',
            background: `linear-gradient(to bottom,
              #f4b87a 0%,
              #f8cb8a 10%,
              #fde4b0 25%,
              #e8f0f5 40%,
              #c8e6f5 55%,
              #a8dcf5 70%,
              #87ceeb 85%,
              #6bc0e8 100%
            )`,
          }}
        />
        
        <div 
          className="absolute w-full"
          style={{ 
            height: '100vh',
            top: '300vh',
            background: `linear-gradient(to bottom,
              #6bc0e8 0%,
              #5bb0dc 15%,
              #4a9fd0 30%,
              #4090c5 50%,
              #5098c8 70%,
              #60a0cb 85%,
              #70a8ce 100%
            )`,
          }}
        />
        
        <div 
          className="absolute w-full"
          style={{ 
            height: '100vh',
            top: '400vh',
            background: `linear-gradient(to bottom,
              #70a8ce 0%,
              #8090a0 10%,
              #906878 20%,
              #a05060 30%,
              #c06050 45%,
              #e08040 60%,
              #f0a030 75%,
              #ffc020 90%,
              #ffd060 100%
            )`,
          }}
        />
      </div>

      <div
        ref={sunMoonRef}
        className="fixed top-0 left-0 w-full pointer-events-none z-[1]"
        style={{ height: `${totalPages * 100}vh` }}
      >
        <div 
          className="absolute right-[10%] md:right-[15%]"
          style={{ 
            top: '15vh',
            width: 'clamp(80px, 15vw, 160px)',
            height: 'clamp(80px, 15vw, 160px)',
          }}
        >
          <div 
            className="w-full h-full rounded-full animate-pulse-glow"
            style={{
              background: `radial-gradient(circle at 30% 30%, 
                #FFFEF5 0%, 
                #E8E4D9 40%, 
                #C4C4D4 70%,
                #9B8DC7 100%
              )`,
              boxShadow: '0 0 60px 30px rgba(255, 254, 245, 0.2)',
            }}
          />
        </div>

        <div 
          className="absolute"
          style={{ 
            right: 'clamp(-60px, -10vw, -100px)',
            top: '125vh',
            width: 'clamp(120px, 20vw, 200px)',
            height: 'clamp(120px, 20vw, 200px)',
          }}
        >
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle at 25% 50%, 
                rgba(255, 200, 100, 0.3) 0%, 
                rgba(255, 150, 80, 0.15) 50%,
                transparent 70%
              )`,
              transform: 'scale(2.5)',
              filter: 'blur(20px)',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 25% 50%, 
                rgba(255, 180, 100, 0.4) 0%, 
                rgba(255, 140, 80, 0.2) 40%,
                transparent 60%
              )`,
              transform: 'scale(1.8)',
              filter: 'blur(15px)',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 50%, 
                #FFF8E0 0%,
                #FFE4A0 15%,
                #FFD070 30%,
                #FFAA40 50%,
                #FF8030 70%,
                rgba(255, 100, 50, 0.6) 85%,
                transparent 100%
              )`,
              boxShadow: `
                inset -8px 0 20px rgba(255, 200, 100, 0.5),
                -20px 0 40px rgba(255, 180, 100, 0.6),
                -40px 0 80px rgba(255, 150, 80, 0.4),
                -60px 0 120px rgba(255, 120, 60, 0.3)
              `,
            }}
          />
        </div>

        <div 
          className="absolute"
          style={{ 
            right: '6%',
            top: '210vh',
            width: 'clamp(80px, 16vw, 150px)',
            height: 'clamp(80px, 16vw, 150px)',
          }}
        >
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 250, 200, 0.25) 0%, 
                rgba(255, 230, 150, 0.1) 50%,
                transparent 70%
              )`,
              transform: 'scale(3)',
              filter: 'blur(25px)',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 250, 220, 0.4) 0%, 
                rgba(255, 240, 180, 0.2) 40%,
                transparent 60%
              )`,
              transform: 'scale(2)',
              filter: 'blur(15px)',
            }}
          />
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 40% 40%, 
                #FFFFF8 0%,
                #FFFDE8 20%,
                #FFF5C0 40%,
                #FFE890 60%,
                #FFD860 80%,
                rgba(255, 200, 80, 0.7) 100%
              )`,
              boxShadow: `
                inset -5px -5px 15px rgba(255, 220, 100, 0.4),
                0 0 30px rgba(255, 250, 200, 0.8),
                0 0 60px rgba(255, 240, 150, 0.5),
                0 0 100px rgba(255, 220, 100, 0.3)
              `,
            }}
          />
        </div>

        <div 
          className="absolute left-1/2 -translate-x-1/2"
          style={{ 
            top: '303vh',
            width: 'clamp(90px, 18vw, 170px)',
            height: 'clamp(90px, 18vw, 170px)',
          }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.2) 0%, 
                rgba(255, 255, 220, 0.08) 50%,
                transparent 70%
              )`,
              transform: 'scale(4)',
              filter: 'blur(30px)',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 255, 240, 0.35) 0%, 
                rgba(255, 255, 200, 0.15) 40%,
                transparent 60%
              )`,
              transform: 'scale(2.5)',
              filter: 'blur(20px)',
            }}
          />
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 45% 45%, 
                #FFFFFF 0%,
                #FFFEFA 25%,
                #FFFDE0 45%,
                #FFF8C0 65%,
                #FFEC90 85%,
                rgba(255, 230, 100, 0.8) 100%
              )`,
              boxShadow: `
                inset -4px -4px 12px rgba(255, 240, 150, 0.3),
                0 0 40px rgba(255, 255, 255, 0.9),
                0 0 80px rgba(255, 255, 220, 0.6),
                0 0 150px rgba(255, 250, 180, 0.4),
                0 0 250px rgba(255, 240, 150, 0.2)
              `,
            }}
          />
        </div>

        <div 
          className="absolute"
          style={{ 
            left: 'clamp(-80px, -14vw, -140px)',
            top: '440vh',
            width: 'clamp(160px, 28vw, 280px)',
            height: 'clamp(160px, 28vw, 280px)',
          }}
        >
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle at 75% 50%, 
                rgba(255, 150, 50, 0.25) 0%, 
                rgba(255, 100, 50, 0.1) 50%,
                transparent 70%
              )`,
              transform: 'scale(2.5)',
              filter: 'blur(25px)',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 75% 50%, 
                rgba(255, 180, 80, 0.4) 0%, 
                rgba(255, 130, 60, 0.2) 40%,
                transparent 60%
              )`,
              transform: 'scale(1.8)',
              filter: 'blur(15px)',
            }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 70% 50%, 
                #FFEECC 0%,
                #FFD890 15%,
                #FFC050 30%,
                #FF9030 50%,
                #FF6020 70%,
                rgba(255, 60, 30, 0.6) 85%,
                transparent 100%
              )`,
              boxShadow: `
                inset 10px 0 25px rgba(255, 200, 100, 0.5),
                30px 0 50px rgba(255, 150, 80, 0.6),
                60px 0 100px rgba(255, 120, 60, 0.4),
                100px 0 180px rgba(255, 80, 40, 0.3)
              `,
            }}
          />
        </div>
      </div>
    </>
  );
}
