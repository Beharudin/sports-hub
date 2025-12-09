import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

export default function FiltersBar() {
  return (
    <Card className="mx-auto mt-20 max-w-7xl bg-secondary/30 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-600/20 text-emerald-300">All</Badge>
          <Badge className="bg-red-600/20 text-red-300">Live</Badge>
          <Badge className="bg-sky-600/20 text-sky-300">Favorites <span className="ml-1 rounded bg-sky-600/30 px-1">2</span></Badge>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded bg-muted/30 px-3 py-1">Today</span>
          <Separator orientation="vertical" className="h-5" />
          <span>&gt;</span>
        </div>
      </div>
    </Card>
  );
}