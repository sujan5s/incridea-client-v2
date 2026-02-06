import React, { useState, useMemo, useRef, useEffect } from "react";

import { HorizontalTimeline } from "@/components/gallery/HorizontalTimeline";
import { Box } from "@mui/material";
import Carousel from "../components/gallery/Carousel";
import MasonryGrid from "../components/gallery/MasonryGrid";



const timelineItems = ["2018", "2019", "2020", "2022", "2023", "2024", "2025"];

const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTimelineVisible, setIsTimelineVisible] = useState(true);

  // REFERENCES
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const carouselSectionRef = useRef<HTMLDivElement | null>(null);
  const perspectiveRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const gallerySections = useMemo(
    () =>
      timelineItems.map((year) => ({
        year,
        images: Array.from({ length: 6 }, (_, i) => ({
          id: `${year}-${i}`,
          url: `https://picsum.photos/600/${[450, 600, 800][i % 3]}?random=${year}-${i}`,
          ratio: ["aspect-[4/3]", "aspect-square", "aspect-[3/4]"][i % 3],
        })),
      })),
    []
  );

  const NAVBAR_HEIGHT = 112;
  const TIMELINE_HEIGHT = 80;
  const SYNC_LINE = NAVBAR_HEIGHT + TIMELINE_HEIGHT;

  // SCROLL HANDLER
  useEffect(() => {
    const handleGlobalScroll = () => {
      if (perspectiveRef.current) {
        const centerY = window.scrollY + window.innerHeight / 2;
        perspectiveRef.current.style.perspectiveOrigin = `50% ${centerY}px`;
      }

      const galleryElement = galleryRef.current;
      if (!galleryElement) return;

      if (carouselSectionRef.current) {
        const rect = carouselSectionRef.current.getBoundingClientRect();
        setIsTimelineVisible(rect.top > SYNC_LINE + 20);
      }

      const sections = galleryElement.querySelectorAll("section");
      const step = 1 / (timelineItems.length - 1);

      let activeIdx = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= SYNC_LINE + 150) {
          activeIdx = index;
        }
      });

      setActiveIndex(activeIdx);

      const currentSection = sections[activeIdx];
      const nextSection = sections[activeIdx + 1];

      if (currentSection && nextSection) {
        const currRect = currentSection.getBoundingClientRect();
        const nextRect = nextSection.getBoundingClientRect();
        const totalDistance = nextRect.top - currRect.top;
        const progressToNext = (SYNC_LINE - currRect.top) / totalDistance;
        const clamped = Math.max(0, Math.min(1, progressToNext));
        setScrollProgress((activeIdx + clamped) * step);
      } else {
        setScrollProgress(activeIdx * step);
      }
    };

    window.addEventListener("scroll", handleGlobalScroll);
    handleGlobalScroll();
    return () => window.removeEventListener("scroll", handleGlobalScroll);
  }, [SYNC_LINE]);

  const handleTimelineClick = (index: number) => {
    const scrollContainer = scrollContainerRef.current;
    const galleryElement = galleryRef.current;
    if (!scrollContainer || !galleryElement) return;

    const sections = galleryElement.querySelectorAll("section");
    const targetSection = sections[index] as HTMLElement;

    if (targetSection) {
      const currentScroll = scrollContainer.scrollTop;
      const sectionRectTop = targetSection.getBoundingClientRect().top;
      const targetScrollTop = currentScroll + (sectionRectTop - SYNC_LINE) + 40;
      scrollContainer.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }
  };

  /* 🔥 LINEAR ROTATION LOGIC (25 to -25) */
  const rotation = 25 - (scrollProgress * 50);

  return (
    <div
      ref={galleryRef}
      className="relative w-full min-h-screen bg-transparent selection:bg-cyan-500/30"
    >
      <style>{`
        html, body {
          overflow-x: hidden !important;
          overflow-y: auto !important;
        }
        ::-webkit-scrollbar:horizontal {
          display: none;
        }
      `}</style>

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
      >
        <div className="absolute inset-0 " />
      </div>

      {/* TIMELINE */}
      <header
        className="fixed top-[112px] left-0 z-50 w-full transition-all duration-500"
        style={{
          top: `${NAVBAR_HEIGHT}px`,
          transform: isTimelineVisible ? "translateY(0)" : "translateY(-200%)",
          opacity: isTimelineVisible ? 1 : 0,
        }}
      >
        <div className="pointer-events-auto">
          <HorizontalTimeline
            items={timelineItems}
            activeIndex={activeIndex}
            onItemClick={handleTimelineClick}
            scrollProgress={scrollProgress}
          />
        </div>
      </header>

      {/* MASONRY */}
      <div
        ref={perspectiveRef}
        className="perspective-[1500px]"
        style={{ perspectiveOrigin: "50% 50vh" }}
      >
        <MasonryGrid sections={gallerySections} rotation={rotation} />
      </div>

      {/* CAROUSEL */}
      <section
        ref={carouselSectionRef}
        className="relative z-10 min-h-screen py-24 border-t border-white/5"
      >
        <div className="text-center">
          <h2 className="font-['Orbitron'] text-xl text-cyan-400 tracking-[0.4em] uppercase">
            Memories in Motion
          </h2>
          <div className="h-[2px] w-24 bg-cyan-500 mx-auto mt-2 rounded-full shadow-[0_0_15px_#06b6d4]" />
        </div>
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Carousel />
        </Box>
      </section>

    </div>
  );
};

export default Gallery;