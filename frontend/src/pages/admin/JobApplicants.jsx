import { useAuth } from "@/context/Auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobApplicants() {
  const { jobId } = useParams();
  const { auth } = useAuth();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ==============================
  // Fetch Applicants
  // ==============================
  const getApplicants = async () => {
    try {
      setLoading(true);
      console.log("🔍 Params:", jobId);
      console.log("🔑 Auth Token:", auth?.token);
      
      const url = `${import.meta.env.VITE_API_URL}/api/v1/application/${jobId}/applicants`;
      console.log("📡 API URL:", url);
      console.log("🚀 Sending request with header:", { Authorization: `Bearer ${auth?.token}` });

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });

      console.log("✅ Response received:", data);

      if (data?.success) {
        console.log("📦 Job data:", data?.job);
        console.log("📝 Applications:", data?.job?.applications);
        
        const sortedApplicants =
          data?.job?.applications?.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ) || [];

        console.log("📊 Sorted applicants:", sortedApplicants);
        setJob(data?.job);
        setApplications(sortedApplicants);
      } else {
        console.warn("⚠️ Response success is false:", data);
      }
    } catch (error) {
      console.error("❌ Error details:", error);
      console.error("Response data:", error.response?.data);
      console.error("Error message:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Update Application Status
  // ==============================
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      console.log("🔄 Updating status for:", applicationId, "to:", newStatus);
      console.log("🔑 Auth Token:", auth?.token);
      
      const url = `${import.meta.env.VITE_API_URL}/api/v1/application/status/${applicationId}/update`;
      console.log("📡 API URL:", url);

      const { data } = await axios.put(
        url,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      console.log("✅ Status update response:", data);

      if (data?.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app,
          ),
        );
        console.log("✓ Application state updated");
      }
    } catch (error) {
      console.error("❌ Status update error:", error);
      console.error("Response data:", error.response?.data);
      console.error("Error message:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    console.log("🔍 useEffect triggered");
    console.log("jobId:", jobId, "auth?.token:", auth?.token);
    if (jobId && auth?.token) {
      console.log("✅ Conditions met, calling getApplicants");
      getApplicants();
    } else {
      console.warn("⚠️ Conditions not met - missing jobId or auth?.token");
    }
  }, [jobId, auth?.token]);

  // ==============================
  // Filter Applicants by Search
  // ==============================
  const filteredApplicants = applications.filter((app) =>
    app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()),
  );

  // ==============================
  // UI
  // ==============================
  return (
    <div className="min-h-screen bg-transparent p-10 ml-[10vw] w-[60vw] shadow-lg rounded-2xl">
      {/* Job Header */}
      <div className="bg-transparent shadow-sm rounded-sm px-2 py-4 mb-6 border-b-2 border-zinc-900">
        <div className="flex justify-between p-2 border-b-2 border-zinc-900">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {job?.title || "Loading..."}
            </h1>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search applicant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-md w-full text-zinc-400"
            />
          </div>
        </div>

        <p className="text-gray-100 mt-2">
          Total Applicants: {applications.length}
        </p>

        <p className="text-indigo-800 text-sm">
          Accepted: {applications.filter((a) => a.status === "accepted").length}
        </p>

        {/* Search */}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">Loading applicants...</p>
      )}

      {/* Applicants List */}
      <div className="grid gap-6">
        {Array.isArray(filteredApplicants) &&
          filteredApplicants.map((app) => (
            <div
              key={app._id}
              className="bg-transparent shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              {/* Applicant Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  {/* Profile Photo */}
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${app?.applicant?.profile?.profilePhoto}`}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {app?.applicant?.fullname}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {app?.applicant?.email}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                    ${
                      app.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {app.status}
                </span>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm mb-2">
                {app?.applicant?.profile?.bio || "No bio provided"}
              </p>

              {/* Skills */}
              <p className="text-sm text-gray-600 mb-3">
                Skills:{" "}
                {app?.applicant?.profile?.skills?.length > 0
                  ? app?.applicant?.profile?.skills.join(", ")
                  : "Not specified"}
              </p>

              {/* Resume Buttons */}
              <div className="flex gap-3 mb-3">
                <a
                  href={`${app?.applicant?.profile?.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                >
                  View Resume
                </a>

                <a
                  href={`${app?.applicant?.profile?.resume}`}
                  download
                  className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800"
                >
                  Download
                </a>

                <a
                  href={`mailto:${app?.applicant?.email}`}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-600"
                >
                  Contact
                </a>
              </div>

              {/* Status Dropdown */}
              <select
                className={`border px-3 py-1 rounded-md font-medium
                  ${
                    app.status === "accepted"
                      ? "bg-green-200 text-green-800"
                      : app.status === "rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                  }`}
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accept</option>
                <option value="rejected">Reject</option>
              </select>

              {/* Applied Date */}
              <p className="text-gray-500 text-sm mt-3">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}

        {/* No Applicants */}
        {!loading && filteredApplicants.length === 0 && (
          <p className="text-center text-gray-500">No applicants found.</p>
        )}
      </div>
    </div>
  );
}

export default JobApplicants;
