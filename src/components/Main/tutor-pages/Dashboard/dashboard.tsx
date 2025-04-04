// components/Main/learner-pages/Learner_Dashboard/Dashboard.tsx
import { Outlet } from "react-router-dom";
import NavBar from "../HomePage/components/navBar";
import DashboardLayout from "./dashboardLayout";



const TutorDashboard = () => {
  return (
      <div className="space-y-16">
      <NavBar /> 
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </div>
  );
};

export default TutorDashboard;
