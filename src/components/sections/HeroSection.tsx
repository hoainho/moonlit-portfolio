"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/constants";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
          logoRef.current,
          { opacity: 0, y: 50, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="scene-panel relative h-full w-full flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="hero-content relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div
          ref={logoRef}
          className="relative w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-6 animate-float"
        >
          <Image
            src="/logo.png"
            alt="Bé Dương - 2D Artist"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <h1
          ref={titleRef}
          className="font-heading text-soft-cream mb-3"
          style={{ fontSize: "clamp(2rem, 7vw, 4rem)" }}
        >
          B É <span className="text-gradient">D Ư Ơ N G</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-silver-mist font-heading font-medium mb-3"
        >
          2D Artist & UI Designer
        </p>

        <p
          ref={taglineRef}
          className="text-base md:text-lg text-celestial-blue italic"
        >
          &ldquo;{siteConfig.tagline}&rdquo;
        </p>
      </div>

      <div 
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-silver-mist/80 text-xs tracking-widest uppercase">Scroll</span>
          <svg
            className="w-5 h-5 text-silver-mist/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
