'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { portfolioItems } from '@/lib/constants';

const categories = ['All', 'Game Art', 'UI/UX', 'Animation', 'Illustration'];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  const openModal = (item: typeof portfolioItems[0]) => {
    setSelectedProject(item);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <>
      <section
        id="works"
        ref={sectionRef}
        className="scene-panel relative h-full w-full flex items-center justify-center pt-20 pb-8 px-4 md:px-8 overflow-hidden"
      >
        <div className="scene-content max-w-6xl mx-auto w-full">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-slate-800 text-xl md:text-2xl mb-2 drop-shadow-sm">Selected Works</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-sky-500 to-blue-400 rounded-full mx-auto mb-4" />

            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-3 py-1 rounded-full text-[10px] md:text-xs font-medium transition-all duration-300',
                    activeCategory === category
                      ? 'bg-slate-800 text-white shadow-md'
                      : 'bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white/90'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-h-[65vh] overflow-y-auto px-1"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-card group cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-400 hover:shadow-xl border border-white/60 hover:border-white/80">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at top right, rgba(255, 200, 100, 0.4) 0%, rgba(255, 180, 80, 0.2) 30%, transparent 60%)',
                    }}
                  />
                  <div 
                    className="absolute -top-8 -right-8 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 group-hover:top-[-20px] group-hover:right-[-20px] transition-all duration-500 z-10 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 240, 180, 1) 0%, rgba(255, 200, 100, 0.8) 30%, rgba(255, 160, 60, 0.4) 60%, transparent 80%)',
                      boxShadow: '0 0 30px 15px rgba(255, 200, 100, 0.4), 0 0 60px 30px rgba(255, 180, 80, 0.2)',
                    }}
                  />
                  
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <span className="text-3xl md:text-4xl opacity-30">🎨</span>
                    </div>
                  </div>
                  
                  <div className="relative z-20 p-2.5 md:p-3">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[8px] md:text-[10px] font-medium bg-slate-100 text-slate-600 mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-slate-800 text-xs md:text-sm font-medium mb-0.5 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[10px] md:text-xs line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
            isModalVisible ? "opacity-100" : "opacity-0"
          )}
          onClick={closeModal}
        >
          <div 
            className={cn(
              "absolute inset-0 transition-all duration-300",
              isModalVisible ? "backdrop-blur-md" : "backdrop-blur-none"
            )}
            style={{
              background: isModalVisible 
                ? 'radial-gradient(circle at center, rgba(255, 200, 100, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)'
                : 'transparent',
            }}
          />
          
          <div
            className={cn(
              "relative max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl transition-all duration-300 rounded-2xl",
              isModalVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
            )}
            style={{
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 220, 100, 0.6) 0%, rgba(255, 180, 60, 0.3) 40%, transparent 70%)',
                boxShadow: '0 0 60px 30px rgba(255, 200, 100, 0.3)',
              }}
            />
            
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-800 transition-all z-10 shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div 
              className="aspect-video flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(254, 243, 199, 1) 0%, rgba(253, 230, 138, 0.8) 100%)',
              }}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 240, 180, 0.8) 0%, rgba(255, 200, 100, 0.4) 50%, transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
              />
              <span className="text-7xl opacity-40">🎨</span>
            </div>

            <div className="p-6 bg-white/60 backdrop-blur-sm">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm mb-3">
                {selectedProject.category}
              </span>
              
              <h3 className="text-slate-800 text-xl md:text-2xl font-heading mb-3">
                {selectedProject.title}
              </h3>
              
              <p className="text-slate-600 text-sm md:text-base mb-5 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-3">
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Tools</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.tools.map((tool, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-slate-700 border border-amber-200/50 shadow-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Year</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-white">
                    {selectedProject.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
