import { useQuery } from "@tanstack/react-query";
import { Api, type TSEvent } from "../../constants/api";

type Grouped = { league: string; events: TSEvent[] };

const DEFAULT_SOURCE: { type: "team" | "league"; id: number } = {
  type: "team",
  id: 133602,
};

export function useFixtures(
  source: { type: "team" | "league"; id: number } = DEFAULT_SOURCE
) {
  return useQuery({
    queryKey: ["fixtures", source.type, source.id],
    queryFn: async () => {
      const res =
        source.type === "team"
          ? await Api.eventsNextByTeam(source.id)
          : await Api.eventsNextByLeague(source.id);
      return res.events ?? [];
    },
    refetchInterval: 15000,
    staleTime: 1000 * 15,
    select: (events): Grouped[] => {
      const byLeague = new Map<string, TSEvent[]>();
      events.forEach((e) => {
        const key = e.strLeague ?? "Unknown League";
        if (!byLeague.has(key)) byLeague.set(key, []);
        byLeague.get(key)!.push(e);
      });
      return Array.from(byLeague.entries()).map(([league, list]) => ({
        league,
        events: list,
      }));
    },
  });
}