import { useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { useMatchDetails } from "../hooks/use-match-details";

export default function MatchDetailsPage() {
  const { id = "" } = useParams();
  const { data } = useMatchDetails(id);
  const event = data?.event;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {event ? (
        <>
          <Header event={event} />
          <Tabs defaultValue="events" className="mt-4">
            <TabsList className="bg-secondary/30">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="odds">Odds</TabsTrigger>
              <TabsTrigger value="lineups">Lineups</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="events" className="mt-4">
              <EventsTimeline />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="text-sm opacity-70">Loading match…</div>
      )}
    </div>
  );
}

function Header({
  event,
}: {
  event: {
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: number | null;
    intAwayScore: number | null;
    strHomeTeamBadge?: string | null;
    strAwayTeamBadge?: string | null;
    strLeague: string | null;
    strStatus: string | null;
  };
}) {
  return (
    <Card className="bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs text-muted-foreground">{event.strLeague ?? ""}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Team name={event.strHomeTeam} badge={event.strHomeTeamBadge} />
          <div className="text-center">
            <div className="text-2xl font-bold">
              {event.intHomeScore ?? "–"} <span className="opacity-70">:</span> {event.intAwayScore ?? "–"}
            </div>
            <div className="text-xs text-muted-foreground">{event.strStatus ?? ""}</div>
          </div>
          <Team name={event.strAwayTeam} badge={event.strAwayTeamBadge} />
        </div>
      </CardContent>
    </Card>
  );
}

function Team({ name, badge }: { name: string; badge?: string | null }) {
  return (
    <div className="flex items-center gap-3">
      {badge ? (
        <img src={badge} alt={name} className="size-10 rounded bg-muted object-contain" />
      ) : (
        <div className="size-10 rounded bg-muted" />
      )}
      <div className="text-sm">{name}</div>
    </div>
  );
}

function EventsTimeline() {
  // The hook's `select` builds and sorts a simple timeline from available details
  const { id = "" } = useParams();
  const { data } = useMatchDetails(id);
  const items = data?.timeline ?? [];

  return (
    <Card className="bg-card/60">
      <CardHeader>
        <CardTitle className="text-sm">Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-muted" />
          <ul className="space-y-5">
            {items.map((ev, i) => (
              <li key={i} className="flex items-center justify-between">
                <SideEvent side="home" ev={ev} />
                <div className="text-xs text-muted-foreground">{ev.minute ?? "—’"}</div>
                <SideEvent side="away" ev={ev} />
              </li>
            ))}
            {items.length === 0 && (
              <div className="text-sm text-muted-foreground">No structured timeline available. Layout preserved.</div>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function SideEvent({
  side,
  ev,
}: {
  side: "home" | "away";
  ev: { side: "home" | "away"; player: string; type: "goal" | "yellow" | "red" | "sub" };
}) {
  const isVisible = ev.side === side;
  const color =
    ev.type === "goal" ? "bg-emerald-500/20 text-emerald-300" :
    ev.type === "yellow" ? "bg-amber-500/20 text-amber-300" :
    ev.type === "red" ? "bg-red-500/20 text-red-300" :
    "bg-sky-500/20 text-sky-300";

  return (
    <div className={cn("w-2/5 rounded px-3 py-1 text-xs", isVisible ? color : "opacity-20")}>
      {isVisible ? `${ev.player}` : ""}
    </div>
  );
}