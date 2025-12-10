import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import FixturesPage from "./pages/fixtures/Fixtures";
import MatchDetailsPage from "./pages/match-details/MatchDetailsPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route path="fixtures" element={<FixturesPage />} />
        <Route path="match/:id" element={<MatchDetailsPage />} />
        <Route path="*" element={<Navigate to="/fixtures" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
