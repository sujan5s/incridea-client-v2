import React, { useState, useMemo } from "react";
import Masonry from "@mui/lab/Masonry";
import { motion } from "framer-motion";
import MasonryGlassCard from "./MasonryGlassCard";
import { ImageWithSkeleton } from "./Skeleton";
import ImageModal from "./ImageModal";

interface GalleryItem {
  id: string;
  url: string;
  ratio: string;
}

interface GallerySection {
  year: string;
  images: GalleryItem[];
}

interface MasonryGridProps {
  sections: GallerySection[];
  rotation: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ sections, rotation }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Flatten all images for easy navigation
  const allImages = useMemo(() => {
    return sections.flatMap((section) => section.images);
  }, [sections]);

  const handleImageClick = (imageId: string) => {
    const index = allImages.findIndex((img) => img.id === imageId);
    if (index !== -1) {
      setSelectedImageIndex(index);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < allImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
      <div
        className="w-full flex flex-col items-center pt-52 origin-top"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      >
        {sections.map((section) => (
          <section
            key={section.year}
            className="w-full max-w-4xl px-4 sm:px-6 mb-24 relative p-6 sm:p-8"
            style={{
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
            }}
          >
            <motion.h1
              className="font-['mocoSans'] font-bold text-3xl md:text-5xl mb-10 text-white text-center tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {section.year}
            </motion.h1>

            <Masonry columns={{ xs: 2, sm: 3, lg: 4 }} spacing={3} sx={{ margin: "0 auto" }}>
              {section.images.map((item) => (
                <MasonryGlassCard
                  key={item.id}
                  ratio={item.ratio}
                  onClick={() => handleImageClick(item.id)}
                >
                  <ImageWithSkeleton src={item.url} alt={item.id} />
                </MasonryGlassCard>
              ))}
            </Masonry>
          </section>
        ))}
      </div>

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={selectedImageIndex !== null}
        imageUrl={selectedImageIndex !== null ? allImages[selectedImageIndex].url : ""}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedImageIndex !== null && selectedImageIndex < allImages.length - 1}
        hasPrev={selectedImageIndex !== null && selectedImageIndex > 0}
      />
    </>
  );
};

export default MasonryGrid;
