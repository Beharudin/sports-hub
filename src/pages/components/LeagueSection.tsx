import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import type { TSEvent } from "../../constants/api";
import MatchCard from "./MatchCard";

export default function LeagueSection({ league, events }: { league: string; events: TSEvent[] }) {
  return (
    <Card className="mx-auto mt-6 max-w-7xl bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-foreground/80">{league}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {events.map((ev) => (
          <MatchCard key={ev.idEvent} event={ev} />
        ))}
      </CardContent>
    </Card>
  );
}