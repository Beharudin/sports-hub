import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { type EventDetails } from "../../constants/api";
import { cn } from "../../lib/utils";
import { EventsSection } from "../components/EventsSection";
import { useMatchDetails } from "../hooks/use-match-details";

function cleanUrl(u?: string | null) {
  return u ? u.replace(/\\\//g, "/") : undefined;
}

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

export function MatchInfo({ event }: { event: EventDetails | undefined }) {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-center gap-8">
        <TeamCrest
          badge={cleanUrl(event?.strHomeTeamBadge)}
          name={event?.strHomeTeam ?? ""}
          yellowCards={
            (event?.strHomeYellowCards ?? "").split(";").filter(Boolean).length
          }
          redCards={
            (event?.strHomeRedCards ?? "").split(";").filter(Boolean).length
          }
          topClass="top-0"
        />
        <ScoreBlock
          dateLabel={(() => {
            const src = event?.dateEvent ?? event?.strTimestamp;
            if (!src) return "";
            return new Date(src)
              .toLocaleDateString(undefined, { day: "2-digit", month: "short" })
              .toUpperCase();
          })()}
          homeScore={
            event?.intHomeScore != null ? Number(event.intHomeScore) : null
          }
          awayScore={
            event?.intAwayScore != null ? Number(event.intAwayScore) : null
          }
          status={event?.strStatus ?? null}
        />
        <TeamCrest
          badge={cleanUrl(event?.strAwayTeamBadge)}
          name={event?.strAwayTeam ?? ""}
          yellowCards={
            (event?.strAwayYellowCards ?? "").split(";").filter(Boolean).length
          }
          redCards={
            (event?.strAwayRedCards ?? "").split(";").filter(Boolean).length
          }
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
  console.log(data)
  // const event = data?.event;
  const event = {
    idEvent: "999001",
    idAPIfootball: null,
    strEvent: "Arsenal vs Liverpool",
    strEventAlternate: "Liverpool @ Arsenal",
    strFilename: "English Premier League 2025-08-11 Arsenal vs Liverpool",
    strSport: "Soccer",
    idLeague: "4328",
    strLeague: "English Premier League",
    strLeagueBadge:
      "https://r2.thesportsdb.com/images/media/league/badge/dsnjpz1679951317.png",
    strSeason: "2025-2026",
    strDescriptionEN: "",
    strHomeTeam: "Arsenal",
    strAwayTeam: "Liverpool",
    intHomeScore: "2",
    intRound: "1",
    intAwayScore: "1",
    intSpectators: "60000",
    strOfficial: null,
    strTimestamp: "2025-08-11T15:00:00",
    dateEvent: "2025-08-11",
    dateEventLocal: "2025-08-11",
    strTime: "15:00:00",
    strTimeLocal: "15:00:00",
    strGroup: null,
    idHomeTeam: "133604",
    strHomeTeamBadge:
      "https://r2.thesportsdb.com/images/media/team/badge/yvxxrv1448808301.png",
    idAwayTeam: "133602",
    strAwayTeamBadge:
      "https://r2.thesportsdb.com/images/media/team/badge/98wt4h1521144923.png",
    intScore: null,
    intScoreVotes: null,
    strResult: "",
    idVenue: "15403",
    strVenue: "Emirates Stadium",
    strCountry: "England",
    strCity: "London",
    strPoster: null,
    strSquare: null,
    strFanart: null,
    strThumb: null,
    strBanner: null,
    strMap: null,
    strTweet1: "",
    strVideo: "",
    strStatus: "2H",
    strPostponed: "no",
    strLocked: "unlocked",

    strHomeGoalDetails: "55: Saka; 87: Gyokores",
    strAwayGoalDetails: "80: Salah",

    strHomeYellowCards: "46: Gabriel; 66: Rice",
    strAwayYellowCards: "",

    strHomeRedCards: "",
    strAwayRedCards: "86: Van Dijk",

    strHomeLineupSubstitutes: "Emile Smith Rowe; Eddie Nketiah",
    strAwayLineupSubstitutes: "Curtis Jones; Harvey Elliott",
  };

  return (
    <div className="flex flex-col items-center mt-12 pt-3 sm:pt-0 sm:mt-20">
      <div className="w-full max-w-5xl mb-10">
        {/* Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <div className="bg-[#1D1E2B] sm:rounded-t-[8px]">
            <HeaderBar
              league={event?.strLeague ?? "English Premier League"}
              onBack={() => navigate(-1)}
            />

            <MatchInfo event={event} />
            <TabsList className="w-full justify-center bg-transparent border-b border-[#292B41] rounded-none h-auto p-0 gap-0 mx-2 px-6 sm:ml-0 overflow-x-scroll">
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
                  className="px-2 py-3 text-sm text-[#D1D5DB] data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#00FFA5] rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
