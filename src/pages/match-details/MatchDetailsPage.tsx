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
          <div className="bg-[#1D1E2B]">
            {/* Header */}
            <div className="px-4 py-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">
                  {event.strLeague ?? "English Premier League"}
                </span>
              </button>
            </div>

            {/* Match Info */}
            <div className="px-4 py-6">
              <div className="flex items-center justify-center gap-8">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    {event.strHomeTeamBadge ? (
                      <img
                        src={event.strHomeTeamBadge}
                        alt={event.strHomeTeam}
                        className="w-[42px] h-[42px] object-contain"
                      />
                    ) : (
                      <div className="w-[42px] h-[42px] rounded-full bg-match-card flex items-center justify-center text-3xl">
                        🔴
                      </div>
                    )}
                    <div
                      className={cn(
                        "absolute top-0 flex gap-0.5",
                        event.homeYellowCards && event.homeRedCards
                          ? "-right-6"
                          : "-right-4"
                      )}
                    >
                      {event.homeYellowCards ? (
                        <span className="bg-amber-400 text-[#111827] text-[10px] w-[10px] h-3 rounded-xs flex items-center justify-center font-medium">
                          {event.homeYellowCards}
                        </span>
                      ) : null}
                      {event.homeRedCards ? (
                        <span className="bg-destructive text-[#111827] text-[10px] w-[10px] h-3 rounded-xs flex items-center justify-center font-medium">
                          {event.homeRedCards}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-foreground text-sm font-medium">
                    {event.strHomeTeam}
                  </span>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[#E5E7EB] text-[11px] leading-[15px] font-normal text-center">
                    11 AUG
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-3xl font-bold">
                      {event.intHomeScore ?? "–"}
                    </span>
                    <span className="text-muted-foreground text-2xl">-</span>
                    <span className="text-foreground text-3xl font-bold">
                      {event.intAwayScore ?? "–"}
                    </span>
                  </div>
                  <span className="bg-success/20 text-success text-xs px-3 py-0.5 rounded-full">
                    {event.strStatus === "FT"
                      ? "Finished"
                      : event.strStatus ?? "Scheduled"}
                  </span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    {event.strAwayTeamBadge ? (
                      <img
                        src={event.strAwayTeamBadge}
                        alt={event.strAwayTeam}
                        className="w-[42px] h-[42px] object-contain"
                      />
                    ) : (
                      <div className="w-[42px] h-[42px] rounded-full bg-match-card flex items-center justify-center text-3xl">
                        🔴
                      </div>
                    )}
                    <div
                      className={cn(
                        "absolute -top-1 flex gap-0.5",
                        event.awayYellowCards && event.awayRedCards
                          ? "-right-6"
                          : "-right-4"
                      )}
                    >
                      {event.awayYellowCards ? (
                        <span className="bg-amber-400 text-[#111827] text-[10px] w-[10px] h-3 rounded-xs flex items-center justify-center font-medium">
                          {event.awayYellowCards}
                        </span>
                      ) : null}
                      {event.awayRedCards ? (
                        <span className="bg-destructive text-[#111827] text-[10px] w-[10px] h-3 rounded-xs flex items-center justify-center font-medium">
                          {event.awayRedCards}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-foreground text-sm font-medium">
                    {event.strAwayTeam}
                  </span>
                </div>
              </div>
            </div>
            <TabsList className="w-full justify-center bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
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
                  className="px-4 py-3 text-sm text-muted-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
