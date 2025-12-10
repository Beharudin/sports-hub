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

const events: MatchEvent[] = [
  {
    id: "1",
    type: "fulltime",
    minute: "",
    side: "center",
    label: "Fulltime  2 - 1",
  },
  {
    id: "2",
    type: "substitution",
    minute: "89'",
    side: "home",
    playerName: "Gyokores",
    assistName: "Odegard",
  },
  {
    id: "3",
    type: "goal",
    minute: "88'",
    side: "away",
    playerName: "Ekitike",
    assistName: "Sallah",
  },
  {
    id: "4",
    type: "yellow-card",
    minute: "78'",
    side: "home",
    playerName: "Saliba",
  },
  { id: "5", type: "corner", minute: "74'", side: "home", label: "3rd corner" },
  {
    id: "6",
    type: "substitution",
    minute: "67'",
    side: "home",
    playerName: "Rice",
    assistName: "Zubemendi",
  },
  {
    id: "7",
    type: "substitution",
    minute: "67'",
    side: "away",
    playerName: "Frimpong",
    secondaryPlayerName: "Robertson",
  },
  {
    id: "8",
    type: "red-card",
    minute: "66'",
    side: "away",
    playerName: "Van Dijk",
    label: "Sent Off",
  },
  { id: "9", type: "goal", minute: "55'", side: "home", playerName: "Saka" },
  {
    id: "10",
    type: "corner",
    minute: "52'",
    side: "home",
    label: "5th corner",
  },
  {
    id: "11",
    type: "corner",
    minute: "48'",
    side: "away",
    label: "3rd Corner",
  },
  {
    id: "12",
    type: "halftime",
    minute: "",
    side: "center",
    label: "Halftime  1 - 0",
  },
  {
    id: "13",
    type: "corner",
    minute: "45+2'",
    side: "home",
    label: "2nd corner",
  },
  {
    id: "14",
    type: "substitution",
    minute: "45'",
    side: "away",
    playerName: "Jones",
    assistName: "Mcalister",
  },
  {
    id: "15",
    type: "yellow-card",
    minute: "44'",
    side: "home",
    playerName: "Gabriel",
  },
  {
    id: "16",
    type: "injury",
    minute: "44'",
    side: "away",
    playerName: "Jones",
    label: "Injured",
  },
  {
    id: "17",
    type: "corner",
    minute: "36'",
    side: "home",
    label: "1st corner",
  },
  {
    id: "18",
    type: "yellow-card",
    minute: "34'",
    side: "away",
    playerName: "Konate",
  },
  {
    id: "19",
    type: "goal",
    minute: "25'",
    side: "home",
    playerName: "Gyokores",
  },
  {
    id: "20",
    type: "corner",
    minute: "16'",
    side: "away",
    label: "2nd Corner",
  },
  {
    id: "21",
    type: "goal",
    minute: "12'",
    side: "home",
    playerName: "Gyokores",
    assistName: "Odegard",
  },
  { id: "22", type: "corner", minute: "3'", side: "away", label: "1st Corner" },
  {
    id: "23",
    type: "kickoff",
    minute: "",
    side: "center",
    label: "Kick Off -13:00",
  },
];

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

  return (
    <div className="p-4 mx-4 lg:mx-0 bg-[#1D1E2B] mt-4 rounded-t-[8px]">
      <h3 className="text-white text-[14px] leading-[20px] font-medium">
        Events
      </h3>
      <div className="relative">
        {events.map((event) => (
          <TimelineEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
