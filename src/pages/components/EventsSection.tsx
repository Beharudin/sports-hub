import { Flag } from "lucide-react";
import { useParams } from "react-router-dom";
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
      return (
        <div className="w-8 h-6 bg-success rounded flex items-center justify-center">
          <span className="text-success-foreground text-xs font-bold">⚽</span>
        </div>
      );
    case "yellow-card":
      return <div className="w-3 h-4 bg-yellow-400 rounded-xs" />;
    case "red-card":
      return <div className="w-3 h-4 bg-destructive rounded-xs" />;
    case "substitution":
      return (
        <div className="flex flex-col">
          <span className="text-success text-xs">↗</span>
          <span className="text-destructive text-xs">↘</span>
        </div>
      );
    case "corner":
      return <Flag className="w-3 h-3 text-muted-foreground" />;
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
        <div className="flex-1 h-px bg-border" />
        <span className="px-4 text-muted-foreground text-sm">
          {event.label}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }

  const isHome = event.side === "home";

  return (
    <div className="flex items-center py-2 relative">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

      {/* Home Side */}
      <div
        className={`flex-1 flex items-center gap-2 ${
          isHome ? "justify-end pr-4" : ""
        }`}
      >
        {isHome && (
          <>
            {event.type === "corner" && event.label && (
              <span className="text-muted-foreground text-sm">
                {event.label}
              </span>
            )}
            {event.playerName && (
              <div className="text-right">
                <span className="text-foreground text-sm">
                  {event.playerName}
                </span>
                {event.assistName && (
                  <span className="text-muted-foreground text-xs block">
                    {event.assistName}
                  </span>
                )}
              </div>
            )}
            <EventIcon type={event.type} />
          </>
        )}
      </div>

      {/* Minute Bubble */}
      <div className="w-12 flex justify-center z-10">
        {event.type === "goal" ? (
          <div className="bg-success text-success-foreground text-xs px-2 py-1 rounded font-medium">
            {event.minute}
          </div>
        ) : (
          <div className="bg-match-card text-muted-foreground text-xs px-2 py-1 rounded border border-border">
            {event.minute}
          </div>
        )}
      </div>

      {/* Away Side */}
      <div
        className={`flex-1 flex items-center gap-2 ${!isHome ? "pl-4" : ""}`}
      >
        {!isHome && (
          <>
            <EventIcon type={event.type} />
            {event.playerName && (
              <div>
                <span className="text-foreground text-sm">
                  {event.playerName}
                </span>
                {event.assistName && (
                  <span className="text-muted-foreground text-xs block">
                    {event.assistName}
                  </span>
                )}
                {event.label && event.type !== "corner" && (
                  <span className="text-muted-foreground text-xs block">
                    {event.label}
                  </span>
                )}
              </div>
            )}
            {event.type === "corner" && event.label && (
              <span className="text-muted-foreground text-sm">
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
    <div className="p-4 bg-[#1D1E2B] mt-4">
      <h3 className="text-white font-medium">Events</h3>
      <div className="relative">
        {events.map((event) => (
          <TimelineEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
