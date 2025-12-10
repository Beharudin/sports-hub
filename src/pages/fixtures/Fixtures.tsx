import CalendarBar from "../components/CalendarBar";
import FiltersBar from "../components/FiltersBar";
import MatchesList, {
  adaptEventGroupsToMatches,
} from "../components/MatchesList";
import { useFixtures } from "../hooks/use-fixtures";

export default function FixturesPage() {
  const { data = [], isLoading, error } = useFixtures();

  return (
    <div className="flex flex-col gap-4">
      <CalendarBar />
      <FiltersBar />
      <div className="w-full flex justify-center mb-24">
        {isLoading && (
          <div className="mt-6 text-sm opacity-70">Loading matches…</div>
        )}
        {error && (
          <div className="mt-6 text-sm text-red-400">
            Failed to load fixtures
          </div>
        )}
        {!isLoading && !error && (
          <MatchesList groups={adaptEventGroupsToMatches(data)} />
        )}
      </div>
    </div>
  );
}
