export const API_BASE = "https://www.thesportsdb.com/api/v1/json/3";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const Api = {
  eventsNextByTeam: (teamId: number) =>
    fetchJSON<{ events: TSEvent[] }>(`${API_BASE}/eventsnext.php?id=${teamId}`),
  eventsNextByLeague: (leagueId: number) =>
    fetchJSON<{ events: TSEvent[] }>(
      `${API_BASE}/eventsnextleague.php?id=${leagueId}`
    ),
  lookupEvent: (eventId: string) =>
    fetchJSON<{ events: EventDetails[] }>(
      `${API_BASE}/lookupevent.php?id=${eventId}`
    ),
};

export type TSEvent = {
  idEvent: string;
  strEvent: string | null;
  strLeague: string | null;
  strSeason: string | null;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strTimestamp: string | null;
  dateEvent: string | null;
  strTime: string | null;
  strStatus: string | null;
  strHomeTeamBadge?: string | null;
  strAwayTeamBadge?: string | null;
};

export type EventDetails = TSEvent & {
  strHomeGoalDetails?: string | null;
  strAwayGoalDetails?: string | null;
  strHomeRedCards?: string | null;
  strAwayRedCards?: string | null;
  strHomeYellowCards?: string | null;
  strAwayYellowCards?: string | null;
  strHomeLineupSubstitutes?: string | null;
  strAwayLineupSubstitutes?: string | null;
};
