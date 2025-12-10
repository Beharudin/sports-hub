import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { cn } from "../../lib/utils";
import { EventsSection } from "../components/EventsSection";
import { useMatchDetails } from "../hooks/use-match-details";

const MOCK_EVENT = {
  strHomeTeam: "Arsenal",
  strAwayTeam: "Liverpool",
  intHomeScore: 2,
  intAwayScore: 1,
  strHomeTeamBadge:
    "https://r2.thesportsdb.com/images/media/team/badge/avi3bu1688678934.png",
  strAwayTeamBadge:
    "https://r2.thesportsdb.com/images/media/team/badge/yvxxrv1448808301.png",
  strLeague: "English Premier League",
  strStatus: "2H",
  homeYellowCards: 2,
  homeRedCards: 0,
  awayYellowCards: 1,
  awayRedCards: 1,
};

export function HeaderBar({
  league,
  onBack,
}: {
  league: string;
  onBack: () => void;
}) {
  return (
    <div className="px-4 py-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 hover:cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-white text-[14px] leading-[20px] font-normal">
          {league}
        </span>
      </button>
    </div>
  );
}

export function TeamCrest({
  badge,
  name,
  yellowCards = 0,
  redCards = 0,
  topClass = "top-0",
}: {
  badge?: string | null;
  name: string;
  yellowCards?: number;
  redCards?: number;
  topClass?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {badge ? (
          <img
            src={badge}
            alt={name}
            className="w-[42px] h-[42px] object-contain"
          />
        ) : (
          <div className="w-[42px] h-[42px] rounded-full bg-match-card flex items-center justify-center text-3xl">
            🔴
          </div>
        )}
        <div
          className={cn(
            "absolute flex gap-0.5",
            topClass,
            yellowCards && redCards ? "-right-6" : "-right-4"
          )}
        >
          {yellowCards ? (
            <span className="bg-amber-400 text-[#111827] text-[10px] w-[10px] h-3 rounded-xs flex items-center justify-center font-medium">
              {yellowCards}
            </span>
          ) : null}
          {redCards ? (
            <span className="bg-destructive text-[#111827] text-[10px] w-[10px] h-3 rounded-xs flex items-center justify-center font-medium">
              {redCards}
            </span>
          ) : null}
        </div>
      </div>
      <span className="text-white text-[14px] leading-[20px] font-medium text-center">
        {name}
      </span>
    </div>
  );
}

export function ScoreBlock({
  dateLabel,
  homeScore,
  awayScore,
  status,
}: {
  dateLabel: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string | null;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[#E5E7EB] text-[11px] leading-[15px] font-normal text-center">
        {dateLabel}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-white text-[22px] leading-[28px] font-semibold text-center">
          {homeScore ?? "–"}
        </span>
        <span className="text-white text-[22px] leading-[28px] font-semibold text-center">
          -
        </span>
        <span className="text-white text-[22px] leading-[28px] font-semibold text-center">
          {awayScore ?? "–"}
        </span>
      </div>
      <span className="bg-success/20 text-success text-xs px-3 py-0.5 rounded-full">
        {status === "FT" ? "Finished" : status ?? "Scheduled"}
      </span>
    </div>
  );
}

export function MatchInfo({ event }: { event: typeof MOCK_EVENT }) {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-center gap-8">
        <TeamCrest
          badge={event.strHomeTeamBadge}
          name={event.strHomeTeam}
          yellowCards={event.homeYellowCards}
          redCards={event.homeRedCards}
          topClass="top-0"
        />
        <ScoreBlock
          dateLabel="11 AUG"
          homeScore={event.intHomeScore}
          awayScore={event.intAwayScore}
          status={event.strStatus}
        />
        <TeamCrest
          badge={event.strAwayTeamBadge}
          name={event.strAwayTeam}
          yellowCards={event.awayYellowCards}
          redCards={event.awayRedCards}
          topClass="-top-1"
        />
      </div>
    </div>
  );
}

export default function MatchDetailsPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data } = useMatchDetails(id);
  // const event = data?.event;
  const event = MOCK_EVENT;

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="w-full max-w-5xl">
        {/* Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <div className="bg-[#1D1E2B] rounded-t-[8px]">
            <HeaderBar
              league={event.strLeague ?? "English Premier League"}
              onBack={() => navigate(-1)}
            />

            <MatchInfo event={event} />
            <TabsList className="w-full justify-center bg-transparent border-b border-[#292B41] rounded-none h-auto p-0 gap-0">
              {[
                "Details",
                "Odds",
                "Lineups",
                "Events",
                "Stats",
                "Standings",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className="px-4 py-3 text-sm text-[#D1D5DB] data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#00FFA5] rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="events" className="mt-0">
            <EventsSection />
          </TabsContent>

          <TabsContent value="details" className="p-4">
            <div className="text-muted-foreground text-center py-8">
              Match details coming soon
            </div>
          </TabsContent>

          <TabsContent value="odds" className="p-4">
            <div className="text-muted-foreground text-center py-8">
              Odds information coming soon
            </div>
          </TabsContent>

          <TabsContent value="lineups" className="p-4">
            <div className="text-muted-foreground text-center py-8">
              Lineups coming soon
            </div>
          </TabsContent>

          <TabsContent value="stats" className="p-4">
            <div className="text-muted-foreground text-center py-8">
              Statistics coming soon
            </div>
          </TabsContent>

          <TabsContent value="standings" className="p-4">
            <div className="text-muted-foreground text-center py-8">
              Standings coming soon
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
