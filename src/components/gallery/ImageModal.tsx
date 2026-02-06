import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    imageUrl,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev,
}) => {
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" && hasNext) onNext();
            if (e.key === "ArrowLeft" && hasPrev) onPrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

    // Ensure we only render on the client
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!mounted) return null;

    const glassCardStyle: React.CSSProperties = {
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
        WebkitBackdropFilter: "brightness(1.1) blur(1px)",
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full hover:bg-white/20"
                    >
                        <X size={24} />
                    </button>

                    {/* Container */}
                    <div
                        className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center outline-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Prev Button */}
                        {hasPrev && (
                            <button
                                onClick={onPrev}
                                className="absolute left-2 md:-left-12 text-white/70 hover:text-white transition-colors p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm z-10"
                            >
                                <ChevronLeft size={32} />
                            </button>
                        )}

                        {/* Image */}
                        <motion.div
                            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            style={{ maxHeight: "85vh", ...glassCardStyle }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, { offset }) => {
                                // Basic offset check as simpler fallback
                                if (offset.x > 50) {
                                    if (hasPrev) onPrev();
                                } else if (offset.x < -50) {
                                    if (hasNext) onNext();
                                }
                            }}
                        >
                            <img
                                src={imageUrl}
                                alt="Gallery Preview"
                                className="max-h-[85vh] w-auto object-contain rounded-[1.75rem] pointer-events-none" // pointer-events-none prevents image dragging ghost
                            />
                        </motion.div>

                        {/* Next Button */}
                        {hasNext && (
                            <button
                                onClick={onNext}
                                className="absolute right-2 md:-right-12 text-white/70 hover:text-white transition-colors p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm z-10"
                            >
                                <ChevronRight size={32} />
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default ImageModal;
