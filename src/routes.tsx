import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages';
import LeagueDetails from './pages/league-details';
import NotFoundPage from './pages/not-found';
import Standings from './pages/standing';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leagues/:id" element={<LeagueDetails />} />
        <Route path="/leagues/:id/standing" element={<Standings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
