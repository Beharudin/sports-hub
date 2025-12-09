import LeagueSection from "./LeagueSection";
import type { TSEvent } from "../../constants/api";

interface Team {
  name: string;
  logo: string;
  score: number;
  aggregateScore?: number;
  badge?: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  status: "FT" | "HT" | "LIVE" | "SCHEDULED";
  time?: string;
  minute?: number;
  phase?: string;
}

interface LeagueGroup {
  leagueName: string;
  matches: Match[];
}

export default function MatchesList({ groups }: { groups: LeagueGroup[] }) {
  return (
    <div className="space-y-6 w-full max-w-5xl">
      {groups.map((g, idx) => (
        <LeagueSection key={idx} leagueName={g.leagueName} matches={g.matches} />
      ))}
    </div>
  );
}

export function adaptEventGroupsToMatches(
  eventGroups: { league: string; events: TSEvent[] }[]
): LeagueGroup[] {
  return eventGroups.map((group) => ({
    leagueName: group.league,
    matches: group.events.map((e) => {
      const rawStatus = (e.strStatus ?? "").toUpperCase();
      const isFT = rawStatus.includes("FT");
      const isHT = rawStatus.includes("HT");
      const isHalf = rawStatus === "1H" || rawStatus === "2H";
      const hasScore = e.intHomeScore != null || e.intAwayScore != null;
      const status: "FT" | "HT" | "LIVE" | "SCHEDULED" = isFT
        ? "FT"
        : isHT
        ? "HT"
        : isHalf || hasScore
        ? "LIVE"
        : "SCHEDULED";

      const homeScore = e.intHomeScore == null ? 0 : Number(e.intHomeScore);
      const awayScore = e.intAwayScore == null ? 0 : Number(e.intAwayScore);

      const time = (() => {
        if (e.strTimestamp) {
          const d = new Date(e.strTimestamp);
          if (!isNaN(d.getTime())) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }
        return e.strTime ?? undefined;
      })();

      const minute = (() => {
        const m = (e.strStatus ?? "").match(/(\d{2,})(?=')/);
        return m ? parseInt(m[1], 10) : undefined;
      })();

      return {
        homeTeam: {
          name: e.strHomeTeam,
          logo: e.strHomeTeamBadge || "",
          score: homeScore,
        },
        awayTeam: {
          name: e.strAwayTeam,
          logo: e.strAwayTeamBadge || "",
          score: awayScore,
        },
        status,
        time,
        minute,
        phase: isHalf ? rawStatus : undefined,
      } as Match;
    }),
  }));
}