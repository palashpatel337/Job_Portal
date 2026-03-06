import "./App.css";
import Navbar from "./components/shared/Navbar";
import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobDetails from "./pages/JobDetails";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import { useEffect } from "react";
import { useAuth } from "./context/Auth";
import axios from "axios";
import RecruiterDashboard from "./pages/admin/RecruiterDashboard";
import JobApplicants from "./pages/admin/JobApplicants";
import PostJob from "./pages/admin/PostJob";
import DashboardLayout from "./components/shared/DashboardLayout";
import MyJobs from "./pages/admin/MyJobs";
import CreateCompany from "./pages/admin/CreateCompany";
import MyApplications from "./pages/user/MyApplications";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";

function App() {
  const [auth, setAuth] = useAuth();
useEffect(() => {
  const data = localStorage.getItem("auth");

  if (data) {
    const parseData = JSON.parse(data);
    setAuth({
      ...auth,
      token: parseData.token,
      user: parseData.user,
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${parseData.token}`;
  }
}, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get/:id" element={<JobDetails />} />

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="recruiter" element={<RecruiterDashboard />} />
            <Route path="recruiter/post-job" element={<PostJob />} />
            <Route path="recruiter/create-company" element={<CreateCompany />}/>
            <Route path="recruiter/my-jobs" element={<MyJobs />} />
            <Route path="recruiter/my-jobs/:jobId/applicants" element={<JobApplicants />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/application/get" element={<MyApplications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<EditProfile />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
