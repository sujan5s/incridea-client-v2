import Layout from "../components/Layout";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import EventsPage from "../pages/EventsPage";
import EventDetailPage from "../pages/EventDetailPage";
import RefundPage from "../pages/RefundPage";
import GuidelinesPage from "../pages/GuidelinesPage.tsx";
import MerchPage from "../pages/Merch";
import PrivacyPage from "../pages/PrivacyPage";
import RulesPage from "../pages/RulesPage";
import QuizPage from "../pages/QuizPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import AccommodationPage from "../pages/AccommodationPage.tsx";
import TechTeamPage from "../pages/techteam.tsx";
import CoreTeamPage from "../pages/coreteam.tsx";
import NotFoundPage from "../pages/NotFoundPage";
import Gallery from "../pages/Gallery.tsx";
import ComingSoon from "../pages/ComingSoon.tsx";
import RefundPolicy from '../pages/refundpolicy.tsx'

const AuthRedirect = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    // Rely on cookie
    window.location.href = "/";
    return null;
  }

  window.location.href = `${import.meta.env.VITE_AUTH_URL}/?redirect=${encodeURIComponent(
    window.location.origin
  )}`;
  return null;
};

const ResetRedirect = () => {
  window.location.href = `${import.meta.env.VITE_AUTH_URL}/reset-password${window.location.search
    }`;
  return null;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<Layout />}>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/login" element={<AuthRedirect />} />
        <Route path="/reset-password" element={<ResetRedirect />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/accommodation" element={<AccommodationPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/techteam" element={<TechTeamPage />} />
        <Route path="/coreteam" element={<CoreTeamPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/merch" element={<MerchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/comingsoon" element={<ComingSoon />} />
    </Routes>
  );
}

export default AppRoutes;
