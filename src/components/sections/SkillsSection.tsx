'use client';

import { useRef } from 'react';
import { siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="scene-panel relative h-full w-full flex items-center justify-center px-4 md:px-8 overflow-hidden"
    >
      <div className="scene-content max-w-5xl mx-auto w-full">
        <div className="text-center mb-6">
          <h2 className="text-white text-xl md:text-2xl mb-2 drop-shadow-lg font-heading">My Creative Arsenal</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/30 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🛠</span>
              </div>
              <h3 className="text-white font-heading font-semibold text-sm md:text-base">
                Design Tools
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {siteConfig.skills.tools.map((tool, index) => (
                <div
                  key={index}
                  className={cn(
                    'group bg-white/90 backdrop-blur-sm rounded-lg p-2 md:p-2.5 text-center cursor-default',
                    'transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg',
                    'border border-transparent hover:border-sky-200'
                  )}
                >
                  <div className="text-base md:text-lg font-bold bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-transparent mb-0.5">
                    {tool.icon}
                  </div>
                  <div className="text-[9px] md:text-[10px] text-slate-600 font-medium truncate">
                    {tool.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/30 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-white font-heading font-semibold text-sm md:text-base">
                What I Create
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.skills.capabilities.map((capability, index) => (
                <div
                  key={index}
                  className={cn(
                    'group relative bg-white/90 backdrop-blur-sm rounded-lg p-2.5 md:p-3 cursor-default overflow-hidden',
                    'transition-all duration-300 hover:bg-white hover:shadow-lg',
                    'border border-transparent hover:border-amber-200'
                  )}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                    }}
                  />
                  <div className="relative flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-slate-700 font-medium text-[10px] md:text-xs leading-tight group-hover:text-slate-900 transition-colors">
                      {capability.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-white/15 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <span className="text-white/80 text-xs font-medium">Specializing in:</span>
            {['Game Art', 'Character Design', 'UI/UX', 'Spine Animation'].map((skill, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] md:text-xs font-medium border border-white/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
