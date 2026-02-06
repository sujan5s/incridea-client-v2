import React, { useState, useEffect } from 'react';
import portal1 from '../assets/pp.png';
import portal2 from '../assets/pp2.png';
import portal3 from '../assets/pp3.png';
import portal4 from '../assets/pp4.png';

const Portal = ({ className = "", isActive = false }: { className?: string; isActive?: boolean }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [portal1, portal2, portal3, portal4];

    useEffect(() => {
        if (!isActive) {
            setCurrentImage(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 150); // Adjust speed as needed

        return () => clearInterval(interval);
    }, [images.length, isActive]);

    return (
        <div
            className={`relative flex items-center justify-center pointer-events-none ${className}`}
            aria-hidden="true"
        >
            <img
                src={images[currentImage]}
                alt="Portal Animation"
                className="w-full h-full object-contain"
            />
        </div>
    );
};

export default React.memo(Portal);
