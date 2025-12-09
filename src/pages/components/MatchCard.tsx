import { Card } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import type { TSEvent } from "../../constants/api";

function statusColor(e: TSEvent) {
  if ((e.strStatus ?? "").toUpperCase().includes("FT")) return "bg-red-500";
  if ((e.strStatus ?? "").toUpperCase().includes("HT")) return "bg-amber-400";
  if (e.intHomeScore != null || e.intAwayScore != null) return "bg-emerald-500";
  return "bg-cyan-500";
}

export default function MatchCard({ event }: { event: TSEvent }) {
  const nav = useNavigate();
  const time =
    eTime(event) ?? (event.strTimestamp ? new Date(event.strTimestamp).toLocaleTimeString() : event.strTime ?? "");

  return (
    <Card
      role="button"
      onClick={() => nav(ROUTES.match(event.idEvent))}
      className="group relative mb-2 bg-card/60 hover:bg-card/80 transition-colors"
    >
      <div className="flex items-center gap-3 p-3">
        <div className={cn("w-1 rounded", statusColor(event))} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <TeamCell name={event.strHomeTeam} badge={event.strHomeTeamBadge} />
            <ScoreCell home={event.intHomeScore} away={event.intAwayScore} status={event.strStatus} />
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <TeamCell name={event.strAwayTeam} badge={event.strAwayTeamBadge} />
            <span className="opacity-75">{time}</span>
          </div>
        </div>
        <div className="ml-3 text-muted-foreground">›</div>
      </div>
    </Card>
  );
}

function TeamCell({ name, badge }: { name: string; badge?: string | null }) {
  return (
    <div className="flex items-center gap-2">
      {badge ? <img src={badge} alt={name} className="size-5 rounded-sm object-contain" /> : <div className="size-5 rounded-sm bg-muted" />}
      <span className="text-sm">{name}</span>
    </div>
  );
}

function ScoreCell({
  home,
  away,
  status,
}: {
  home: number | null;
  away: number | null;
  status: string | null;
}) {
  const isKnown = home != null && away != null;
  return (
    <div className="flex items-center gap-2">
      {isKnown ? (
        <div className="rounded bg-secondary/40 px-2 py-1 text-base font-semibold">{home} : {away}</div>
      ) : (
        <div className="rounded bg-secondary/30 px-2 py-1 text-xs">{status ?? "—"}</div>
      )}
    </div>
  );
}

function eTime(e: TSEvent) {
  if (e.strTimestamp) {
    const d = new Date(e.strTimestamp);
    if (!isNaN(d.getTime())) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return e.strTime || null;
}