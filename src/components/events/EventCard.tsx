import { MapPin, Calendar, Users } from "lucide-react";
import type { PublicEvent } from "../../api/public";
import { formatDate } from "../../utils/date";

const CATEGORY_THEMES = {
  TECHNICAL: {
    color: "#60a5fa",
    glow: "rgba(59, 130, 246, 0.5)",
    label: "TECH",
  },
  NON_TECHNICAL: {
    color: "#34d399",
    glow: "rgba(16, 185, 129, 0.5)",
    label: "NON-TECH",
  },
  CORE: { color: "#c084fc", glow: "rgba(168, 85, 247, 0.5)", label: "CORE" },
  SPECIAL: {
    color: "#fb7185",
    glow: "rgba(244, 63, 94, 0.5)",
    label: "SPECIAL",
  },
  DEFAULT: {
    color: "#cbd5e1",
    glow: "rgba(255, 255, 255, 0.2)",
    label: "EVENT",
  },
};

interface EventCardProps {
  event: PublicEvent;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const firstRoundWithDate = event.rounds.find((round) => round.date);
  const theme =
    CATEGORY_THEMES[event.category as keyof typeof CATEGORY_THEMES] ||
    CATEGORY_THEMES.DEFAULT;

  const teamSizeText =
    event.minTeamSize === event.maxTeamSize
      ? event.minTeamSize === 1
        ? "Solo"
        : `${event.minTeamSize} per team`
      : `${event.minTeamSize}-${event.maxTeamSize} per team`;

  const maskImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1452 2447'%3E%3Cpath d='M80 0h1292c44 0 80 36 80 80v2050c0 44-36 80-80 80h-480c-40 0-70 30-90 65-30 55-50 172-110 172H80c-44 0-80-36-80-80V80C0 36 36 0 80 0z'/%3E%3C/svg%3E")`;

  return (
    <div
      className={`flex items-center justify-center p-4 font-sans transition-all duration-500 hover:-translate-y-4 hover:z-50 ${
        index % 2 !== 0 ? "lg:mt-24" : "mt-0"
      }`}
      style={{
        animationName: `floating${(index % 3) + 1}, jitter`,
        animationDuration: `${4 + (index % 3)}s, ${3 + (index % 3)}s`,
        animationDelay: `${(index * 0.5) % 3}s, ${(index * 0.2) % 2}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}
    >
      <div className="relative w-[280px] aspect-[1452/2447.19] group">
        <div
          className="absolute inset-0 z-10"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <div className="flex h-full w-full flex-col border border-white/10 p-[16px_14px_8px] backdrop-blur-2xl transition-all duration-500 group-hover:border-white/30 bg-slate-900/40 overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 animate-shine bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%)] bg-[length:280%_100%]"
              style={{
                animationDuration: `${12 + (index % 6)}s`,
                animationDelay: `${(index * 2) % 8}s`,
              }}
            />

            <div className="relative mx-auto w-[94%] aspect-[1080/1350] rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
              <img
                src={
                  event.image ||
                  "https://www.shutterstock.com/image-vector/girl-holding-open-book-reading-600nw-1470580109.jpg"
                }
                alt={event.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            <div className="ml-1 mt-3 mb-1 text-[13px] font-bold uppercase tracking-[1.2px] text-white/90 truncate shrink-0">
              {event.name}
            </div>

            <div className="mt-auto space-y-1.5 pb-8 px-1">
              <div className="flex h-7 w-full items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 backdrop-blur-sm text-white shrink-0">
                <Calendar size={12} className="opacity-70 shrink-0" />
                <span className="text-[10px] font-medium tracking-wide truncate">
                  {firstRoundWithDate
                    ? formatDate(firstRoundWithDate.date)
                    : "TBD"}
                </span>
              </div>

              <div className="flex h-7 w-full items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 backdrop-blur-sm text-white shrink-0">
                <Users size={12} className="opacity-70 shrink-0" />
                <span className="text-[10px] font-medium tracking-wide truncate">
                  {teamSizeText}
                </span>
              </div>

              <div className="flex h-7 w-fit min-w-[90px] items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 backdrop-blur-sm text-white shrink-0">
                <MapPin size={12} className="opacity-70 shrink-0" />
                <span className="text-[10px] font-medium tracking-wide truncate">
                  {event.venue || "NITTE"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-[2.5%] right-[8%] text-[9px] tracking-[0.3em] font-black select-none pointer-events-none z-20 transition-all duration-700 uppercase"
          style={{
            color: theme.color,
            textShadow: `0 0 10px ${theme.glow}`,
            filter: `drop-shadow(0 0 2px ${theme.glow})`,
          }}
        >
          {theme.label}
        </div>
      </div>

      <style>{`
        @keyframes shine { 
          0% { background-position: 200% 0; } 
          100% { background-position: -200% 0; } 
        }
        .animate-shine { 
          animation-name: shine;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        /* High Intensity Chaos / Jitter Effect */
        @keyframes jitter {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-4px, 3px) rotate(-1deg); }
          40% { transform: translate(4px, -2px) rotate(1deg); }
          60% { transform: translate(-3px, -4px) rotate(-0.5deg); }
          80% { transform: translate(3px, 4px) rotate(0.5deg); }
        }

        @keyframes floating1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes floating2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floating3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>
    </div>
  );
};

export default EventCard;