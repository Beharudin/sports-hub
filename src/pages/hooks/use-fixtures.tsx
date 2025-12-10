import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { Api, type TSEvent } from "../../constants/api";

type Grouped = { league: string; events: TSEvent[] };

type UIState =
  | { kind: "ready" }
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string };

const DEFAULT_SOURCE: { type: "team" | "league"; id: number } = {
  type: "team",
  id: 133602,
};

function getErrorMessage(e: unknown) {
  if (typeof e === "string") return e;
  if (e && typeof e === "object" && "message" in e)
    return String((e as any).message);
  return "Failed to load data";
}

export function useFixtures(
  source: { type: "team" | "league"; id: number } = DEFAULT_SOURCE
) {
  const result: UseQueryResult<Grouped[]> = useQuery({
    queryKey: ["fixtures", source.type, source.id],
    queryFn: async () => {
      const res =
        source.type === "team"
          ? await Api.eventsNextByTeam(source.id)
          : await Api.eventsNextByLeague(source.id);
      return res.events ?? [];
    },
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
    retry: 2,
    retryDelay: (attempt) => Math.min(30000, 1000 * 2 ** attempt),
    placeholderData: [],
    refetchInterval: 15000,
    staleTime: 1000 * 15,
  });
  const isEmpty = result.isSuccess && result.data.length === 0;
  const uiState: UIState = result.isError
    ? { kind: "error", message: getErrorMessage(result.error) }
    : isEmpty
    ? { kind: "empty", message: "No upcoming fixtures" }
    : { kind: "ready" };
  return { ...result, isEmpty, uiState };
}
