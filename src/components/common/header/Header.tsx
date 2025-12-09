import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Logo, Ball, Globe, Flag } from "../../../assets";
import { cn } from "../../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";

const navItems = [
  "Live",
  "Matches",
  "Standings",
  "Teams",
  "Comparison",
  "Statistics",
  "Venues",
] as const;

export default function FixturesHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full bg-[#6D00FF] text-white fixed z-100">
      <div className="mx-2 sm:mx-4  sm:px-4 h-[60px] flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="statscore" className="h-8 sm:h-10 w-auto" />
        </div>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="list-none">
            {navItems.map((label) => (
              <NavigationMenuItem
                key={label}
                className={cn(
                  "px-3 text-sm text-white/80 hover:text-white",
                  label === "Matches" &&
                    "font-semibold text-cyan-300 after:block after:h-px after:bg-cyan-300 after:mt-1"
                )}
              >
                {label}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center sm:gap-2">
          <div className="h-10 w-10 rounded-full bg-[#6D00FF] overflow-hidden flex items-center justify-center">
            <img
              src={Globe}
              alt="Globe"
              className="h-6 sm:h-8 w-6 sm:w-8 object-contain"
            />
          </div>
          <div className="h-10 w-10 rounded-full bg-[#6D00FF] overflow-hidden flex items-center justify-center">
            <img
              src={Ball}
              alt="Ball"
              className="h-6 sm:h-8 w-6 sm:w-8 object-contain"
            />
          </div>
          <div className="hidden sm:flex rounded-full bg-[#5c01d6] h-8 px-4 text-sm items-center gap-[10px]">
            <span>Premier League</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="rounded-full bg-[#5c01d6] h-7 sm:h-8 px-4 text-xs sm:text-sm flex items-center gap-[10px]">
            <span>2024/25</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="h-10 w-10 rounded-full bg-[#6D00FF] overflow-hidden flex items-center justify-center">
            <img
              src={Flag}
              alt="Flag"
              className="h-6 sm:h-8 w-6 sm:w-8 object-contain"
            />
          </div>
          <button
            className="md:hidden p-2 rounded-md "
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden px-4 pb-3"
          >
            <ul className="list-none flex flex-col space-y-2">
              {navItems.map((label) => (
                <li key={label}>
                  <button
                    className={cn(
                      "w-full text-left text-sm text-white/90 hover:text-white relative",
                      label === "Matches" &&
                        "text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-12 after:bg-cyan-300"
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
