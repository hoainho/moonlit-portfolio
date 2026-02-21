'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Header } from '@/components/layout/Header';
import { ContinuousSky } from '@/components/layout/ContinuousSky';
import { StarField } from '@/components/layout/StarField';
import { CloudsLayer } from '@/components/layout/Clouds';
import { Loader } from '@/components/layout/Loader';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';

const SECTIONS = ['home', 'about', 'works', 'skills', 'contact'];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentPageRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const goToPage = useCallback((pageIndex: number) => {
    if (isAnimatingRef.current || pageIndex < 0 || pageIndex >= SECTIONS.length || pageIndex === currentPageRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setIsAnimating(true);
    
    const prevPage = currentPageRef.current;
    const direction = pageIndex > prevPage ? 1 : -1;
    
    currentPageRef.current = pageIndex;
    setCurrentPage(pageIndex);
    
    const currentPanel = document.querySelector(`#${SECTIONS[prevPage]}`) as HTMLElement;
    const nextPanel = document.querySelector(`#${SECTIONS[pageIndex]}`) as HTMLElement;
    
    if (!currentPanel || !nextPanel) {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      return;
    }

    const currentContent = currentPanel.querySelector('.scene-content, .hero-content');
    const nextContent = nextPanel.querySelector('.scene-content, .hero-content');

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      },
    });

    if (currentContent) {
      tl.to(currentContent, {
        opacity: 0,
        y: -80 * direction,
        duration: 0.6,
        ease: 'power2.in',
      }, 0);
    }

    tl.to(currentPanel, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, 0.4);

    tl.set(nextPanel, {
      opacity: 1,
      zIndex: 10,
    }, 0.6);

    tl.set(currentPanel, {
      zIndex: 0,
    }, 0.6);

    if (nextContent) {
      tl.fromTo(nextContent, 
        { opacity: 0, y: 80 * direction },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.6
      );
    }

  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isAnimatingRef.current) return;

    const delta = e.deltaY;
    const threshold = 30;

    if (delta > threshold) {
      goToPage(currentPageRef.current + 1);
    } else if (delta < -threshold) {
      goToPage(currentPageRef.current - 1);
    }
  }, [goToPage]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isAnimatingRef.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const delta = touchStartY.current - touchEndY;
    const threshold = 50;

    if (delta > threshold) {
      goToPage(currentPageRef.current + 1);
    } else if (delta < -threshold) {
      goToPage(currentPageRef.current - 1);
    }
  }, [goToPage]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isAnimatingRef.current) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goToPage(currentPageRef.current + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goToPage(currentPageRef.current - 1);
    }
  }, [goToPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown]);

  useEffect(() => {
    const panels = document.querySelectorAll('.scene-panel');
    panels.forEach((panel, index) => {
      const el = panel as HTMLElement;
      if (index === 0) {
        el.style.opacity = '1';
        el.style.zIndex = '10';
        const content = el.querySelector('.scene-content, .hero-content') as HTMLElement;
        if (content) {
          content.style.opacity = '1';
          content.style.transform = 'translateY(0) scale(1)';
        }
      } else {
        el.style.opacity = '0';
        el.style.zIndex = '0';
      }
    });
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div 
        ref={containerRef} 
        className={`fixed inset-0 overflow-hidden transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <ContinuousSky currentPage={currentPage} totalPages={SECTIONS.length} />
        <StarField currentPage={currentPage} />
        <CloudsLayer currentPage={currentPage} />
        <Header currentPage={currentPage} onNavigate={goToPage} sections={SECTIONS} />
        
        <main className="relative h-full w-full">
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <SkillsSection />
          <ContactSection />
        </main>

        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {SECTIONS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? 'bg-white scale-150 shadow-lg shadow-white/30' 
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to ${SECTIONS[index]}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
