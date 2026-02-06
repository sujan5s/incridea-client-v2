import React, { useMemo } from "react";

// FIX: Use web-ready paths, not C:\ paths.
// These look for files inside your "public/assets" folder.
const PORTAL_IMG_URL = "/assets/portal.png"; 
const MASCOT_IMG_URL = "/assets/mascot.png"; 

const defaultYears = ["2018", "2019", "2020", "2022", "2023", "2024", "2025"];

interface TimelineYearsProps {
  years?: string[];
  scrollProgress: number; 
}

const TimelineYears: React.FC<TimelineYearsProps> = ({ 
  years = defaultYears, 
  scrollProgress 
}) => {
  
  // Calculate the Mascot's scale to create the "Enter/Exit" portal effect
  const mascotStyle = useMemo(() => {
    // 1. Find the spacing between years
    const step = 1 / (years.length - 1);
    
    // 2. Find the distance to the CLOSEST portal
    let minDistance = 1;
    years.forEach((_, index) => {
      const portalPosition = index * step;
      const distance = Math.abs(scrollProgress - portalPosition);
      if (distance < minDistance) minDistance = distance;
    });

    // 3. Animation Threshold
    const threshold = 0.05; 
    
    // 4. Calculate Scale
    let scale = 1;
    if (minDistance < threshold) {
      scale = minDistance / threshold; 
    }

    return {
      top: `${scrollProgress * 100}%`,
      transform: `translateY(-50%) scale(${scale})`,
      opacity: scale < 0.1 ? 0 : 1, 
    };
  }, [scrollProgress, years.length]);

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden h-[70vh] w-32 md:flex flex-col justify-between">
      <div className="relative h-full w-full">
        {/* The Vertical Line */}
        <div className="absolute left-[18px] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />

        {/* --- THE FLOATING MASCOT --- */}
        <div
          className="absolute left-[2px] w-10 h-10 z-20 transition-transform duration-75 ease-out"
          style={mascotStyle}
        >
           <img 
             src={MASCOT_IMG_URL} 
             alt="Mascot" 
             className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"
           />
        </div>

        {/* --- THE YEAR PORTALS --- */}
        {years.map((year, index) => {
          const position = years.length === 1 ? 0 : (index / (years.length - 1)) * 100;
          
          return (
            <div
              key={year}
              className="absolute flex items-center gap-4 w-full"
              style={{ top: `${position}%`, transform: "translateY(-50%)" }}
            >
              {/* The Portal Image */}
              <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
                 <img 
                   src={PORTAL_IMG_URL}
                   alt="Portal"
                   className="w-full h-full object-contain animate-pulse-slow" 
                 />
              </div>

              {/* Year Label */}
              <span className="text-sm font-bold text-white/90 font-['Orbitron'] tracking-widest shadow-black drop-shadow-md">
                {year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineYears;