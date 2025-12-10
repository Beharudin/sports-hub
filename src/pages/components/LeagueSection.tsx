import { ChevronRight } from "lucide-react";
import MatchCard from "./MatchCard";
import type { TSEvent } from "../../constants/api";

interface Team {
  name: string;
  logo: string;
  score: string;
  aggregateScore?: number;
  badge?: string;
}

interface Match {
  id?: string;
  homeTeam: Team;
  awayTeam: Team;
  status: "FT" | "HT" | "LIVE" | "SCHEDULED";
  time?: string;
  minute?: number;
}

type Props =
  | { leagueName: string; matches: Match[] }
  | { league: string; events: TSEvent[] };

export default function LeagueSection(props: Props) {
  const leagueName = "leagueName" in props ? props.leagueName : props.league;
  const matches: Match[] =
    "matches" in props
      ? props.matches
      : props.events.map((e) => ({
          id: e.idEvent,
          homeTeam: {
            name: e.strHomeTeam,
            logo: e.strHomeTeamBadge || "",
            score: e.intHomeScore ?? "0",
          },
          awayTeam: {
            name: e.strAwayTeam,
            logo: e.strAwayTeamBadge || "",
            score: e.intAwayScore ?? "0",
          },
          status: (e.strStatus ?? "").toUpperCase().includes("FT")
            ? "FT"
            : (e.strStatus ?? "").toUpperCase().includes("HT")
            ? "HT"
            : e.intHomeScore != null || e.intAwayScore != null
            ? "LIVE"
            : "SCHEDULED",
          time: e.strTime ?? undefined,
          minute: (() => {
            const m = (e.strStatus ?? "").match(/\d+/);
            return m ? parseInt(m[0], 10) : undefined;
          })(),
        }));

  return (
    <div className="bg-[#1D1E2B] rounded-lg overflow-hidden w-full mx-auto">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-white/90 text-sm font-medium">{leagueName}</h3>
        <ChevronRight className="w-4 h-4 text-white/50" />
      </div>
      <div className="border-b border-[#292B41]">
        {matches.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </div>
    </div>
  );
}
