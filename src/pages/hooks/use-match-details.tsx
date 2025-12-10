import { useQuery } from "@tanstack/react-query";
import { Api, type EventDetails } from "../../constants/api";

export type TimelineEvent = {
  minute: number | null;
  player: string;
  side: "home" | "away";
  type: "goal" | "yellow" | "red" | "sub";
};

type UIState =
  | { kind: "ready" }
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string };

function parseDetailString(
  s: string | null | undefined,
  side: "home" | "away",
  type: TimelineEvent["type"]
): TimelineEvent[] {
  if (!s) return [];
  return s
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((entry) => {
      const [minuteStr, ...rest] = entry.split(":");
      const player = rest.join(":").trim();
      const minute = Number(minuteStr);
      return {
        minute: Number.isFinite(minute) ? minute : null,
        player,
        side,
        type,
      };
    });
}

function getErrorMessage(e: unknown) {
  if (typeof e === "string") return e;
  if (e && typeof e === "object" && "message" in e)
    return String((e as any).message);
  return "Failed to load match details";
}

export function useMatchDetails(id: string) {
  const result = useQuery<
    EventDetails | undefined,
    Error,
    { event: EventDetails | undefined; timeline: TimelineEvent[] }
  >({
    queryKey: ["match", id],
    queryFn: async () => {
      const res = await Api.lookupEvent(id);
      return res.events?.[0] as EventDetails | undefined;
    },
    select: (event) => {
      if (!event) return { event: undefined, timeline: [] as TimelineEvent[] };
      const timeline: TimelineEvent[] = [
        ...parseDetailString(event.strHomeGoalDetails, "home", "goal"),
        ...parseDetailString(event.strAwayGoalDetails, "away", "goal"),
        ...parseDetailString(event.strHomeYellowCards, "home", "yellow"),
        ...parseDetailString(event.strAwayYellowCards, "away", "yellow"),
        ...parseDetailString(event.strHomeRedCards, "home", "red"),
        ...parseDetailString(event.strAwayRedCards, "away", "red"),
      ].sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0));
      return { event, timeline };
    },
    enabled: !!id,
    retry: 2,
    retryDelay: (attempt) => Math.min(30000, 1000 * 2 ** attempt),
    placeholderData: undefined,
    refetchInterval: 15000,
    staleTime: 1000 * 15,
  });
  const isEmpty =
    result.isSuccess &&
    (!result.data.event || result.data.timeline.length === 0);
  const uiState: UIState = result.isError
    ? { kind: "error", message: getErrorMessage(result.error) }
    : isEmpty
    ? { kind: "empty", message: "No match details available" }
    : { kind: "ready" };
  return { ...result, isEmpty, uiState };
}
