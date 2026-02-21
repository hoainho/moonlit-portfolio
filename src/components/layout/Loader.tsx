'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
}

export function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stars = useMemo<Star[]>(() => {
    if (!isMounted) return [];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      size: Math.random() * 3 + 1,
    }));
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              setIsVisible(false);
              onComplete();
            },
          });
        },
      });

      gsap.set(starsRef.current?.children || [], { opacity: 0, scale: 0 });
      gsap.set(moonRef.current, { opacity: 0, scale: 0.5, y: 50 });
      gsap.set(sunRef.current, { opacity: 0, scale: 0.3, y: 100 });
      gsap.set(textRef.current, { opacity: 0, y: 30 });
      gsap.set(cloudsRef.current?.children || [], { opacity: 0, x: -100 });

      tl.to(starsRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'back.out(2)',
      }, 0);

      tl.to(moonRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }, 0.1);

      tl.to(cloudsRef.current?.children || [], {
        opacity: 0.6,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0.2);

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.4);

      tl.to(skyRef.current, {
        background: `linear-gradient(to bottom,
          #4a2c5a 0%,
          #6d3d5d 20%,
          #9d5560 40%,
          #c76a5e 60%,
          #e8956a 80%,
          #f4b87a 100%
        )`,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0.6);

      tl.to(moonRef.current, {
        opacity: 0,
        y: -80,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.in',
      }, 0.6);

      tl.to(starsRef.current?.children || [], {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        stagger: 0.01,
        ease: 'power2.in',
      }, 0.6);

      tl.to(sunRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'back.out(1.2)',
      }, 0.9);

      tl.to(cloudsRef.current?.children || [], {
        opacity: 0.8,
        duration: 0.3,
      }, 1.0);

      tl.to(skyRef.current, {
        background: `linear-gradient(to bottom,
          #87ceeb 0%,
          #a8dcf5 30%,
          #c8e6f5 50%,
          #e8f0f5 70%,
          #fde4b0 90%,
          #f8cb8a 100%
        )`,
        duration: 0.6,
        ease: 'power2.inOut',
      }, 1.2);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [isMounted, onComplete]);

  if (!isVisible || !isMounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
      >
        <div
          ref={skyRef}
          className="absolute inset-0 transition-colors"
          style={{
            background: `linear-gradient(to bottom,
              #050510 0%,
              #0a0a18 20%,
              #0f1123 40%,
              #151933 60%,
              #1a1d40 80%,
              #1f2347 100%
            )`,
          }}
        />

        <div ref={starsRef} className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.5)`,
              }}
            />
          ))}
        </div>

        <div ref={cloudsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute"
            style={{ left: '5%', top: '60%', width: '200px', height: '80px' }}
            viewBox="0 0 200 80"
          >
            <ellipse cx="60" cy="50" rx="50" ry="25" fill="rgba(255,255,255,0.15)" />
            <ellipse cx="100" cy="40" rx="45" ry="28" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="140" cy="50" rx="40" ry="22" fill="rgba(255,255,255,0.15)" />
          </svg>
          <svg
            className="absolute"
            style={{ right: '10%', top: '70%', width: '180px', height: '70px' }}
            viewBox="0 0 180 70"
          >
            <ellipse cx="50" cy="40" rx="40" ry="20" fill="rgba(255,255,255,0.12)" />
            <ellipse cx="90" cy="35" rx="50" ry="25" fill="rgba(255,255,255,0.18)" />
            <ellipse cx="130" cy="42" rx="35" ry="18" fill="rgba(255,255,255,0.12)" />
          </svg>
          <svg
            className="absolute"
            style={{ left: '30%', top: '75%', width: '160px', height: '60px' }}
            viewBox="0 0 160 60"
          >
            <ellipse cx="40" cy="35" rx="35" ry="18" fill="rgba(255,255,255,0.1)" />
            <ellipse cx="80" cy="30" rx="45" ry="22" fill="rgba(255,255,255,0.15)" />
            <ellipse cx="120" cy="35" rx="30" ry="16" fill="rgba(255,255,255,0.1)" />
          </svg>
        </div>

        <div
          ref={moonRef}
          className="absolute"
          style={{
            top: '15%',
            right: '20%',
            width: 'clamp(80px, 15vw, 140px)',
            height: 'clamp(80px, 15vw, 140px)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 254, 245, 0.4) 0%, 
                rgba(255, 254, 245, 0.1) 50%,
                transparent 70%
              )`,
              transform: 'scale(2)',
              filter: 'blur(20px)',
            }}
          />
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, 
                #FFFEF5 0%, 
                #E8E4D9 40%, 
                #C4C4D4 70%,
                #9B8DC7 100%
              )`,
              boxShadow: `
                0 0 40px 15px rgba(255, 254, 245, 0.3),
                0 0 80px 30px rgba(255, 254, 245, 0.15)
              `,
            }}
          />
          <div
            className="absolute rounded-full bg-gray-300/20"
            style={{ top: '20%', left: '25%', width: '15%', height: '15%' }}
          />
          <div
            className="absolute rounded-full bg-gray-300/15"
            style={{ top: '50%', left: '55%', width: '20%', height: '20%' }}
          />
          <div
            className="absolute rounded-full bg-gray-300/10"
            style={{ top: '35%', left: '15%', width: '10%', height: '10%' }}
          />
        </div>

        <div
          ref={sunRef}
          className="absolute"
          style={{
            top: '20%',
            right: '15%',
            width: 'clamp(100px, 18vw, 180px)',
            height: 'clamp(100px, 18vw, 180px)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 200, 100, 0.4) 0%, 
                rgba(255, 150, 80, 0.15) 50%,
                transparent 70%
              )`,
              transform: 'scale(3)',
              filter: 'blur(30px)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 220, 150, 0.5) 0%, 
                rgba(255, 180, 100, 0.2) 40%,
                transparent 60%
              )`,
              transform: 'scale(2)',
              filter: 'blur(20px)',
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
                rgba(255, 200, 80, 0.9) 100%
              )`,
              boxShadow: `
                inset -5px -5px 20px rgba(255, 220, 100, 0.4),
                0 0 50px rgba(255, 250, 200, 0.9),
                0 0 100px rgba(255, 240, 150, 0.6),
                0 0 180px rgba(255, 220, 100, 0.4)
              `,
            }}
          />
        </div>

        <div
          ref={textRef}
          className="relative z-10 text-center"
        >
          <motion.div
            className="relative"
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 254, 245, 0.5)',
                '0 0 40px rgba(255, 254, 245, 0.8)',
                '0 0 20px rgba(255, 254, 245, 0.5)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <h1
              className="font-heading text-5xl md:text-7xl font-bold text-white mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 254, 245, 0.6)',
              }}
            >
              Bé Dương
            </h1>
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-white/80 font-light tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Where dreams take shape under the moonlight
          </motion.p>
          <motion.div
            className="mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/60"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(100, 150, 200, 0.3)" />
                <stop offset="100%" stopColor="rgba(50, 100, 150, 0.5)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 C1300,70 1400,50 1440,60 L1440,120 L0,120 Z"
              fill="url(#riverGradient)"
              animate={{
                d: [
                  'M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 C1300,70 1400,50 1440,60 L1440,120 L0,120 Z',
                  'M0,50 C200,70 400,50 600,70 C800,50 1000,70 1200,50 C1300,60 1400,40 1440,50 L1440,120 L0,120 Z',
                  'M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 C1300,70 1400,50 1440,60 L1440,120 L0,120 Z',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            }}
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
