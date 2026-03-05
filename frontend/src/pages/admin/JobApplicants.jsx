import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobApplicants() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==============================
  // Fetch Applicants
  // ==============================
  const getApplicants = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/application/${jobId}/applicants`
      );

      if (data?.success) {
        setJob(data?.job);
        setApplications(data?.job?.applications || []);
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
        { status: newStatus }
      );

      if (data?.success) {
        // Optimistic UI update
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId
              ? { ...app, status: newStatus }
              : app
          )
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
  // UI
  // ==============================
  return (
    <div className="min-h-screen bg-gray-100 p-10 ml-[10vw] w-[60vw]">
      
      {/* Job Header */}
      <div className="bg-whit shadow-sm rounded-sm p-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-zinc-500">
          {job?.title || "Loading..."}
        </h1>
        <p className="text-gray-500 mt-1">
          Total Applicants: {applications?.length}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">Loading applicants...</p>
      )}

      {/* Applicants List */}
      <div className="grid gap-6">
        {Array.isArray(applications) &&
          applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {app?.applicant?.fullname}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {app?.applicant?.email}
                  </p>
                </div>

                {/* Status Dropdown */}
                <select
                  className={`border px-3 py-1 rounded-md font-medium
                    ${
                      app.status === "accepted"
                        ? "bg-green-300 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                  value={app.status}
                  onChange={(e) =>
                    handleStatusChange(app._id, e.target.value)
                  }
                >
                  <option className="rounded-sm text-yellow-900 bg-yellow-100"  value="pending">Pending</option>
                  <option  className="rounded-sm text-green-900 bg-green-200" value="accepted">Accept</option>
                  <option  className="rounded-sm text-red-900 bg-red-300" value="rejected">Reject</option>
                </select>
              </div>

              <p className="text-gray-500 text-sm">
                Applied on:{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}

        {/* No Applicants */}
        {!loading && applications?.length === 0 && (
          <p className="text-center text-gray-500">
            No applicants yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default JobApplicants;