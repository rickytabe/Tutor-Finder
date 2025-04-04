// components/Main/learner-pages/Learner_Dashboard/Dashboard.tsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import NavBar from "../HomePage/components/nav_bar";


const LearnerDashboard = () => {
  return (
      <div className="space-y-16">
      <NavBar /> 
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </div>
  );
};

export default LearnerDashboard;
