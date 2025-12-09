import { Heart, Radio } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface FilterTab {
  id: string;
  label: string;
  count: number;
  icon?: React.ReactNode;
}

const FilterTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs: FilterTab[] = [
    { id: "all", label: "All", count: 6 },
    {
      id: "live",
      label: "Live",
      count: 4,
      icon: <Radio className="w-3.5 h-3.5" />,
    },
    {
      id: "favorites",
      label: "Favorites",
      count: 2,
      icon: <Heart className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 gap-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-[#02F1A1] text-[#0D0E16]"
                  : "text-white bg-[#1D1E2B]"
              )}
            >
              {tab.icon}
              <span className="text-[14px] leading-[20px] font-medium text-center">
                {tab.label}
              </span>
              <span
                className={cn(
                  "min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-semibold",
                  activeTab === tab.id ? "bg-[#1A1B24] text-[#02F1A1]" : ""
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;
