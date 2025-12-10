import { Check, MoreVertical } from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

interface Team {
  name: string;
  logo: string;
  score: string;
  aggregateScore?: number;
  badge?: string;
  card?: string;
}

interface MatchCardProps {
  id?: string;
  homeTeam: Team;
  awayTeam: Team;
  status: "FT" | "HT" | "LIVE" | "SCHEDULED";
  time?: string;
  minute?: number;
  phase?: string;
}

const MatchCard = ({
  id,
  homeTeam,
  awayTeam,
  status,
  time,
  minute,
  phase,
}: MatchCardProps) => {
  const isLive = status === "LIVE" || status === "HT";

  function barColor(status: MatchCardProps["status"]) {
    if (status === "FT") return "bg-[#EE5E52]";
    if (status === "HT" || status === "LIVE") return "bg-emerald-500";
    return "bg-gray-500";
  }

  const navigate = useNavigate();

  return (
    <div
      className="transition-colors px-4 py-3 cursor-pointer"
      onClick={id ? () => navigate(`/match/${id}`) : undefined}
      role="button"
    >
      <div className="flex items-center border-b border-[#292B41] py-2">
        <div className={cn("w-1 rounded h-16 bg-gray-500", barColor(status))} />
        <div className="w-12 md:w-20 shrink-0 flex flex-col items-center">
          {status === "LIVE" ? (
            <div className="flex flex-col justify-center items-center h-16 w-16 md:w-20 relative">
              <span className="text-emerald-600 text-sm font-medium">
                {minute != null ? `${minute}'` : phase ?? "LIVE"}
              </span>
              <div className="w-6 h-0.5 bg-emerald-500 mt-1 rounded-full" />
              <div className="absolute top-0 left-0 h-full w-16 md:w-36 opacity-10 bg-linear-to-r from-emerald-500 via-emerald-200 to-emerald-0"></div>
            </div>
          ) : status === "HT" ? (
            <div className="flex flex-col justify-center items-center h-16 w-16 md:w-20relative">
              <span className="text-emerald-600 text-sm font-medium">HT</span>
              <div className="w-6 h-0.5 bg-emerald-500 mt-1 rounded-full" />
              <div className="absolute top-0 left-0 h-full w-36 opacity-10 bg-linear-to-r from-emerald-500 via-emerald-200 to-emerald-0"></div>
            </div>
          ) : status === "FT" ? (
            <span className="text-[#EE5E52] text-sm font-medium">FT</span>
          ) : (
            <span className="text-muted-foreground text-sm ml-2 sm:ml-0">
              {time}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            {homeTeam.logo ? (
              homeTeam.logo.startsWith("http") ? (
                <img
                  src={homeTeam.logo}
                  alt={homeTeam.name}
                  className="size-5 rounded-sm object-contain"
                />
              ) : (
                <span className="text-base">{homeTeam.logo}</span>
              )
            ) : (
              <div className="size-5 rounded-sm bg-muted" />
            )}
            <span className="text-white text-sm">{homeTeam.name}</span>
            {homeTeam.badge && (
              <span className="text-emerald-500 text-[8px] font-medium flex items-center gap-0.5 bg-[#313349] rounded-full px-1">
                <Check className="w-2 h-2 text-emerald-500" /> {homeTeam.badge}
              </span>
            )}
            {homeTeam.card && (
              <span className="text-[10px]">{homeTeam.card}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {awayTeam.logo ? (
              awayTeam.logo.startsWith("http") ? (
                <img
                  src={awayTeam.logo}
                  alt={awayTeam.name}
                  className="size-5 rounded-sm object-contain"
                />
              ) : (
                <span className="text-base">{awayTeam.logo}</span>
              )
            ) : (
              <div className="size-5 rounded-sm bg-muted" />
            )}
            <span className="text-white text-sm">{awayTeam.name}</span>
            {awayTeam.badge && (
              <span className="text-emerald-500 text-[8px] font-medium flex items-center gap-0.5 bg-[#313349] rounded-full px-1">
                <Check className="w-2 h-2 text-emerald-500" />
                {awayTeam.badge}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            {homeTeam.aggregateScore !== undefined && (
              <span className="text-gray-400 text-xs">
                [{homeTeam.aggregateScore}]
              </span>
            )}
            <span
              className={`text-sm font-medium ${
                isLive ? "text-white" : "text-white"
              }`}
            >
              {homeTeam.score}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {awayTeam.aggregateScore !== undefined && (
              <span className="text-gray-400 text-xs">
                [{awayTeam.aggregateScore}]
              </span>
            )}
            <span
              className={`text-sm font-medium ${
                isLive ? "text-white" : "text-white"
              }`}
            >
              {awayTeam.score}
            </span>
          </div>
        </div>

        <button className="text-white hover:text-white p-1">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
