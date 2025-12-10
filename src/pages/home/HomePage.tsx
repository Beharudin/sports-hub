import { Outlet } from "react-router-dom";
import FixturesHeader from "../../components/common/header/Header";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 bg-[#0D0E16] text-white">
      <FixturesHeader />
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
