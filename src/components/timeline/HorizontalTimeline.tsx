import React, { useMemo, useState, useEffect } from "react";
import portalImg from "../../assets/portal.png";
import mascotImg from "../../assets/mascot.png";

interface HorizontalTimelineProps {
  items: string[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  scrollProgress: number;
}

// DEFINING EVENT THEME COLORS
const THEME_COLORS = [
  "#ffffff", // 2018
  "#ffffff", // 2019
  "#ffffff", // 2020
  "#ffffff", // 2022
  "#00A4E4", // 2023
  "#CC52FF", // 2024
  "#00ffaa"  // 2025
];

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
  items,
  activeIndex,
  onItemClick,
  scrollProgress,
}) => {
  // 1. DETERMINE CURRENT COLOR
  const currentColor = THEME_COLORS[activeIndex % THEME_COLORS.length];

  // 2. RESPONSIVE OFFSET CALCULATION
  const [baseOffset, setBaseOffset] = useState(96); // Default Desktop

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // MATCHING HTML LAYOUT BREAKPOINTS:
      // Mobile (<768px): 36px
      // Tablet (>=768px): 72px
      // Desktop (>=1024px): 96px
      if (width < 768) {
        setBaseOffset(36);
      } else if (width < 1024) {
        setBaseOffset(72);
      } else {
        setBaseOffset(96);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. MASCOT PHYSICS & ANIMATION
  const mascotStyle = useMemo(() => {
    const rawProgress = Math.min(Math.max(scrollProgress, 0), 1);
    // Visual 0.0 means "On top of 2018".
    const effectiveProgress = rawProgress;

    const step = 1 / (Math.max(items.length - 1, 1));
    let minDistance = 1;
    let closestPortalIndex = 0;

    items.forEach((_, index) => {
      const portalPosition = index * step;
      const distance = Math.abs(effectiveProgress - portalPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestPortalIndex = index;
      }
    });

    // --- VORTEX ANIMATION LOGIC ---
    const threshold = 0.03; // Distance threshold to trigger "dive"
    let opacity = 1;
    let scale = 1;

    // Check overlap
    if (minDistance < threshold) {
      // EXCEPTION: 2018 (Index 0) -> No animation
      if (closestPortalIndex === 0) {
        opacity = 1;
        scale = 1;
      } else {
        // ANIMATION FOR 2019+
        const ratio = minDistance / threshold;
        
        // Non-linear Opacity: Fades out sharply near center
        opacity = Math.pow(ratio, 1.5);
        
        // Vortex Scale: Shrinks to 60%
        scale = 0.6 + (0.4 * Math.pow(ratio, 0.5));
      }
    }

    // --- CSS POSITIONING ---
    const cssPosition = `calc(${baseOffset}px + (${effectiveProgress} * (100% - ${baseOffset * 2}px)))`;

    return {
      cssPosition,
      effectiveProgress,
      closestPortalIndex,
      style: {
        left: cssPosition,
        transform: `translateX(-50%) translateY(-50%) scaleX(-1) scale(${scale})`,
        opacity: opacity,
        zIndex: 50,
        // PERFORMANCE FIX: Only animate opacity/scale with transition. 
        // Position changes are instant to prevent lag.
        transition: "opacity 0.05s linear, scale 0.05s linear"
      }
    };
  }, [scrollProgress, items.length, baseOffset]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 lg:px-10 py-6 md:py-10 flex items-center relative overflow-x-hidden perspective-container">
      <style>
        {`
          @keyframes portalPulse {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(0, 150, 255, 0.6)) brightness(1); }
            50% { filter: drop-shadow(0 0 15px rgba(0, 200, 255, 0.9)) brightness(1.2); }
          }
          @keyframes fluidFloat {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          @keyframes smokeFlow {
            0%, 100% { opacity: 0.6; transform: translateY(-50%) scaleY(1); filter: blur(4px); }
            50% { opacity: 0.9; transform: translateY(-50%) scaleY(1.5); filter: blur(6px); }
          }
          .mascot-hero {
            animation: fluidFloat 3s ease-in-out infinite;
            filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.8));
          }
          .perspective-container {
            perspective: 1000px;
          }
          .portal-3d-wrapper {
            transform-style: preserve-3d;
            will-change: transform;
          }
          /* Responsive Sizing */
          .mascot-container { width: 4rem; height: 4rem; }
          @media (min-width: 768px) { .mascot-container { width: 7rem; height: 7rem; } }
        `}
      </style>

      {/* --- SMOKY PLASMA TRAIL --- */}
      <div
        className="absolute top-1/2 z-0 rounded-full transition-colors duration-500 ease-in-out"
        style={{
          left: `${baseOffset}px`,
          width: `calc(${mascotStyle.cssPosition} - ${baseOffset}px)`,
          height: '6px',
          background: `linear-gradient(90deg, transparent 0%, ${currentColor} 50%, ${currentColor} 100%)`,
          boxShadow: `0 0 15px ${currentColor}, 0 0 5px ${currentColor}`,
          animation: "smokeFlow 3s ease-in-out infinite",
          transformOrigin: "center left"
        }}
      />

      <div className="relative w-full z-10">
        {/* --- MASCOT --- */}
        <div
          className="absolute top-1/2 pointer-events-none mascot-container"
          style={mascotStyle.style}
        >
          <img
            src={mascotImg}
            alt="Mascot"
            className="w-full h-full object-contain mascot-hero"
          />
        </div>

        {/* --- PORTALS --- */}
        <div className="relative w-full flex justify-between items-center">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const portalColor = THEME_COLORS[index % THEME_COLORS.length];

            // 3D Rotation Calculation
            const step = 1 / (Math.max(items.length - 1, 1));
            const portalPos = index * step;
            const diff = mascotStyle.effectiveProgress - portalPos;
            // Limit rotation to +/- 45 degrees
            const rotateY = Math.max(-45, Math.min(45, diff * -400));

            return (
              <button
                key={index}
                onClick={() => onItemClick(index)}
                className="relative z-10 flex flex-col items-center focus:outline-none touch-manipulation perspective-container"
              >
                {/* Responsive Portal Wrapper */}
                <div className="relative flex items-center justify-center
                  w-14 h-14 md:w-24 md:h-24 lg:w-28 lg:h-28">
                  
                  <div
                    className={`
                      relative z-10 transition-all duration-300 ease-out portal-3d-wrapper
                      w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20
                      ${isActive ? "grayscale-0" : "opacity-30 grayscale"}
                    `}
                    style={{
                      transform: `scale(${isActive ? 1.1 : 1}) rotateY(${rotateY}deg)`,
                      animation: isActive ? "portalPulse 4s infinite ease-in-out" : "none"
                    }}
                  >
                    <img
                      src={portalImg}
                      alt="Portal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Year Text */}
                <span
                  className={`
                    -mt-1 md:-mt-2 
                    text-[10px] md:text-xs lg:text-sm 
                    font-bold tracking-widest transition-all duration-500 font-['Orbitron']
                    ${isActive ? "opacity-100 scale-110" : "text-neutral-600"}
                  `}
                  style={{
                    color: isActive ? portalColor : undefined,
                    textShadow: isActive ? `0 0 10px ${portalColor}80` : 'none'
                  }}
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