import React, { useState } from "react";
import { Box, Skeleton as MuiSkeleton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface ImageProps {
  src: string;
  alt: string;
  height?: number; // Made optional with "?"
  className?: string; // Added to allow Tailwind classes
}

/**
 * ImageWithSkeleton component handles the "Dimension Shift" loading state.
 */
export const ImageWithSkeleton: React.FC<ImageProps> = ({
  src,
  alt,
  height,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box
      className={className} // Pass through classes like aspect-ratio
      sx={{
        position: "relative",
        width: "100%",
        // If height prop exists, use it. Otherwise, use 100% (to fill the aspect-ratio Box).
        height: height ? height : "100%",
        overflow: "hidden",
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        borderRadius: "inherit",
      }}
    >
      {/* Skeleton Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="skeleton-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            <MuiSkeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              sx={{
                bgcolor: "rgba(15, 23, 42, 0.8)",
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.1), transparent)",
                borderRadius: "inherit",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Materializing Image */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.1,
          filter: isLoaded ? "blur(0px)" : "blur(10px)",
        }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: "inherit",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
