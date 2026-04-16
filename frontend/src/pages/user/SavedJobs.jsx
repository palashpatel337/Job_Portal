import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/shared/Layout";
import { useAuth } from "@/context/Auth";

function SavedJobs() {
  const { auth } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedJobs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/save-job/saved`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(data?.jobs);
      
      if (data?.success) {
        setSavedJobs(data?.jobs);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedJobs();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen px-10 py-10 text-white">
        <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>

        {loading ? (
          <p>Loading...</p>
        ) : savedJobs.length === 0 ? (
          <p className="text-white/50">No saved jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="p-5 rounded-xl border border-white/10 bg-white/5"
              >
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-white/50">
                  {job.companyId?.name} • {job.location}
                </p>

                <p className="mt-2 text-sm text-white/70 line-clamp-3">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SavedJobs;