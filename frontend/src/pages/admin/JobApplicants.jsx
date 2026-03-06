import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobApplicants() {
  const { jobId } = useParams();

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

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/application/${jobId}/applicants`,
      );

      if (data?.success) {
        const sortedApplicants =
          data?.job?.applications?.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ) || [];

        setJob(data?.job);
        setApplications(sortedApplicants);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Update Application Status
  // ==============================
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/application/status/${applicationId}/update`,
        { status: newStatus },
      );

      if (data?.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app,
          ),
        );
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => {
    if (jobId) {
      getApplicants();
    }
  }, [jobId]);

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
    <div className="min-h-screen bg-gray-100 p-10 ml-[10vw] w-[60vw]">
      {/* Job Header */}
      <div className="bg-white shadow-sm rounded-sm p-4 mb-6 border-b-2">
        <div className="flex justify-between p-2 border-b-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 border-b">
              {job?.title || "Loading..."}
            </h1>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search applicant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-md mt- w-full"
            />
          </div>
        </div>

        <p className="text-gray-600 mt-2">
          Total Applicants: {applications.length}
        </p>

        <p className="text-green-600 text-sm">
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
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
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
                  href={`${import.meta.env.VITE_API_URL}/uploads/${app?.applicant?.profile?.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                >
                  View Resume
                </a>

                <a
                  href={`${import.meta.env.VITE_API_URL}/uploads/${app?.applicant?.profile?.resume}`}
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
