import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { useMemo, useState, useRef, useEffect } from "react";

type DayItem = {
  labelTop: string; // e.g., WED
  labelBottom: string; // e.g., 31 JUL
  date: Date;
  isToday: boolean;
};

function formatDay(d: Date): DayItem {
  const top = d.toLocaleDateString([], { weekday: "short" }).toUpperCase();
  const day = d.getDate().toString();
  const month = d.toLocaleDateString([], { month: "short" }).toUpperCase();
  return {
    labelTop: top,
    labelBottom: `${day} ${month}`,
    date: d,
    isToday: isSameDay(d, new Date()),
  };
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarBar() {
  const [anchor, setAnchor] = useState(new Date());
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const arr: DayItem[] = [];
    for (let i = -2; i <= 2; i++) {
      const d = new Date(anchor);
      d.setDate(anchor.getDate() + i);
      arr.push(formatDay(d));
    }
    return arr;
  }, [anchor]);

  useEffect(() => {
    const sc = scrollerRef.current;
    const content = contentRef.current;
    if (!sc || !content) return;
    const idx = days.findIndex((d) => d.isToday);
    const buttons = content.querySelectorAll("button");
    const target = buttons[idx] as HTMLElement | undefined;
    if (target) {
      const left =
        target.offsetLeft + target.offsetWidth / 2 - sc.clientWidth / 2;
      sc.scrollTo({ left, behavior: "auto" });
    }
  }, [days]);

  const goPrev = () =>
    setAnchor((a) => {
      const d = new Date(a);
      d.setDate(a.getDate() - 1);
      return d;
    });

  const goNext = () =>
    setAnchor((a) => {
      const d = new Date(a);
      d.setDate(a.getDate() + 1);
      return d;
    });

  return (
    <div className="mx-auto max-w-5xl mt-20 w-full">
      <h2 className="hidden md:block text-[20px] leading-[26px] font-semibold mb-2">
        Matches
      </h2>
      <Card className="hidden md:flex items-center justify-between bg-[#1D1E2B] h-12 px-3 rounded-xl">
        <button
          className="rounded-md px-2 py-2 hover:bg-white/10 text-white"
          aria-label="Previous"
          onClick={goPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 text-sm text-white">
          <CalendarDays className="h-4 w-4" />
          <span>Today</span>
        </div>
        <button
          className="rounded-md px-2 py-2 hover:bg-white/10 text-white"
          aria-label="Next"
          onClick={goNext}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </Card>

      {/* Mobile scroller */}
      <div className="md:hidden mt-2 flex items-center justify-between rounded-xl px-2 py-2">
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 w-full relative">
            <div className="absolute left-0 h-16 bg-[#0D0E16] z-20 opacity-70 pointer-events-none" style={{ width: "20%" }}></div>
            <div className="absolute h-16 bg-[#0D0E16] z-20 opacity-50 pointer-events-none" style={{ left: "25%", width: "12%" }}></div>
            <div className="absolute right-0 h-16 bg-[#0D0E16] z-20 opacity-70 pointer-events-none" style={{ width: "20%" }}></div>
            <div className="absolute h-16 bg-[#0D0E16] z-20 opacity-50 pointer-events-none" style={{ right: "20%", width: "12%" }}></div>
            {days.map((d) => (
              <button
                key={d.date.toISOString()}
                className={cn(
                  "flex-[0_0_20%] h-14 rounded-md px-2 py-1 text-center",
                  d.isToday && "bg-[#1D1E2B]"
                )}
              >
                <div
                  className={cn(
                    "text-[10px] leading-4 opacity-70",
                    d.isToday && "text-emerald-300 opacity-100"
                  )}
                >
                  {d.isToday ? "Today" : d.labelTop}
                </div>
                <div
                  className={cn(
                    "text-[11px] font-medium",
                    d.isToday && "text-emerald-300"
                  )}
                >
                  {d.labelBottom}
                </div>
              </button>
            ))}
          </div>
        </div>
        <button
          className="ml-2 w-10 h-10 rounded-full bg-[#181921] text-emerald-300 flex items-center justify-center"
          aria-label="Open calendar"
        >
          <CalendarDays className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
