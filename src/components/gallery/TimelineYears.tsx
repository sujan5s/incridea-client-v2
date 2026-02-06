import React, { useMemo } from "react";
import portalImg from "../../assets/portal.png";
import mascotImg from "../../assets/mascot.png";

interface HorizontalTimelineProps {
  items: string[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  scrollProgress: number; 
}

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
  items,
  activeIndex,
  onItemClick,
  scrollProgress,
}) => {
  
  const mascotStyle = useMemo(() => {
    const effectiveProgress = Math.max(0.07, scrollProgress);
    const step = 1 / (items.length - 1);
    
    let minDistance = 1;
    items.forEach((_, index) => {
      const portalPosition = index * step;
      const distance = Math.abs(effectiveProgress - portalPosition);
      if (distance < minDistance) minDistance = distance;
    });

    const threshold = 0.05; 
    let opacity = 1;

    if (minDistance < threshold && effectiveProgress > 0.1) {
       opacity = minDistance / threshold; 
    }

    return {
      left: `${effectiveProgress * 100}%`,
      transform: `translateX(-50%) translateY(-50%) scaleX(-1)`, 
      opacity: opacity, 
      zIndex: 50, 
    };
  }, [scrollProgress, items.length]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 h-32 flex items-center relative">
      <style>
        {`
          @keyframes revolve {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes portalPulse {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(0, 150, 255, 0.5)) brightness(1); }
            50% { filter: drop-shadow(0 0 20px rgba(0, 200, 255, 0.8)) brightness(1.3); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          .revolving-border {
            position: absolute;
            width: 110%;
            height: 110%;
            border-radius: 50%;
            background: conic-gradient(from 0deg, transparent, #00d4ff, transparent 30%);
            animation: revolve 2s linear infinite;
            opacity: 0.6;
            filter: blur(8px);
          }
          .mascot-glow {
            animation: float 3s ease-in-out infinite;
            filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.7));
          }
        `}
      </style>

      <div className="relative w-full">
        {/* --- MASCOT --- */}
        <div
          className="absolute top-1/2 w-20 h-20 pointer-events-none transition-transform duration-75 ease-out"
          style={mascotStyle}
        >
           <img 
             src={mascotImg} 
             alt="Mascot" 
             className="w-full h-full object-contain mascot-glow"
           />
        </div>

        {/* --- PORTALS --- */}
        <div className="relative w-full flex justify-between">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                onClick={() => onItemClick(index)}
                className="relative z-10 flex flex-col items-center group focus:outline-none"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* The revolving circular glow (only shows when active) */}
                  {isActive && <div className="revolving-border" />}
                  
                  <div
                    className={`
                      relative z-10 w-20 h-20 transition-all duration-500
                      ${isActive ? "scale-110" : "opacity-60 grayscale-[50%]"}
                    `}
                    style={{
                      animation: isActive ? "portalPulse 3s infinite ease-in-out" : "none"
                    }}
                  >
                     <img 
                       src={portalImg} 
                       alt="Portal" 
                       className="w-full h-full object-contain"
                     />
                  </div>
                </div>

                <span
                  className={`
                    mt-1 text-sm font-bold tracking-widest transition-all duration-300 font-['Orbitron']
                    ${isActive ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]" : "text-neutral-500"}
                  `}
                >
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};