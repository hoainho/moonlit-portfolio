'use client';

import { useRef } from 'react';
import { siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';

const socialIcons: Record<string, string> = {
  linkedin: 'Li',
  behance: 'Be',
  artstation: 'Ar',
  instagram: 'Ig',
};

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleEmailClick = () => {
    window.location.href = `mailto:${siteConfig.social.email}`;
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Nguyen_Thi_Be_Duong_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scene-panel relative h-full w-full flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden"
    >
      <div className="scene-content max-w-3xl mx-auto w-full flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-amber-100 text-2xl md:text-3xl mb-3 drop-shadow-lg font-heading">Let&apos;s Create Together</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent mx-auto mb-6" />

          <p className="text-orange-100/90 text-sm md:text-base mb-3 max-w-md mx-auto drop-shadow">
            I&apos;m currently seeking Intern/Junior opportunities in 2D Art and UI/UX Design.
          </p>
          <p className="text-amber-200 text-sm md:text-base mb-8 drop-shadow">
            Let&apos;s make something magical ✨
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              onClick={handleEmailClick}
              className={cn(
                'group px-6 py-3 rounded-full font-heading font-semibold text-sm',
                'bg-gradient-to-r from-orange-500 to-amber-400 text-white',
                'transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
              )}
            >
              <span className="flex items-center gap-2">
                📧 Say Hello
              </span>
            </button>

            <button
              onClick={handleDownloadCV}
              className={cn(
                'group px-6 py-3 rounded-full font-heading font-semibold text-sm',
                'bg-white/20 backdrop-blur-sm text-amber-100 border border-amber-200/30',
                'transition-all duration-300 hover:scale-105 hover:bg-white/30'
              )}
            >
              <span className="flex items-center gap-2">
                📄 Download My CV
              </span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-3">
            {Object.entries(siteConfig.social).map(([key, value]) => {
              if (key === 'email') return null;
              return (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-amber-200/30',
                    'text-amber-100 font-bold text-xs',
                    'transition-all duration-300 hover:scale-110 hover:bg-white/30 hover:text-white'
                  )}
                >
                  {socialIcons[key] || key.slice(0, 2).toUpperCase()}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="w-full py-4 mt-auto">
        <div className="text-center">
          <p 
            className="text-sm font-medium drop-shadow-lg"
            style={{
              background: 'linear-gradient(90deg, #FFE4A0 0%, #FFFFFF 50%, #FFE4A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 200, 100, 0.5)',
            }}
          >
            © 2025 Nguyễn Thị Bé Dương · Crafted under golden skies
          </p>
        </div>
      </footer>
    </section>
  );
}
