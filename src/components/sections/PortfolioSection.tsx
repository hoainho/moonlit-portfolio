'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { portfolioItems, siteConfig } from '@/lib/constants';

const categories = ['All', 'Event Design', 'Brand Identity', 'Typography', 'Illustration'];
const SWIPE_THRESHOLD = 50;
const AUTO_PLAY_INTERVAL = 4000;
const AUTO_PLAY_THRESHOLD = 4;
const ITEMS_TO_SHOW = 3;


const getBehanceEmbedUrl = (behanceUrl: string): string | null => {
  const match = behanceUrl.match(/gallery\/(\d+)/);
  return match ? `https://www.behance.net/embed/project/${match[1]}?ilo0=1` : null;
};

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  const totalItems = filteredItems.length;
  const itemsToShow = isMobile ? 1 : Math.min(ITEMS_TO_SHOW, totalItems);
  const isCompactMode = !isMobile && totalItems <= ITEMS_TO_SHOW;
  const itemWidth = isCompactMode ? (100 / Math.max(totalItems, 1)) : (100 / itemsToShow);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const goToIndex = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let newIndex = index;
    if (newIndex < 0) newIndex = totalItems - 1;
    if (newIndex >= totalItems) newIndex = 0;
    
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalItems]);

  const nextSlide = useCallback(() => {
    const next = (currentIndexRef.current + 1) % totalItems;
    goToIndex(next);
  }, [goToIndex, totalItems]);

  const prevSlide = useCallback(() => {
    const prev = currentIndexRef.current - 1 < 0 ? totalItems - 1 : currentIndexRef.current - 1;
    goToIndex(prev);
  }, [goToIndex, totalItems]);

  const shouldAutoPlay = (isMobile || totalItems > AUTO_PLAY_THRESHOLD) && totalItems > 1;

  useEffect(() => {
    if (isPaused || selectedProject || !shouldAutoPlay || isDragging) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }
    
    autoPlayRef.current = setInterval(() => {
      const next = (currentIndexRef.current + 1) % totalItems;
      setCurrentIndex(next);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isPaused, selectedProject, shouldAutoPlay, isDragging, totalItems]);

  const handleDragStart = (clientX: number) => {
    setIsPaused(true);
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD) {
      if (dragOffset < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setDragStartX(0);
    setTimeout(() => setIsPaused(false), 100);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
    setIsPaused(false);
  };

  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsPaused(true);
    }
  };

  const openModal = (item: typeof portfolioItems[0]) => {
    setIframeLoaded(false);
    setSelectedProject(item);
    setTimeout(() => setIsModalVisible(true), 10);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setIframeLoaded(false);
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

  const getTranslateX = () => {
    if (isCompactMode) {
      return 0;
    }

    const dragOffsetPercent = sliderRef.current 
      ? (dragOffset / sliderRef.current.offsetWidth) * 100 
      : 0;
    
    if (isMobile) {
      return -(currentIndex * itemWidth) + dragOffsetPercent;
    }
    
    let targetOffset = currentIndex - 1;
    
    if (targetOffset < 0) {
      targetOffset = 0;
    }
    
    const maxOffset = totalItems - itemsToShow;
    if (targetOffset > maxOffset) {
      targetOffset = maxOffset;
    }
    
    return -(targetOffset * itemWidth) + dragOffsetPercent;
  };

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
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full mx-auto mb-4" />

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

          <div className="relative">
            <div 
              ref={sliderRef}
              className={cn(
                "overflow-hidden py-4 select-none",
                !isCompactMode && (isDragging ? "cursor-grabbing" : "cursor-grab")
              )}
              onTouchStart={!isCompactMode ? handleTouchStart : undefined}
              onTouchMove={!isCompactMode ? handleTouchMove : undefined}
              onTouchEnd={!isCompactMode ? handleTouchEnd : undefined}
              onMouseDown={!isCompactMode ? handleMouseDown : undefined}
              onMouseMove={!isCompactMode && isDragging ? handleMouseMove : undefined}
              onMouseUp={!isCompactMode ? handleMouseUp : undefined}
              onMouseEnter={!isCompactMode ? handleMouseEnter : undefined}
              onMouseLeave={!isCompactMode ? handleMouseLeave : undefined}
            >
              <div 
                className={cn(
                  "flex",
                  isCompactMode && "justify-center",
                  !isDragging && "transition-transform duration-500 ease-out"
                )}
                style={{
                  transform: `translateX(${getTranslateX()}%)`,
                }}
              >
                {filteredItems.map((item, index) => {
                  const isCenter = index === currentIndex;
                  const distance = Math.min(
                    Math.abs(index - currentIndex),
                    Math.abs(index - currentIndex + totalItems),
                    Math.abs(index - currentIndex - totalItems)
                  );
                  const isVisible = distance <= 1;
                  
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "px-1.5 md:px-2 transition-all duration-500 ease-out flex-shrink-0",
                        isCompactMode && "flex-shrink"
                      )}
                      style={{ 
                        width: isCompactMode ? 'auto' : `${itemWidth}%`,
                        opacity: isCompactMode ? 1 : (isVisible ? 1 : 0.3),
                      }}
                    >
                      <div
                        className={cn(
                          "portfolio-card group cursor-pointer transition-all duration-500 ease-out mx-auto",
                          isCompactMode 
                            ? "scale-95 hover:scale-100"
                            : (isCenter 
                              ? "scale-100 md:scale-105" 
                              : "scale-90 md:scale-90")
                        )}
                        onClick={() => {
                          if (isDragging) return;
                          if (isCompactMode) {
                            openModal(item);
                          } else if (isCenter) {
                            openModal(item);
                          } else {
                            goToIndex(index);
                          }
                        }}
                        style={{ 
                          width: isCompactMode ? 'clamp(180px, 22vw, 260px)' : undefined,
                          maxWidth: isMobile ? '280px' : 'clamp(200px, 28vw, 300px)',
                        }}
                      >
                        <div className={cn(
                          "relative rounded-xl overflow-hidden transition-all duration-500 h-full",
                          "border-2",
                          isCompactMode
                            ? "bg-white/80 shadow-lg border-white/40 hover:bg-white/95 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-300/50"
                            : (isCenter 
                              ? "bg-white/95 shadow-2xl shadow-amber-500/20 border-amber-300/50" 
                              : "bg-white/70 shadow-lg border-white/40")
                        )}>
                          {(isCompactMode || isCenter) && (
                            <>
                              <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                                style={{
                                  background: 'radial-gradient(circle at top right, rgba(255, 200, 100, 0.3) 0%, rgba(255, 180, 80, 0.15) 30%, transparent 60%)',
                                }}
                              />
                              <div 
                                className="absolute -top-4 -right-4 w-14 h-14 rounded-full transition-all duration-500 z-10 pointer-events-none opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100"
                                style={{
                                  background: 'radial-gradient(circle, rgba(255, 240, 180, 1) 0%, rgba(255, 200, 100, 0.8) 30%, rgba(255, 160, 60, 0.4) 60%, transparent 80%)',
                                  boxShadow: '0 0 25px 12px rgba(255, 200, 100, 0.4), 0 0 50px 25px rgba(255, 180, 80, 0.2)',
                                }}
                              />
                            </>
                          )}
                          
                          <div className="relative aspect-[4/3] overflow-hidden">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className={cn(
                                  "w-full h-full object-cover transition-transform duration-500",
                                  isCenter && "group-hover:scale-105"
                                )}
                                draggable={false}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <span className="text-3xl opacity-30">🎨</span>
                              </div>
                            )}
                          </div>
                          
                          <div className={cn(
                            "relative z-20 p-3 md:p-4 transition-all duration-300",
                            isCenter ? "bg-white/80" : "bg-white/60"
                          )}>
                            <span className={cn(
                              "inline-block px-2 py-0.5 rounded text-[9px] font-medium mb-1.5",
                              isCenter 
                                ? "bg-amber-100 text-amber-700" 
                                : "bg-slate-100 text-slate-600"
                            )}>
                              {item.category}
                            </span>
                            <h3 className={cn(
                              "text-slate-800 text-xs md:text-sm font-semibold mb-1 line-clamp-1 transition-colors",
                              (isCompactMode || isCenter) && "group-hover:text-amber-600"
                            )}>
                              {item.title}
                            </h3>
                            <p className="text-slate-500 text-[10px] md:text-xs line-clamp-2 leading-tight">
                              {item.description}
                            </p>
                            
                            {(isCompactMode || isCenter) && (
                              <div className={cn(
                                "mt-2 pt-2 border-t border-amber-200/50",
                                isCompactMode && "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              )}>
                                <span className="text-amber-600 text-[10px] font-medium flex items-center gap-1">
                                  <span>Click to view details</span>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
          
          {!isCompactMode && (
            <>
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {filteredItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      currentIndex === index
                        ? "w-6 h-2 bg-gradient-to-r from-amber-400 to-orange-400"
                        : "w-2 h-2 bg-slate-300 hover:bg-amber-300"
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 mt-2 text-slate-500/70 text-[10px]">
                <div className="flex items-center gap-1.5 animate-bounce-x">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Swipe</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <span className="text-slate-400">|</span>
                <span>{currentIndex + 1} / {totalItems}</span>
              </div>
            </>
          )}
        </div>
      </section>

      {selectedProject && (() => {
        const embedUrl = selectedProject.behanceUrl ? getBehanceEmbedUrl(selectedProject.behanceUrl) : null;
        return (
        <div
          className={cn(
            "portfolio-modal-overlay fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-300",
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
                ? 'radial-gradient(circle at center, rgba(255, 200, 100, 0.1) 0%, rgba(15, 23, 42, 0.92) 100%)'
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
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-800 transition-all z-10 shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Behance Embed or Project Image */}
            {embedUrl ? (
              <div className="relative w-full rounded-t-2xl overflow-hidden" style={{ height: 'min(40vh, 320px)' }}>
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-full h-full animate-pulse" style={{
                      background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.8) 0%, rgba(253, 230, 138, 0.6) 50%, rgba(251, 191, 36, 0.4) 100%)',
                    }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-3 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
                      <span className="text-amber-700/70 text-xs font-medium">Loading Behance project...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src={embedUrl}
                  className={cn(
                    "w-full h-full border-0 transition-opacity duration-500",
                    iframeLoaded ? "opacity-100" : "opacity-0"
                  )}
                  allowFullScreen
                  loading="lazy"
                  allow="clipboard-write"
                  onLoad={() => setIframeLoaded(true)}
                  title={`${selectedProject.title} - Behance Project`}
                />
              </div>
            ) : (
              selectedProject.image ? (
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full rounded-t-2xl object-cover"
                />
              ) : (
                <div 
                  className="w-full aspect-[4/3] rounded-t-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(254, 243, 199, 1) 0%, rgba(253, 230, 138, 0.8) 100%)',
                  }}
                >
                  <span className="text-7xl opacity-40">🎨</span>
                </div>
              )
            )}

            {/* Project Info */}
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-b-2xl">
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
                    {selectedProject.tools.map((tool, index) => {
                      const skillData = siteConfig.skills.tools.find(s => s.name === tool);
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-slate-700 border border-amber-200/50 shadow-sm"
                        >
                          {skillData && (
                            <span className="text-[10px] font-bold bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-transparent">
                              {skillData.icon}
                            </span>
                          )}
                          {tool}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Year</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-white">
                    {selectedProject.year}
                  </span>
                </div>
              </div>
              {selectedProject.behanceUrl && (
                <a
                  href={selectedProject.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-slate-800 shadow-lg shadow-slate-800/20 hover:bg-slate-700 hover:shadow-xl hover:shadow-slate-800/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Behance
                </a>
              )}
            </div>
          </div>
        </div>
        );
      })()}
    </>
  );
}
