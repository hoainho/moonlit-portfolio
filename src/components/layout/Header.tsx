"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

interface HeaderProps {
  currentPage?: number;
  onNavigate?: (index: number) => void;
  sections?: string[];
}

export function Header({ currentPage = 0, onNavigate, sections = [] }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const handleNavClick = (index: number) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(index);
    }
  };

  const isLightBackground = currentPage === 2 || currentPage === 3;

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const buttons = navRef.current.querySelectorAll('button[data-nav-item]');
      const activeButton = buttons[currentPage] as HTMLElement;
      
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        setIndicatorStyle({
          left: buttonRect.left - navRect.left,
          width: buttonRect.width,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [currentPage]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
          isLightBackground ? "bg-white/10 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <button 
            onClick={() => handleNavClick(0)}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white/60 transition-colors">
              <Image
                src="/logo.png"
                alt="Bé Dương"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className={cn(
              "font-heading font-semibold hidden sm:block transition-colors",
              isLightBackground ? "text-slate-800" : "text-soft-cream"
            )}>
              {siteConfig.name}
            </span>
          </button>

          <nav ref={navRef} className="hidden md:flex items-center gap-8 relative">
            <span 
              className={cn(
                "absolute -bottom-1 h-0.5 rounded-full transition-all duration-500 ease-out",
                isLightBackground ? "bg-amber-500" : "bg-celestial-blue"
              )}
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.width > 0 ? 1 : 0,
              }}
            />
            
            {siteConfig.navigation.map((item, index) => (
              <button
                key={item.name}
                data-nav-item
                onClick={() => handleNavClick(index)}
                className={cn(
                  "transition-colors text-sm font-medium relative py-1",
                  isLightBackground 
                    ? "text-slate-600 hover:text-slate-900" 
                    : "text-silver-mist hover:text-soft-cream",
                  currentPage === index && "font-semibold",
                  currentPage === index && (isLightBackground ? "text-slate-900" : "text-soft-cream")
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-6 h-0.5 transition-all duration-300",
                isLightBackground ? "bg-slate-800" : "bg-moon-glow",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 transition-all duration-300",
                isLightBackground ? "bg-slate-800" : "bg-moon-glow",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 transition-all duration-300",
                isLightBackground ? "bg-slate-800" : "bg-moon-glow",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-midnight-blue/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <nav className="relative h-full flex flex-col items-center justify-center gap-8">
          {siteConfig.navigation.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(index)}
              className={cn(
                "text-2xl font-heading font-semibold transition-all duration-300",
                currentPage === index ? "text-celestial-blue" : "text-soft-cream hover:text-celestial-blue",
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
              }}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
