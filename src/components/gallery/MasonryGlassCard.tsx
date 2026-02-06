import React from "react";
import Tilt from "react-parallax-tilt";

interface MasonryGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    ratio?: string;
    onClick?: () => void;
}

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

// ... (existing interfaces and styles)

const MasonryGlassCard: React.FC<MasonryGlassCardProps> = ({
    children,
    className = "",
    ratio = "aspect-square",
    style,
    onClick,
    ...props
}) => {
    const CardContent = (
        <>
            {/* SHINE EFFECT */}
            <div className="absolute inset-0 z-10 translate-x-[-100%] group-hover:animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000" />

            {/* CONTENT */}
            <div className="relative z-0 h-full w-full">
                {children}
            </div>

            {/* OVERLAY ON HOVER (Optional Tint) - Kept consistent with previous design but lighter */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-cyan-500/0 group-hover:bg-cyan-500/05 transition-colors duration-500" />
        </>
    );

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer ${className} ${ratio}`}
            {...props}
        >
            <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.02}
                transitionSpeed={2500}
                className="group relative w-full h-full overflow-hidden"
                style={{ ...glassCardStyle, ...style }}
            >
                {CardContent}
            </Tilt>
        </div>
    );
};

export default MasonryGlassCard;
