import React, { useMemo, useState, useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import Portal from "../Portal";
import walk1 from "../../assets/character/walk-1.png";
import walk2 from "../../assets/character/walk-2.png";
import stand from "../../assets/character/stand.png";

const WALK_CYCLE = [walk1, stand, walk2, stand];
const IDLE_FRAME = stand;

const glassCardStyle = {
  borderRadius: "1.75rem",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  background: `
    linear-gradient(to top, rgba(0, 0, 0, 0.20), transparent 60%),
    rgba(21, 21, 21, 0.30)
  `,
  boxShadow: `
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.22)
  `,
  backdropFilter: "brightness(1.1) blur(1px)",
  WebkitBackdropFilter: "brightness(1.1) blur(1px)",
};

interface HorizontalTimelineProps {
  items: string[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  scrollProgress: number;
}

const THEME_COLORS = [
  "#ffffff", "#ffffff", "#ffffff", "#ffffff",
  "#00A4E4", "#CC52FF", "#00ffaa",
];

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
  items,
  activeIndex,
  onItemClick,
  scrollProgress,
}) => {
  const currentColor = THEME_COLORS[activeIndex % THEME_COLORS.length];
  const [baseOffset, setBaseOffset] = useState(60);

  // Responsive sizing aligned with Tailwind breakpoints
  // sm: 640px, md: 768px
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setBaseOffset(30);        // Mobile (< sm)
      else if (w < 768) setBaseOffset(45);   // Tablet (sm -> md)
      else setBaseOffset(60);                // Desktop (>= md)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Animation State ---
  const [smoothProgress, setSmoothProgress] = useState(scrollProgress);
  const [mascotImage, setMascotImage] = useState(IDLE_FRAME);
  const [isFlipped, setIsFlipped] = useState(false);
  const distanceRef = useRef(0);

  // --- Preload Images ---
  useEffect(() => {
    WALK_CYCLE.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // --- The Walking Logic ---
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setSmoothProgress((prev) => {
        const target = scrollProgress;
        const diff = target - prev;
        const absDiff = Math.abs(diff);

        // 1. Determine Direction
        if (diff > 0.0001) setIsFlipped(false);
        else if (diff < -0.0001) setIsFlipped(true);

        // 2. Determine Frame (Walk or Stand)
        const isMoving = absDiff > 0.0005;

        if (isMoving) {
          const effectiveSpeed = Math.min(absDiff, 0.003);
          distanceRef.current += effectiveSpeed * 800;
          const frameIndex = Math.floor(distanceRef.current / 80) % WALK_CYCLE.length;
          setMascotImage(WALK_CYCLE[frameIndex]);
        } else {
          setMascotImage(IDLE_FRAME);
        }

        // 3. Smooth Movement (Lerp)
        if (absDiff < 0.0001) return target;
        return prev + diff * 0.05;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollProgress]);

  // --- Styles & Positioning ---
  const mascotStyle = useMemo(() => {
    const p = Math.min(Math.max(smoothProgress, 0), 1);
    const step = 1 / (items.length - 1);
    let minDistance = 1;

    items.forEach((_, i) => {
      const dist = Math.abs(p - i * step);
      if (dist < minDistance) minDistance = dist;
    });

    const threshold = 0.04;
    let opacity = 1;
    let scale = 1;
    let zDepth = 60;
    let blur = 0;

    if (minDistance < threshold) {
      const ratio = minDistance / threshold;
      const easeRatio = Math.pow(ratio, 0.5);
      scale = Math.max(0.1, easeRatio);
      opacity = Math.max(0.2, easeRatio);
      blur = (1 - easeRatio) * 6;
      if (minDistance < threshold / 2) zDepth = 10;
    }

    const cssPos = `calc(${baseOffset}px + (${p} * (100% - ${baseOffset * 2}px)))`;

    return {
      cssPos,
      rawP: p,
      style: {
        left: cssPos,
        transform: `
          translateX(-50%) 
          translateY(-50%) 
          scaleX(${isFlipped ? -1 : 1}) 
          scale(${scale})
        `,
        opacity,
        zIndex: zDepth,
        filter: `blur(${blur}px)`,
        willChange: "transform, left",
        transition: "opacity 0.1s linear, scale 0.1s ease-out, filter 0.1s linear",
      },
    };
  }, [smoothProgress, items.length, baseOffset, isFlipped]);

  return (
    <div
      className="w-full max-w-5xl mx-auto px-4 md:px-8 flex items-center relative h-14 sm:h-16 md:h-20"
      style={glassCardStyle}
    >
      <style>{`
        @keyframes smokeTrail {
            0%, 100% { opacity: 0.15; transform: translateY(-50%) scaleY(0.8); filter: blur(1px); }
            50% { opacity: 0.3; transform: translateY(-50%) scaleY(1.2); filter: blur(2px); }
        }
      `}</style>

      {/* 1. TRAIL LINE */}
      <div
        className="absolute top-1/2 z-0 rounded-full transition-colors duration-500"
        style={{
          left: `${baseOffset}px`,
          width: `calc(${mascotStyle.cssPos} - ${baseOffset}px)`,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${currentColor}88)`,
          boxShadow: `0 0 10px ${currentColor}44`,
          animation: "smokeTrail 2.5s ease-in-out infinite",
          transformOrigin: "left center",
        }}
      />

      {/* 2. THE MASCOT CONTAINER */}
      <div className="relative w-full z-10">
        <div
          className="absolute top-1/2 pointer-events-none w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20"
          style={mascotStyle.style}
        >
          <img
            src={mascotImage}
            alt="Mascot"
            className="w-full h-full object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* 3. TIMELINE BUTTONS */}
        <div className="relative w-full flex justify-between items-center">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const portalColor = THEME_COLORS[index % THEME_COLORS.length];

            // Dynamic Proximity Scaling
            const step = 1 / (items.length - 1);
            const diff = mascotStyle.rawP - index * step;
            const dist = Math.abs(diff);
            // Scale up when close (dist < 0.05)
            // 1.0 -> 1.25 max scale
            const proximity = Math.max(0, 1 - dist * 20);
            const dynamicScale = 1 + proximity * 0.25;

            // FIXED ROTATION: Always -60deg per user request
            const rotateY = -60;

            return (
              <button
                key={item}
                onClick={() => onItemClick(index)}
                // ADDED: [perspective:1000px] to creating local 3D space
                // ADDED: [transform-style:preserve-3d] to allow children to rotate in 3D
                // ADDED: h-full justify-center to align content within the timeline strip
                className="relative flex flex-col h-full justify-center items-center outline-none group px-1 sm:px-0 z-30 pointer-events-auto [perspective:1000px] [transform-style:preserve-3d]"
              >
                <div className="w-8 h-12 sm:w-12 sm:h-16 md:w-16 md:h-24 flex items-center justify-center">
                  <div
                    className="w-full h-full"
                    style={{
                      transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${dynamicScale})`,
                      transformStyle: "preserve-3d",
                      transition: "transform 0.1s linear" // Faster transition for smooth scaling during scroll
                    }}
                  >
                    <Tilt
                      tiltMaxAngleX={20}
                      tiltMaxAngleY={20}
                      scale={1.1}
                      transitionSpeed={2500}
                      className={`relative w-full h-full [transform-style:preserve-3d] ${isActive ? "grayscale-0" : "opacity-40 grayscale"}`}
                    >
                      <Portal className="w-full h-full object-contain" isActive={isActive} />
                    </Tilt>
                  </div>
                </div>
                <span
                  // UPDATED: Absolute positioning to keep text inside the timeline strip
                  className={`absolute bottom-1 text-[8px] sm:text-[10px] md:text-xs font-bold tracking-tighter sm:tracking-widest font-['Orbitron'] transition-all duration-300 z-40 ${isActive ? "opacity-100 scale-105" : "text-white opacity-20"}`}
                  style={{
                    color: isActive ? portalColor : undefined,
                    textShadow: isActive ? `0 0 5px ${portalColor}44` : "none",
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