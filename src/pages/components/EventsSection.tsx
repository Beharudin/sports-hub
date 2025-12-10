import { useParams } from "react-router-dom";
import { CornerFlag, GoalBall, Substitution } from "../../assets";
import { useMatchDetails } from "../hooks/use-match-details";

type EventType =
  | "goal"
  | "yellow-card"
  | "red-card"
  | "substitution"
  | "corner"
  | "injury"
  | "halftime"
  | "kickoff"
  | "fulltime";

interface MatchEvent {
  id: string;
  type: EventType;
  minute: string;
  side: "home" | "away" | "center";
  playerName?: string;
  assistName?: string;
  secondaryPlayerName?: string;
  label?: string;
}

const EventIcon = ({ type }: { type: EventType }) => {
  switch (type) {
    case "goal":
      return <img src={GoalBall} alt="" className="w-3 h-3" />;
    case "yellow-card":
      return <div className="w-3 h-3 bg-yellow-400 rounded-xs" />;
    case "red-card":
      return <div className="w-3 h-3 bg-destructive rounded-xs" />;
    case "substitution":
      return <img src={Substitution} alt="" className="w-3 h-3" />;
    case "corner":
      return <img src={CornerFlag} alt="" className="w-3 h-3" />;
    case "injury":
      return <span className="text-muted-foreground text-xs">🏥</span>;
    default:
      return null;
  }
};

const TimelineEvent = ({ event }: { event: MatchEvent }) => {
  if (event.side === "center") {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="flex-1 h-px bg-[#292B41]" />
        <span className="px-4 text-[#E5E7EB] text-[12px] leading-[16px] font-normal">
          {event.label}
        </span>
        <div className="flex-1 h-px bg-[#292B41]" />
      </div>
    );
  }

  const isHome = event.side === "home";

  return (
    <div className="flex items-center gap-x-20 py-2 relative">
      {/* Home Side */}
      <div
        className={`flex-1 flex items-center gap-3 ${
          isHome ? "justify-end pr-4" : ""
        }`}
      >
        {isHome && (
          <>
            {event.type === "corner" && event.label && (
              <span className="text-white text-[12px] leading-[16px] font-normal">
                {event.label}
              </span>
            )}
            {event.playerName && (
              <div className="text-right">
                <span className="text-white text-[12px] leading-[16px] font-normal">
                  {event.playerName}
                </span>
                {event.assistName && (
                  <span className="text-[#6B7280] text-[12px] leading-[16px] font-normal block">
                    {event.assistName}
                  </span>
                )}
                {event.label && event.type !== "corner" && (
                  <span className="text-[#6B7280] text-[12px] leading-[16px] font-normal block">
                    {event.label}
                  </span>
                )}
              </div>
            )}
            <EventIcon type={event.type} />
          </>
        )}
      </div>

      {/* Minute Bubble */}
      {isHome && (
        <div className="absolute top-1/2 right-1/2 mr-7 -translate-y-1/2 h-px w-4 bg-[#3A3D56]" />
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] flex justify-center z-10">
        {event.type === "goal" ? (
          <div className="min-w-[48px] h-[19px] px-2 py-[2px] rounded-[100px] bg-[#00FFA5] text-black text-[12px] leading-[16px] font-normal flex items-center justify-center">
            {event.minute}
          </div>
        ) : (
          <div className="min-w-[48px] h-[19px] px-2 py-[2px] rounded-[100px] bg-[#26273B] text-white text-[12px] leading-[16px] font-normal flex items-center justify-center">
            {event.minute}
          </div>
        )}
      </div>
      {!isHome && (
        <div className="absolute top-1/2 left-1/2 ml-7 -translate-y-1/2 h-px w-4 bg-[#3A3D56]" />
      )}

      {/* Away Side */}
      <div
        className={`flex-1 flex items-center gap-2 ${!isHome ? "pl-4" : ""}`}
      >
        {!isHome && (
          <>
            <EventIcon type={event.type} />
            {event.playerName && (
              <div>
                <span className="text-white text-[12px] leading-[16px] font-normal">
                  {event.playerName}
                </span>
                {event.assistName && (
                  <span className="text-[#6B7280] text-[12px] leading-[16px] font-normal block">
                    {event.assistName}
                  </span>
                )}
                {event.label && event.type !== "corner" && (
                  <span className="text-[#6B7280] text-[12px] leading-[16px] font-normal block">
                    {event.label}
                  </span>
                )}
              </div>
            )}
            {event.type === "corner" && event.label && (
              <span className="text-white text-[12px] leading-[16px] font-normal">
                {event.label}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export function EventsSection() {
  const { id = "" } = useParams();
  const { data } = useMatchDetails(id);

  console.log(data)

  // const timeline = data?.timeline ?? [];

  const timeline: MatchEvent[] = [
    {
      id: "c-kickoff",
      type: "kickoff",
      minute: "",
      side: "center",
      label: "Kick Off - 15:00",
    },

    {
      id: "h-goal-12",
      type: "goal",
      minute: "12'",
      side: "home",
      playerName: "Saka",
      assistName: "Odegaard",
    },
    {
      id: "a-corner-16",
      type: "corner",
      minute: "16'",
      side: "away",
      label: "2nd corner",
    },
    {
      id: "h-goal-25",
      type: "goal",
      minute: "25'",
      side: "home",
      playerName: "Gyokores",
    },
    {
      id: "a-yellow-34",
      type: "yellow-card",
      minute: "34'",
      side: "away",
      playerName: "Konate",
    },
    {
      id: "h-corner-36",
      type: "corner",
      minute: "36'",
      side: "home",
      label: "1st corner",
    },
    {
      id: "a-injury-44",
      type: "injury",
      minute: "44'",
      side: "away",
      playerName: "Jones",
      label: "Injured",
    },
    {
      id: "h-yellow-44",
      type: "yellow-card",
      minute: "44'",
      side: "home",
      playerName: "Gabriel",
    },
    {
      id: "a-sub-45",
      type: "substitution",
      minute: "45'",
      side: "away",
      playerName: "Jones",
      secondaryPlayerName: "McAlister",
    },
    {
      id: "h-corner-45p2",
      type: "corner",
      minute: "45+2'",
      side: "home",
      label: "2nd corner",
    },

    {
      id: "c-halftime",
      type: "halftime",
      minute: "",
      side: "center",
      label: "Halftime  1 - 0",
    },

    {
      id: "h-corner-52",
      type: "corner",
      minute: "52'",
      side: "home",
      label: "5th corner",
    },
    {
      id: "h-goal-55",
      type: "goal",
      minute: "55'",
      side: "home",
      playerName: "Saka",
    },
    {
      id: "a-red-66",
      type: "red-card",
      minute: "66'",
      side: "away",
      playerName: "Van Dijk",
      label: "Sent Off",
    },
    {
      id: "h-sub-67",
      type: "substitution",
      minute: "67'",
      side: "home",
      playerName: "Rice",
      assistName: "Zubimendi",
    },
    {
      id: "a-sub-67b",
      type: "substitution",
      minute: "67'",
      side: "away",
      playerName: "Frimpong",
      secondaryPlayerName: "Robertson",
    },
    {
      id: "h-corner-74",
      type: "corner",
      minute: "74'",
      side: "home",
      label: "3rd corner",
    },
    {
      id: "h-yellow-78",
      type: "yellow-card",
      minute: "78'",
      side: "home",
      playerName: "Saliba",
    },
    {
      id: "a-goal-80",
      type: "goal",
      minute: "80'",
      side: "away",
      playerName: "Salah",
    },
    {
      id: "h-goal-87",
      type: "goal",
      minute: "87'",
      side: "home",
      playerName: "Gyokores",
    },

    {
      id: "c-fulltime",
      type: "fulltime",
      minute: "",
      side: "center",
      label: "Fulltime  2 - 1",
    },
  ];

  return (
    <div className="p-4 mx-4 lg:mx-0 bg-[#1D1E2B] mt-4 rounded-t-[8px]">
      <h3 className="text-white text-[14px] leading-[20px] font-medium">
        Events
      </h3>
      <div className="relative">
        {timeline.map((t, i) => (
          <TimelineEvent key={i} event={t} />
        ))}
      </div>
    </div>
  );
}
