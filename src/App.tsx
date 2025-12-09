import { Navigate, Route, Routes } from "react-router-dom";
import FixturesPage from "./pages/home/FixturesPage";
import MatchDetailsPage from "./pages/match-details/MatchDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/fixtures" element={<FixturesPage />} />
      <Route path="/match/:id" element={<MatchDetailsPage />} />
      <Route path="*" element={<Navigate to="/fixtures" replace />} />
    </Routes>
  );
}

export default App;
