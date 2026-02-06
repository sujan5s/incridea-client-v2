import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineSearch } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import {
  type EventDayConfig,
  type PublicEvent,
  type PublicEventCategory,
  fetchPublishedEvents,
} from "../api/public";
import EventPreviewCard from "../components/events/EventCard";

import LiquidGlassCard from "../components/liquidglass/LiquidGlassCard";

const CATEGORY_FILTERS: (PublicEventCategory | "ALL")[] = [
  "ALL",
  "TECHNICAL",
  "NON_TECHNICAL",
  "CORE",
  "SPECIAL",
];

const DAY_FILTERS = [
  { label: "Day 1", key: "day1" },
  { label: "Day 2", key: "day2" },
  { label: "Day 3", key: "day3" },
  { label: "Day 4", key: "day4" },
] as const;

type DayFilterLabel = (typeof DAY_FILTERS)[number]["label"] | "All";
type EventDayKey = keyof EventDayConfig;

function isSameUtcDay(left: Date, right: Date) {
  return (
    left.getUTCFullYear() === right.getUTCFullYear() &&
    left.getUTCMonth() === right.getUTCMonth() &&
    left.getUTCDate() === right.getUTCDate()
  );
}

function toSlug(event: PublicEvent) {
  const base = event.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${event.id}`;
}



function EventsPage() {
  const [categoryFilter, setCategoryFilter] = useState<
    PublicEventCategory | "ALL"
  >("ALL");
  const [dayFilter] = useState<DayFilterLabel>("All");
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["published-events"],
    queryFn: fetchPublishedEvents,
  });

  const dayConfig = data?.days;
  const events = data?.events || [];

  const activeDayKey = useMemo<EventDayKey | null>(() => {
    if (dayFilter === "All") return null;
    const mapping = DAY_FILTERS.find((item) => item.label === dayFilter);
    return mapping ? (mapping.key as EventDayKey) : null;
  }, [dayFilter]);

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    const searchTerm = query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesQuery = event.name.toLowerCase().includes(searchTerm);
      const matchesCategory =
        categoryFilter === "ALL" || event.category === categoryFilter;
      
      const selectedDayLabel = DAY_FILTERS.find((d) => d.label === dayFilter);
      let matchesDay = true;
      if (dayFilter !== "All" && selectedDayLabel) {
         // Map day1 to Day1, day2 to Day2 etc.
         const dayEnum = selectedDayLabel.key.replace("day", "Day"); 
         if (event.day && Array.isArray(event.day)) {
            matchesDay = event.day.includes(dayEnum as any);
         } else {
             // Fallback or legacy check if day is somehow missing (though it shouldn't be with proper types)
             const selectedDayIso = activeDayKey ? dayConfig?.[activeDayKey] ?? null : null;
             matchesDay = !selectedDayIso
             ? true
             : event.rounds.some((round) => {
                 if (!round.date) return false;
                 return isSameUtcDay(new Date(round.date), new Date(selectedDayIso));
               });
         }
      }

      return matchesQuery && matchesCategory && matchesDay;
    });
  }, [dayConfig, events, categoryFilter, activeDayKey, query, dayFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading events. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 " />
      </div>

      <section className="space-y-8 max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <header className="space-y-2">
          <p className="text-sky-400 uppercase text-[10px] tracking-[0.2em] font-bold font-moco">
            Discover
          </p>
          <h1 className="text-4xl font-moco font-bold text-white tracking-tight">
            Events
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl font-moco">
            Explore the upcoming challenges. Filter by category or day to find
            your perfect match.
          </p>
        </header>

        <LiquidGlassCard className="rounded-2xl space-y-4 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <AiOutlineSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all"
                placeholder="Search events..."
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                 <span className="text-sm font-semibold text-slate-400">Category:</span>
                 <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as PublicEventCategory | "ALL")}
                    className="bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all"
                  >
                    {CATEGORY_FILTERS.map((category) => (
                      <option key={category} value={category}>
                        {category === "ALL" ? "All" : category.replace("_", " ")}
                      </option>
                    ))}
                  </select>
              </div>
            </div>
          </div>
        </LiquidGlassCard>

        <div className="grid gap-x-6 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {filteredEvents.map((event, index) => (
            <RouterLink
              key={event.id}
              to={`/events/${toSlug(event)}`}
              className="w-full flex justify-center"
            >
              <EventPreviewCard event={event} index={index} />
            </RouterLink>
          ))}
        </div>
      </section>
    </>
  );
}

export default EventsPage;
