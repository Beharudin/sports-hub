import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import FixturesPage from "./pages/fixtures/Fixtures";
import MatchDetailsPage from "./pages/match-details/MatchDetailsPage";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path={ROUTES.fixtures} element={<FixturesPage />} />
        <Route path={ROUTES.matchById} element={<MatchDetailsPage />} />
        <Route path="*" element={<Navigate to={ROUTES.fixtures} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
