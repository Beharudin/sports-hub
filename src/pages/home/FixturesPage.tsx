import FixturesHeader from "../../components/common/header/Header";
import CalendarBar from "../components/CalendarBar";
import FiltersBar from "../components/FiltersBar";
import LeagueSection from "../components/LeagueSection";
import { useFixtures } from "../hooks/use-fixtures";

export default function FixturesPage() {
  const { data = [], isLoading, error } = useFixtures();

  return (
    <div className="min-h-screen flex flex-col gap-4 bg-[#0D0E16] text-white">
      <FixturesHeader />
      <CalendarBar />
      <FiltersBar />
      <div className="mx-auto max-w-7xl px-4 ">
        {isLoading && (
          <div className="mt-6 text-sm opacity-70">Loading matches…</div>
        )}
        {error && (
          <div className="mt-6 text-sm text-red-400">
            Failed to load fixtures
          </div>
        )}
        {!isLoading &&
          !error &&
          data.map((group) => (
            <LeagueSection
              key={group.league}
              league={group.league}
              events={group.events}
            />
          ))}
      </div>
    </div>
  );
}
