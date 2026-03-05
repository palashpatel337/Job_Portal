import { useAuth } from "@/context/Auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  console.log("Auth State:", auth);

  useEffect(() => {
    const authCheck = async () => {
      console.log("🔍 Calling /admin-auth API...");
      try {
        const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/user/admin-auth`,
        );

        console.log("✅ API Response:", res.data);

        if (res.data.ok) {
          console.log("🟢 Admin verified");
          setOk(true);
        } else {
          console.log("🔴 Not admin (res.data.ok false)");
          setOk(false);
        }
      } catch (error) {
        console.log("❌ API Error:", error.response?.data || error.message);
        setOk(false);
      } finally {
        setLoading(false);
        console.log("⏳ Loading finished");
      }
    };

    if (auth?.token) {
      console.log("🔑 Token exists:", auth.token);
      authCheck();
    } else {
      console.log("🚫 No token found");
      setLoading(false);
    }
  }, [auth?.token]);

  console.log("Final State → ok:", ok, "loading:", loading);

  if (loading) return <div>Loading...</div>;

  return ok ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;
