'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface StarFieldProps {
  currentPage?: number;
}

export function StarField({ currentPage = 0 }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const targetOpacityRef = useRef(1);

  useEffect(() => {
    targetOpacityRef.current = currentPage === 0 ? 1 : currentPage === 1 ? 0.3 : 0;
  }, [currentPage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let globalOpacity = 1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 6000);
      starsRef.current = [];
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = (time: number) => {
      globalOpacity += (targetOpacityRef.current - globalOpacity) * 0.05;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (globalOpacity > 0.01) {
        starsRef.current.forEach((star) => {
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
          const currentOpacity = (star.opacity + twinkle * 0.3) * globalOpacity;
          const currentSize = star.size + twinkle * 0.3;
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, Math.max(0.5, currentSize), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 254, 245, ${Math.max(0.05, currentOpacity)})`;
          ctx.fill();
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ background: 'transparent' }}
    />
  );
}
