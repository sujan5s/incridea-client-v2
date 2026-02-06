import { useEffect, useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineArrowLeft, AiOutlinePhone } from "react-icons/ai";

import {
  fetchPublishedEvent,
  type PublicEventDetail,
  type PublicEventType,
  type PublishedEventResponse,
} from "../api/public";
import { showToast } from "../utils/toast";
import EventRegistration from "../components/events/EventRegistration";
import EventDetails from "../components/events/EventDetails";
import { formatDate as formatDateIST } from "../utils/date";
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

function parseIdFromSlug(slug: string | undefined) {
  if (!slug) {
    return null;
  }
  const parts = slug.split("-");
  const maybeId = parts[parts.length - 1];
  const id = Number(maybeId);
  return Number.isFinite(id) ? id : null;
}

function formatTeamSize(min: number, max: number) {
  if (min === max) {
    if (min === 1) {
      return "Solo";
    }
    if (min === 0) {
      return "Open";
    }
    return `${min} per team`;
  }
  return `${min}-${max} per team`;
}

function formatEventType(eventType: PublicEventType) {
  if (eventType.includes("MULTIPLE")) {
    return "Multi-entry";
  }
  return eventType.toLowerCase().startsWith("team") ? "Team" : "Individual";
}

function EventDetailPage() {
  const { slug } = useParams();
  const eventId = useMemo(() => parseIdFromSlug(slug), [slug]);

  const { data, isLoading, isError, error } = useQuery<
    PublishedEventResponse,
    Error
  >({
    queryKey: ["public-event", eventId],
    queryFn: () => fetchPublishedEvent(eventId ?? 0),
    enabled: eventId !== null,
    staleTime: 5 * 60 * 1000,
  });

  // Toast for error
  useEffect(() => {
    if (error) {
      const message =
        error instanceof Error ? error.message : "Unable to load event";
      showToast(message, "error");
    }
  }, [error]);

  // Handle invalid slug or error
  if (eventId === null || (isError && !isLoading)) {
    return (
      <section className="space-y-4 max-w-5xl mx-auto p-4">
        <RouterLink
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
        >
          <AiOutlineArrowLeft /> Back to events
        </RouterLink>
        <div className="rounded-lg border border-red-900/50 bg-red-900/20 p-6 text-red-200">
          <h2 className="text-lg mb-2 font-moco font-bold">Event Not Found</h2>
          <p className="font-moco">
            We couldn't find the event you're looking for. It might have been
            removed or the link is incorrect.
          </p>
        </div>
      </section>
    );
  }

  // Loading state
  if (isLoading || !data) {
    return (
      <section className="space-y-4 max-w-5xl mx-auto p-4">
        <div className="h-8 w-32 animate-pulse rounded-md bg-slate-800"></div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 h-64 animate-pulse"></div>
      </section>
    );
  }

  const event: PublicEventDetail = data.event;

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0" />
      </div>
      <section className="relative min-h-screen w-full overflow-x-hidden">
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Macondo&family=Macondo+Swash+Caps&family=New+Rocker&display=swap');
          @keyframes glassShimmer {
            0% {
              transform: translateX(-120%);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.5;
            }
            90% {
              opacity: 0.3;
            }
            100% {
              transform: translateX(120%);
              opacity: 0;
            }
          }
          .wave-container {
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.16);
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.35), 
                        0 2px 8px rgba(0, 0, 0, 0.15),
                        inset 0 1px 2px rgba(255, 255, 255, 0.15),
                        inset 0 0px 16px rgba(255, 255, 255, 0.08);
            border-radius: 30px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 100%);
          }
          .wave-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 18%;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 100%);
            pointer-events: none;
            z-index: 5;
          }
          .wave-container::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            right: -50%;
            bottom: -50%;
            background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%);
            animation: glassShimmer 4s ease-in-out infinite;
            pointer-events: none;
            z-index: 2;
          }`}
        </style>

        <div className="relative mx-auto w-[95%] md:w-[72%] lg:w-[82%] xl:w-full max-w-[1000px] xl:max-w-6xl px-4 md:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
          <RouterLink
            to="/events"
            className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.25)] transition-all duration-300 cursor-target"
            title="Back to events"
          >
            <AiOutlineArrowLeft className="text-sky-300 text-lg sm:text-xl hover:text-sky-200" />
          </RouterLink>

          {/* GLASS CONTAINER: Event Header + Description + Coordinators */}
          <div style={glassCardStyle} className="w-full">
            {/* Event Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,340px)_1fr] gap-3 sm:gap-4 lg:gap-6 p-0 sm:p-2 lg:p-4 border-b border-white/10">
              {/* LEFT: Poster Card */}
              <div className="rounded-xl sm:rounded-2xl border border-white/15 overflow-hidden shadow-xl max-w-full">
                <div className="relative aspect-4/5 w-full bg-linear-to-b from-white/20 to-black/40">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/25 to-black/70 flex items-center justify-center text-black/40">
                      <div className="text-center text-sm">
                        <div className="font-semibold">Portrait</div>
                        <div>1080 × 1350 px (4:5)</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Event Info */}
              <div className="flex flex-col justify-between h-full">
                {/* Category & Title */}
                <div>
                  <div className="inline-block px-4 py-2 rounded-2xl bg-slate-700/40 border border-white/20 mb-3">
                    <p className="text-sm sm:text-base lg:text-lg uppercase tracking-wider text-yellow-400 font-bold italic font-moco">
                      {event.category?.replaceAll("_", " ")}
                    </p>
                  </div>
                  <h1
                    className="mt-1 sm:mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight font-moco"
                  >
                    {event.name}
                  </h1>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-6 gap-y-2 sm:gap-y-6">
                  <InfoPill
                    label="Event Type"
                    value={formatEventType(event.eventType)}
                  />
                  <InfoPill
                    label="Starts"
                    value={
                      event.rounds?.[0]?.date
                        ? formatDateIST(event.rounds[0].date)
                        : "TBD"
                    }
                  />
                  <InfoPill
                    label="Ends"
                    value={
                      event.rounds?.at(-1)?.date
                        ? formatDateIST(event.rounds.at(-1)!.date)
                        : "TBD"
                    }
                  />
                  <InfoPill
                    label="Team Size"
                    value={formatTeamSize(event.minTeamSize, event.maxTeamSize)}
                  />
                  <InfoPill label="Venue" value={event.venue ?? "TBA"} />
                  <InfoPill
                    label="Capacity"
                    value={event.maxTeams ? `${event.maxTeams}` : "Unlimited"}
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-1 sm:pt-2">
                  <EventRegistration
                    eventId={event.id}
                    type={event.eventType}
                  />
                </div>
              </div>
            </div>

            {/* Description + Coordinators Section */}
            <div className="px-2 sm:px-4 lg:px-6 py-6 sm:py-10 lg:py-12 space-y-8 sm:space-y-12 lg:space-y-16">
              {/* Description Section */}
              <div className="space-y-3 sm:space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-1 w-16 rounded-full bg-linear-to-r from-teal-500 to-cyan-500" />
                  <h2
                    className="text-2xl sm:text-4xl font-bold text-white text-center leading-tight font-moco"
                  >
                    Description
                  </h2>
                  <div className="h-1 w-16 rounded-full bg-linear-to-r from-teal-500 to-cyan-500" />
                </div>

                <div
                  className="prose prose-invert prose-slate max-w-none text-center"
                  style={{ fontFamily: "'Macondo', cursive" }}
                >
                  <EventDetails details={event.description ?? ""} />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

              {/* Event Coordinators Section */}
              <div className="space-y-3 sm:space-y-8">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-1 w-12 sm:w-16 rounded-full bg-linear-to-r from-pink-500 to-rose-500" />
                  <h2
                    className="text-lg sm:text-4xl font-bold text-white text-center leading-tight font-moco"
                  >
                    Event Coordinators
                  </h2>
                  <div className="h-1 w-12 sm:w-16 rounded-full bg-linear-to-r from-pink-500 to-rose-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 max-w-2xl mx-auto">
                  <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all">
                    <p className="text-base sm:text-lg font-semibold text-white font-moco">
                      Coordinator 1
                    </p>
                    <a
                      href="tel:+91 0000000000"
                      className="flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-pink-300 transition-colors group font-moco"
                    >
                      <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-pink-500/30 rounded group-hover:bg-pink-500/50 transition-colors">
                        <AiOutlinePhone className="text-pink-400 text-xs" />
                      </span>
                      <span>+91 0000000000</span>
                    </a>
                  </div>

                  <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all">
                    <p className="text-base sm:text-lg font-semibold text-white font-moco">
                      Coordinator 2
                    </p>
                    <a
                      href="tel:+91 0000000000"
                      className="flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-pink-300 transition-colors group font-moco"
                    >
                      <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-pink-500/30 rounded group-hover:bg-pink-500/50 transition-colors">
                        <AiOutlinePhone className="text-pink-400 text-xs" />
                      </span>
                      <span>+91 0000000000</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs sm:text-sm text-white/75 font-moco">{label}</div>
      <div className="mt-1 text-sm sm:text-base font-semibold text-white/95 font-moco">
        {value}
      </div>
    </div>
  );
}

export default EventDetailPage;
