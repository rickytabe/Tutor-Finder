import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page/landing-page";
import { LearnerRegister } from "./components/Auth/learners/leanerRegistration";
import TutorRegister from "./components/Auth/tutors/tutorRegistration";
import { LearnerLogin } from "./components/Auth/learners/learnerLogin";
import TutorLogin from "./components/Auth/tutors/tutorLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LearnerHomePage from "./components/Main/learner-pages/HomePage/HomePage";
import LearningOverview from "./components/Main/learner-pages/Learner_Dashboard/LearningOverview";
import FinancialHub from "./components/Main/learner-pages/Learner_Dashboard/FinancialHub";
import ProfileNexus from "./components/Main/learner-pages/Learner_Dashboard/ProfileNexus";
import Dashboard from "./components/Main/learner-pages/Learner_Dashboard/Dashboard";
import LearnerCommunity from "./components/Main/learner-pages/community";
import { Analytics } from "@vercel/analytics/react";
import Gigs from "./components/Main/learner-pages/Learner_Dashboard/Gigs/gigIndex";
import SearchPage from "./components/Main/learner-pages/HomePage/components/SearchPage";
import TutorHomePage from "./components/Main/tutor-pages/HomePage/HomePage";
import TutorDashboard from "./components/Main/tutor-pages/Dashboard/dashboard";
import TutorCommunity from "./components/Main/tutor-pages/community";

function App() {
  return (
    <div>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth/learner-registration"
            element={<LearnerRegister />}
          />
          <Route path="/auth/tutor-registration" element={<TutorRegister />} />
          <Route path="/auth/learner-login" element={<LearnerLogin />} />
          <Route path="/auth/tutor-login" element={<TutorLogin />} />
          <Route path="/tutorHomePage" element={<TutorHomePage />} />
          <Route path="/learnerHomePage" element={<LearnerHomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tutorDashboard" element={<TutorDashboard />} />

          <Route path="/lcommunity" element={<LearnerCommunity />} />
           <Route path="/tcommunity" element={<TutorCommunity />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<LearningOverview />} />
            <Route path="learning" element={<LearningOverview />} />
            <Route path="sessions" element={<Gigs />} />
            <Route path="financial" element={<FinancialHub />} />
            <Route path="profile" element={<ProfileNexus />} />
          </Route>
        </Routes>
      </Router>
      <Analytics />
    </div>
  );
}

export default App;
