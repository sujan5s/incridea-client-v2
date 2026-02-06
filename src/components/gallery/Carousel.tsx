import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CarouselItem {
  id: string;
  videoId: string;
  title: string;
}

const videoData: CarouselItem[] = [
  { id: "1", videoId: "X9f_WycXE7o", title: "Thumbnail 1" },
  { id: "2", videoId: "YoWeuaSMytk", title: "Thumbnail 2" },
  { id: "3", videoId: "8Veb3u0xEoE", title: "Thumbnail 3" },
  { id: "4", videoId: "JHgT5PzLc4Q", title: "Thumbnail 4" },
  { id: "5", videoId: "w0phDNAnUgA", title: "Thumbnail 5" },
  { id: "6", videoId: "gmF72fu1w6A", title: "Thumbnail 6" },
  { id: "7", videoId: "GqqK4c2rDhM", title: "Thumbnail 7" },
];

interface CarouselProps {
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ 
  currentIndex: externalIndex, 
  onIndexChange 
}) => {
  const [currentIndex, setCurrentIndex] = useState(externalIndex ?? 3);

  // Sync with external index if provided
  useEffect(() => {
    if (externalIndex !== undefined && externalIndex !== currentIndex) {
      setCurrentIndex(externalIndex);
    }
  }, [externalIndex]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null); // Ref to capture wheel events locally
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const [bp, setBp] = useState<"sm" | "md" | "lg">("lg");
  const autoPlayTimer = useRef<number | null>(null);
  const AUTO_PLAY_DELAY = 5000;
  

  useEffect(() => {
    const updateBP = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "sm" : w < 1024 ? "md" : "lg");
    };
    updateBP();
    window.addEventListener("resize", updateBP);
    return () => window.removeEventListener("resize", updateBP);
  }, []);

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % videoData.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [currentIndex, onIndexChange]);

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + videoData.length) % videoData.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [currentIndex, onIndexChange]);

  // Autoplay logic with reset on interaction
  const resetAutoplay = useCallback(() => {
    if (autoPlayTimer.current) {
      window.clearTimeout(autoPlayTimer.current);
    }
    autoPlayTimer.current = window.setTimeout(() => {
      if (!selectedVideo) {
        nextSlide();
      }
      resetAutoplay(); // loop again
    }, AUTO_PLAY_DELAY);
  }, [nextSlide, selectedVideo]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoPlayTimer.current) {
        window.clearTimeout(autoPlayTimer.current);
      }
    };
  }, [resetAutoplay]);

  // Updated Scroll wheel logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If a video is playing in the modal, allow normal behavior or return
      if (selectedVideo) return;
      // Only handle scroll if hovering over the carousel
      if (!isHovered) return;

      // PREVENT VERTICAL PAGE SCROLL
      e.preventDefault();
      resetAutoplay();

      // Trigger carousel movement instead
      if (e.deltaY > 0) nextSlide();
      else prevSlide();
    };

    const element = carouselRef.current;
    if (element) {
      // We use { passive: false } to allow e.preventDefault() to work
      element.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
    };
  }, [selectedVideo, nextSlide, prevSlide, isHovered]);

  // Hide target cursor when video modal is open
  useEffect(() => {
    const body = document.body;
    if (selectedVideo) {
      body.classList.add("hide-target-cursor");
    } else {
      body.classList.remove("hide-target-cursor");
    }

    return () => {
      body.classList.remove("hide-target-cursor");
    };
  }, [selectedVideo]);

  const getItemStyle = (index: number) => {
    const offset = index - currentIndex;
    const isCenter = offset === 0;
    const isRight = offset === 1 || offset === -(videoData.length - 1);
    const isLeft = offset === -1 || offset === videoData.length - 1;

    const cfg =
      bp === "lg"
        ? { near: 300, far: 500, scaleCenter: 1.1, scaleSide: 0.8, rot: 30 }
        : bp === "md"
          ? { near: 220, far: 380, scaleCenter: 1.07, scaleSide: 0.85, rot: 25 }
          : { near: 140, far: 240, scaleCenter: 1.03, scaleSide: 0.9, rot: 20 };

    if (isCenter) {
      return {
        transform: `translateX(0) scale(${cfg.scaleCenter}) translateZ(100px)`,
        zIndex: 10,
        opacity: 1,
        filter: "grayscale(0%)",
      };
    } else if (isRight) {
      return {
        transform: `translateX(${cfg.near}px) scale(${cfg.scaleSide}) rotateY(-${cfg.rot}deg)`,
        zIndex: 5,
        opacity: 0.6,
        filter: "grayscale(80%)",
      };
    } else if (isLeft) {
      return {
        transform: `translateX(-${cfg.near}px) scale(${cfg.scaleSide}) rotateY(${cfg.rot}deg)`,
        zIndex: 5,
        opacity: 0.6,
        filter: "grayscale(80%)",
      };
    } else {
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translateX(${dir * cfg.far}px) scale(${Math.min(cfg.scaleSide, 0.75)}) rotateY(${dir * -45}deg)`,
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <div className="relative min-h-fit w-full flex items-center justify-center overflow-hidden font-sans">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px)
          `,
          backgroundSize: "550px 550px, 350px 350px",
          backgroundPosition: "0 0, 50px 50px",
        }}
      />
      {/* Added ref={carouselRef} here to capture local scrolling */}
      <div
        ref={carouselRef}
        className="carousel-container relative z-10 w-full max-w-[1200px] h-[60vh] md:h-[600px] flex flex-col items-center justify-center [perspective:1000px]"
      >
        {/* Scrolling happens only when hovering over the carousel */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={(e) => {
            resetAutoplay();
            touchStartX.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0]?.clientX ?? null;
            if (touchStartX.current != null && endX != null) {
              const dx = endX - touchStartX.current;
              if (dx > 40) prevSlide();
              else if (dx < -40) nextSlide();
            }
            touchStartX.current = null;
          }}
          className=" relative w-full h-[35vh] md:h-[400px] flex items-center justify-center [transform-style:preserve-3d]"
        >
          {videoData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                if (index === currentIndex) setSelectedVideo(item.videoId);
                else {
                  setCurrentIndex(index);
                  onIndexChange?.(index);
                }
              }}
              className="absolute w-[80vw] max-w-[500px] aspect-video rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black select-none"
              style={getItemStyle(index)}
            >
              <img
                src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                alt={item.title}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 w-[90%] max-w-[350px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-[50px] flex justify-between items-center px-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-20">
          <button
            onClick={() => {
              prevSlide();
              resetAutoplay();
            }}
            className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => {
              nextSlide();
              resetAutoplay();
            }}
            className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-[95%] md:max-w-[900px] aspect-video bg-black shadow-[0_0_30px_rgba(90,100,255,0.3)] rounded-lg overflow-hidden animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors flex items-center gap-1 font-bold"
            >
              <X size={30} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setSelectedVideo(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;
