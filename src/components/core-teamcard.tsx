import LiquidGlassCard from './liquidglass/LiquidGlassCard';

interface CoreTeamCardProps {
    imageSrc?: string;
    title?: string;
    subtitle?: string;
    className?: string;
}

const CoreTeamCard: React.FC<CoreTeamCardProps> = ({
    imageSrc,
    title = "Card Title",
    subtitle = "Card Subtitle",
    className = "",
}) => {
    return (
        <div className={`relative group ${className}`}>
            <div
                className="w-72 h-96 rounded-[40px] overflow-visible flex flex-col items-center pt-8 pb-6 px-4 relative z-10 gap-6"
            >
                {/* 1. Large Profile Circle - Using LiquidGlassCard */}
                <div className="relative w-60 h-60 flex items-center justify-center shrink-0">
                    <LiquidGlassCard className="w-full h-full !rounded-full !p-1 flex items-center justify-center overflow-hidden">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={title}
                                className="w-full h-full rounded-full object-cover transition-transform duration-500 ease-out scale-110 group-hover:scale-100"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                        )}
                    </LiquidGlassCard>

                    {/* 2. Social Icon */}
                    <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors shadow-lg z-20 group/icon cursor-target">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mix-blend-difference">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </div>
                </div>

                {/* 3. Name Pill (Bottom) - Using LiquidGlassCard only for Title */}
                <div className="w-full shrink-0 flex flex-col items-center gap-3">
                    <LiquidGlassCard className="w-full !rounded-full !p-4 flex flex-col items-center justify-center shadow-lg group-hover:bg-white/5 transition-colors">
                        <h3 className="text-white font-bold tracking-wide text-lg leading-tight text-center font-moco">{title}</h3>
                    </LiquidGlassCard>

                    {/* Designation / Subtitle - Glass Text Effect */}
                    <p
                        className="text-white/80 text-[10px] font-semibold uppercase tracking-widest text-center font-moco"

                    >
                        {subtitle}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default CoreTeamCard;
