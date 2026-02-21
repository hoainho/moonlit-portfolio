"use client";

import { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scene-panel relative h-full w-full flex items-center justify-center px-4 md:px-8 overflow-hidden"
    >
      <div className="scene-content max-w-6xl mx-auto w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 lg:p-12 border border-white/20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/30 to-amber-300/30 blur-2xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-orange-300/50">
                  <Image
                    src="/logo.png"
                    alt="Bé Dương"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5 order-1 md:order-2">
              <div>
                <h2 className="text-amber-100 text-2xl md:text-3xl mb-2 drop-shadow-lg">
                  About Me
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full" />
              </div>

              <div className="about-items space-y-4">
                <p className="text-lg md:text-xl text-amber-50 font-heading drop-shadow">
                  {siteConfig.about.intro} 👋
                </p>
                <p className="text-orange-100/90 leading-relaxed text-sm md:text-base drop-shadow">
                  {siteConfig.about.description}
                </p>
                <p className="text-amber-200 italic text-sm md:text-base drop-shadow">
                  &ldquo;{siteConfig.about.quote}&rdquo; ✨
                </p>

                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-2xl">🎓</span>
                      <div>
                        <p className="text-amber-50 font-medium text-sm md:text-base">
                          {siteConfig.about.education.school}
                        </p>
                        <p className="text-orange-200/80 text-xs md:text-sm">
                          {siteConfig.about.education.major} •{" "}
                          {siteConfig.about.education.year}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 border border-amber-300/30">
                      <span className="text-amber-100 text-xs md:text-sm font-semibold">
                        GPA: {siteConfig.about.education.gpa}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {siteConfig.about.funFacts.map((fact, index) => (
                    <div
                      key={index}
                      className={cn(
                        "px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20",
                        "flex items-center gap-2 text-xs md:text-sm font-medium text-amber-100"
                      )}
                    >
                      <span className="text-base">{fact.emoji}</span>
                      <span>{fact.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
