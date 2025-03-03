import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page/landing-page";
import { LearnerRegister } from "./components/Auth/learners/leanerRegistration";
import TutorRegister from "./components/Auth/tutors/tutorRegistration";
import { LearnerLogin } from "./components/Auth/learners/learnerLogin";
import { TutorLogin } from "./components/Auth/tutors/tutorLogin";
import { AuthProvider } from "./components/Auth/shared/firebaseAuthUtils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LearnerHomePage from "./components/Main/learner-pages/Learner_Dashboard/homePage";
import TutorHomePage from "./components/Main/tutor-pages/homePage";
import HomePage2 from "./components/Main/learner-pages/HomePage/HomePage";
// import DashboardLayout from './components/Main/learner-pages/Learner_Dashboard/DashboardLayout';
import LearningOverview from "./components/Main/learner-pages/Learner_Dashboard/LearningOverview";
import SessionManagement from "./components/Main/learner-pages/Learner_Dashboard/SessionManagement";
import FinancialHub from "./components/Main/learner-pages/Learner_Dashboard/FinancialHub";
import ProfileNexus from "./components/Main/learner-pages/Learner_Dashboard/ProfileNexus";
import Dashboard from "./components/Main/learner-pages/Learner_Dashboard/Dashboard";
import Community from "./components/Main/learner-pages/Community/community";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
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
            <Route path="/learner-homePage" element={<LearnerHomePage />} />
            <Route path="/tutor-homePage" element={<TutorHomePage />} />
            <Route path="/learnerHomePage" element={<HomePage2 />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<LearningOverview />} />
              <Route path="learning" element={<LearningOverview />} />
              <Route path="sessions" element={<SessionManagement />} />
              <Route path="financial" element={<FinancialHub />} />
              <Route path="profile" element={<ProfileNexus />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <Analytics />
    </div>
  );
}

export default App;
