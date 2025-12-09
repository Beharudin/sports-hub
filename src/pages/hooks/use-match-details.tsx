import { useQuery } from "@tanstack/react-query";
import { Api, type EventDetails } from "../../constants/api";

export type TimelineEvent = {
  minute: number | null;
  player: string;
  side: "home" | "away";
  type: "goal" | "yellow" | "red" | "sub";
};

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
      return { minute: Number.isFinite(minute) ? minute : null, player, side, type };
    });
}

export function useMatchDetails(id: string) {
  return useQuery({
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
  });
}