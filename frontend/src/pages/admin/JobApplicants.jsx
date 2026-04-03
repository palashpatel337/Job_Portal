// // import { useAuth } from "@/context/Auth";
// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // function JobApplicants() {
// //   const { jobId } = useParams();
// //   const { auth } = useAuth();
// //   const [job, setJob] = useState(null);
// //   const [applications, setApplications] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [search, setSearch] = useState("");

// //   // ==============================
// //   // Fetch Applicants
// //   // ==============================
// //   const getApplicants = async () => {
// //     try {
// //       setLoading(true);
// //       console.log("🔍 Params:", jobId);
// //       console.log("🔑 Auth Token:", auth?.token);

// //       const url = `${import.meta.env.VITE_API_URL}/api/v1/application/${jobId}/applicants`;
// //       console.log("📡 API URL:", url);
// //       console.log("🚀 Sending request with header:", { Authorization: `Bearer ${auth?.token}` });

// //       const { data } = await axios.get(url, {
// //         headers: {
// //           Authorization: `Bearer ${auth?.token}`
// //         }
// //       });

// //       console.log("✅ Response received:", data);

// //       if (data?.success) {
// //         console.log("📦 Job data:", data?.job);
// //         console.log("📝 Applications:", data?.job?.applications);

// //         const sortedApplicants =
// //           data?.job?.applications?.sort(
// //             (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
// //           ) || [];

// //         console.log("📊 Sorted applicants:", sortedApplicants);
// //         setJob(data?.job);
// //         setApplications(sortedApplicants);
// //       } else {
// //         console.warn("⚠️ Response success is false:", data);
// //       }
// //     } catch (error) {
// //       console.error("❌ Error details:", error);
// //       console.error("Response data:", error.response?.data);
// //       console.error("Error message:", error.response?.data?.message || error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ==============================
// //   // Update Application Status
// //   // ==============================
// //   const handleStatusChange = async (applicationId, newStatus) => {
// //     try {
// //       console.log("🔄 Updating status for:", applicationId, "to:", newStatus);
// //       console.log("🔑 Auth Token:", auth?.token);

// //       const url = `${import.meta.env.VITE_API_URL}/api/v1/application/status/${applicationId}/update`;
// //       console.log("📡 API URL:", url);

// //       const { data } = await axios.put(
// //         url,
// //         { status: newStatus },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${auth?.token}`
// //           }
// //         }
// //       );

// //       console.log("✅ Status update response:", data);

// //       if (data?.success) {
// //         setApplications((prev) =>
// //           prev.map((app) =>
// //             app._id === applicationId ? { ...app, status: newStatus } : app,
// //           ),
// //         );
// //         console.log("✓ Application state updated");
// //       }
// //     } catch (error) {
// //       console.error("❌ Status update error:", error);
// //       console.error("Response data:", error.response?.data);
// //       console.error("Error message:", error.response?.data?.message || error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     console.log("🔍 useEffect triggered");
// //     console.log("jobId:", jobId, "auth?.token:", auth?.token);
// //     if (jobId && auth?.token) {
// //       console.log("✅ Conditions met, calling getApplicants");
// //       getApplicants();
// //     } else {
// //       console.warn("⚠️ Conditions not met - missing jobId or auth?.token");
// //     }
// //   }, [jobId, auth?.token]);

// //   // ==============================
// //   // Filter Applicants by Search
// //   // ==============================
// //   const filteredApplicants = applications.filter((app) =>
// //     app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()),
// //   );

// //   // ==============================
// //   // UI
// //   // ==============================
// //   return (
// //     <div className="min-h-screen bg-transparent p-10 ml-[10vw] w-[60vw] shadow-lg rounded-2xl">
// //       {/* Job Header */}
// //       <div className="bg-transparent shadow-sm rounded-sm px-2 py-4 mb-6 border-b-2 border-zinc-900">
// //         <div className="flex justify-between p-2 border-b-2 border-zinc-900">
// //           <div>
// //             <h1 className="text-2xl font-bold text-white">
// //               {job?.title || "Loading..."}
// //             </h1>
// //           </div>

// //           <div>
// //             <input
// //               type="text"
// //               placeholder="Search applicant..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="border-1 border-[#7C3AED] px-3 py-2 rounded-md w-full text-zinc-400 bg-[#380070]"
// //             />
// //           </div>
// //         </div>

// //         <p className="text-gray-100 mt-2">
// //           Total Applicants: {applications.length}
// //         </p>

// //         <p className="text-indigo-600 text-sm">
// //           Accepted: {applications.filter((a) => a.status === "accepted").length}
// //         </p>

// //         {/* Search */}
// //       </div>

// //       {/* Loading */}
// //       {loading && (
// //         <p className="text-center text-gray-600">Loading applicants...</p>
// //       )}

// //       {/* Applicants List */}
// //       <div className="grid gap-6">
// //         {Array.isArray(filteredApplicants) &&
// //           filteredApplicants.map((app) => (
// //             <div
// //               key={app._id}
// //  className="
// //   bg-white/5 backdrop-blur-xl
// //   border border-white/10
// //   rounded-2xl p-6
// //   shadow-lg shadow-purple-500/20
// //   hover:shadow-purple-600/40
// //   hover:border-purple-400/30
// //   transition-all duration-300
// // ">
// //               {/* Applicant Header */}
// //               <div className="flex justify-between items-center mb-4">
// //                 <div className="flex items-center gap-4">
// //                   {/* Profile Photo */}
// //                   <img
// //                     src={`${import.meta.env.VITE_API_URL}/uploads/${app?.applicant?.profile?.profilePhoto}`}
// //                     alt="profile"
// //                     className="w-12 h-12 rounded-full object-cover"
// //                   />

// //                   <div>
// //                     <h2 className="text-lg font-semibold text-white">
// //                       {app?.applicant?.fullname}
// //                     </h2>

// //                     <p className="text-gray-300 text-sm">
// //                       {app?.applicant?.email}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Status Badge */}
// //                 <span
// //                   className={`px-3 py-1 text-xs rounded-full font-medium
// //                     ${
// //                       app.status === "accepted"
// //                         ? "bg-green-100 text-green-700"
// //                         : app.status === "rejected"
// //                           ? "bg-red-100 text-red-700"
// //                           : "bg-yellow-100 text-yellow-700"
// //                     }`}
// //                 >
// //                   {app.status}
// //                 </span>
// //               </div>

// //               {/* Bio */}
// //               <p className="text-gray-500 text-sm mb-2">
// //                 {app?.applicant?.profile?.bio || "No bio provided"}
// //               </p>

// //               {/* Skills */}
// //               <p className="text-sm text-gray-500 mb-3">
// //                 Skills:{" "}
// //                 {app?.applicant?.profile?.skills?.length > 0
// //                   ? app?.applicant?.profile?.skills.join(", ")
// //                   : "Not specified"}
// //               </p>

// //               {/* Resume Buttons */}
// //               <div className="flex gap-3 mb-3">
// //                 <a
// //                   href={`${app?.applicant?.profile?.resume}`}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
// //                 >
// //                   View Resume
// //                 </a>

// //                 <a
// //                   href={`${app?.applicant?.profile?.resume}`}
// //                   download
// //                   className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800"
// //                 >
// //                   Download
// //                 </a>

// //                 <a
// //                   href={`mailto:${app?.applicant?.email}`}
// //                   className="bg-indigo-500 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-600"
// //                 >
// //                   Contact
// //                 </a>
// //               </div>

// //               {/* Status Dropdown */}
// //               <select
// //                 className={`border px-3 py-1 rounded-md font-medium
// //                   ${
// //                     app.status === "accepted"
// //                       ? "bg-green-200 text-green-800"
// //                       : app.status === "rejected"
// //                         ? "bg-red-200 text-red-800"
// //                         : "bg-yellow-200 text-yellow-800"
// //                   }`}
// //                 value={app.status}
// //                 onChange={(e) => handleStatusChange(app._id, e.target.value)}
// //               >
// //                 <option value="pending">Pending</option>
// //                 <option value="accepted">Accept</option>
// //                 <option value="rejected">Reject</option>
// //               </select>

// //               {/* Applied Date */}
// //               <p className="text-gray-500 text-sm mt-3">
// //                 Applied on: {new Date(app.createdAt).toLocaleDateString()}
// //               </p>
// //             </div>
// //           ))}

// //         {/* No Applicants */}
// //         {!loading && filteredApplicants.length === 0 && (
// //           <p className="text-center text-gray-500">No applicants found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default JobApplicants;

// import { useAuth } from "@/context/Auth";
// import axios from "axios";
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";

// import {
//   Search,
//   Users,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   Mail,
//   Download,
//   FileText,
// } from "lucide-react";

// function JobApplicants() {
//   const { jobId } = useParams();
//   const { auth } = useAuth();

//   const [job, setJob] = useState(null);
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   // ==============================
//   // Fetch Applicants
//   // ==============================
//   const getApplicants = async () => {
//     try {
//       setLoading(true);

//       const url = `${import.meta.env.VITE_API_URL}/api/v1/application/${jobId}/applicants`;

//       const { data } = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${auth?.token}`,
//         },
//       });

//       if (data?.success) {
//         const sortedApplicants =
//           data?.job?.applications?.sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//           ) || [];

//         setJob(data?.job);
//         setApplications(sortedApplicants);
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error fetching applicants");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // Update Application Status
//   // ==============================
//   const handleStatusChange = async (applicationId, newStatus) => {
//     try {
//       const url = `${import.meta.env.VITE_API_URL}/api/v1/application/status/${applicationId}/update`;

//       const { data } = await axios.put(
//         url,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         },
//       );

//       if (data?.success) {
//         setApplications((prev) =>
//           prev.map((app) =>
//             app._id === applicationId ? { ...app, status: newStatus } : app,
//           ),
//         );
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error updating status");
//     }
//   };

//   useEffect(() => {
//     if (jobId && auth?.token) getApplicants();
//   }, [jobId, auth?.token]);

//   // ==============================
//   // Filter Applicants
//   // ==============================
//   const filteredApplicants = useMemo(() => {
//     return applications.filter((app) =>
//       app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()),
//     );
//   }, [applications, search]);

//   // ==============================
//   // Stats
//   // ==============================
//   const stats = useMemo(() => {
//     const total = applications.length;
//     const accepted = applications.filter((a) => a.status === "accepted").length;
//     const rejected = applications.filter((a) => a.status === "rejected").length;
//     const pending = applications.filter((a) => a.status === "pending").length;

//     return { total, accepted, rejected, pending };
//   }, [applications]);

//   // ==============================
//   // Badge
//   // ==============================
//   const StatusBadge = ({ status }) => {
//     const base =
//       "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border";

//     if (status === "pending") {
//       return (
//         <span
//           className={base}
//           style={{
//             background: "rgba(255,255,255,0.05)",
//             borderColor: "rgba(255,255,255,0.15)",
//             color: "rgba(255,255,255,0.6)",
//           }}
//         >
//           Pending
//         </span>
//       );
//     }

//     if (status === "accepted") {
//       return (
//         <span
//           className={base}
//           style={{
//             background: "rgba(16,185,129,0.15)",
//             borderColor: "rgba(16,185,129,0.3)",
//             color: "rgba(110,231,183,1)",
//           }}
//         >
//           Accepted
//         </span>
//       );
//     }

//     return (
//       <span
//         className={base}
//         style={{
//           background: "rgba(244,63,94,0.15)",
//           borderColor: "rgba(244,63,94,0.3)",
//           color: "rgba(251,113,133,1)",
//         }}
//       >
//         Rejected
//       </span>
//     );
//   };

//   return (
//     <div
//       className="min-h-screen relative overflow-hidden px-4 sm:px-8 lg:pl-16 lg:pr-48 py-12"
//       style={{
//         background:
//           "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
//       }}
//     >
//       <div className="relative overflow-hidden min-h-screen px-6 py-10 lg:pl-20 lg:pr-48">
//         {/* Glow Orbs */}
//         <div
//           className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25"
//           style={{
//             background: "radial-gradient(circle, #7C3AED, transparent 70%)",
//           }}
//         />
//         <div
//           className="fixed bottom-1/3 left-0 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-20"
//           style={{
//             background: "radial-gradient(circle, #9D5CF6, transparent 70%)",
//           }}
//         />

//         {/* Header */}
//         <div className="relative z-10 mb-10">
//           <h1 className="text-3xl font-bold text-white">
//             {job?.title || "Loading Job..."}
//           </h1>
//           <p className="text-sm mt-2 text-white/50">
//             Manage applicants and update their status instantly.
//           </p>

//           <div className="mt-5 h-[1px] w-full rounded-2xl bg-gradient-to-r from-purple-500/60 via-fuchsia-500/40 to-indigo-500/20" />
//         </div>

//         {/* Stats */}
//         <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
//           <div
//             className="p-5 rounded-2xl border backdrop-blur-xl"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               borderColor: "rgba(196,181,253,0.15)",
//             }}
//           >
//             <div className="flex items-center gap-3">
//               <Users className="text-purple-300" size={20} />
//               <p className="text-white/60 text-sm font-semibold">Applicants</p>
//             </div>
//             <h2 className="text-3xl font-bold text-white mt-3">
//               {stats.total}
//             </h2>
//           </div>

//           <div
//             className="p-5 rounded-2xl border backdrop-blur-xl"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               borderColor: "rgba(196,181,253,0.15)",
//             }}
//           >
//             <div className="flex items-center gap-3">
//               <Clock className="text-yellow-300" size={20} />
//               <p className="text-white/60 text-sm font-semibold">Pending</p>
//             </div>
//             <h2 className="text-3xl font-bold text-white mt-3">
//               {stats.pending}
//             </h2>
//           </div>

//           <div
//             className="p-5 rounded-2xl border backdrop-blur-xl"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               borderColor: "rgba(196,181,253,0.15)",
//             }}
//           >
//             <div className="flex items-center gap-3">
//               <CheckCircle2 className="text-emerald-300" size={20} />
//               <p className="text-white/60 text-sm font-semibold">Accepted</p>
//             </div>
//             <h2 className="text-3xl font-bold text-white mt-3">
//               {stats.accepted}
//             </h2>
//           </div>

//           <div
//             className="p-5 rounded-2xl border backdrop-blur-xl"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               borderColor: "rgba(196,181,253,0.15)",
//             }}
//           >
//             <div className="flex items-center gap-3">
//               <XCircle className="text-rose-300" size={20} />
//               <p className="text-white/60 text-sm font-semibold">Rejected</p>
//             </div>
//             <h2 className="text-3xl font-bold text-white mt-3">
//               {stats.rejected}
//             </h2>
//           </div>
//         </div>

//         {/* Search */}
//         <div
//           className="relative z-10 p-6 rounded-2xl border backdrop-blur-xl mb-10"
//           style={{
//             background: "rgba(255,255,255,0.04)",
//             borderColor: "rgba(196,181,253,0.15)",
//           }}
//         >
//           <h2 className="text-lg font-semibold text-white mb-4">
//             Search Applicants
//           </h2>

//           <div className="relative w-full md:w-[400px]">
//             <Search size={18} className="absolute left-3 top-3 text-white/40" />
//             <input
//               type="text"
//               placeholder="Search by name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-transparent border text-white outline-none"
//               style={{
//                 borderColor: "rgba(196,181,253,0.2)",
//               }}
//             />
//           </div>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <p className="relative z-10 text-white/50 text-sm">
//             Loading applicants...
//           </p>
//         )}

//         {/* No Applicants */}
//         {!loading && filteredApplicants.length === 0 && (
//           <div
//             className="relative z-10 p-10 rounded-2xl border backdrop-blur-xl text-center"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               borderColor: "rgba(196,181,253,0.15)",
//             }}
//           >
//             <p className="text-white/60 text-lg font-semibold">
//               No applicants found.
//             </p>
//             <p className="text-white/40 text-sm mt-2">
//               Try searching with a different name.
//             </p>
//           </div>
//         )}

//         {/* Applicants List */}
//         <div className="relative z-10 space-y-5">
//           {filteredApplicants.map((app) => (
//             <div
//               key={app._id}
//               className="p-6 rounded-2xl border backdrop-blur-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6"
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 borderColor: "rgba(196,181,253,0.15)",
//               }}
//             >
//               {/* Left Side */}
//               <div className="flex flex-col gap-4">
//                 <img
//                   src={`${app?.applicant?.profile?.profilePhoto}`}
//                   alt="profile"
//                   className="w-14 h-14 rounded-full object-cover border border-white/10"
//                 />

//                 <div>
//                   <h2 className="text-lg font-semibold text-white">
//                     {app?.applicant?.fullname}
//                   </h2>
//                   <p className="text-sm text-white/50">
//                     {app?.applicant?.email}
//                   </p>

//                   <p className="text-xs text-white/40 mt-1">
//                     Applied on{" "}
//                     {new Date(app.createdAt).toLocaleDateString("en-IN")}
//                   </p>
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div className="flex flex-col md:items-end gap-4">
//                 {/* Badge */}
//                 <StatusBadge status={app?.status} />

//                 {/* Resume + Contact */}
//                 <div className="flex flex-wrap gap-3">
//                   {app?.applicant?.profile?.resume ? (
//                     <>
//                       <a
//                         href={`${app?.applicant?.profile?.resume}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition flex items-center gap-2"
//                         style={{
//                           borderColor: "rgba(196,181,253,0.2)",
//                           background:
//                             "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(157,92,246,0.2))",
//                           color: "white",
//                         }}
//                       >
//                         <FileText size={16} />
//                         View Resume
//                       </a>

//                       <a
//                         href={`${app?.applicant?.profile?.resume}`}
//                         download
//                         className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition flex items-center gap-2"
//                         style={{
//                           borderColor: "rgba(196,181,253,0.2)",
//                           background: "rgba(255,255,255,0.05)",
//                           color: "white",
//                         }}
//                       >
//                         <Download size={16} />
//                         Download
//                       </a>
//                     </>
//                   ) : (
//                     <span className="text-xs text-white/40">No Resume</span>
//                   )}

//                   <a
//                     href={`mailto:${app?.applicant?.email}`}
//                     className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition flex items-center gap-2"
//                     style={{
//                       borderColor: "rgba(196,181,253,0.2)",
//                       background: "rgba(255,255,255,0.05)",
//                       color: "white",
//                     }}
//                   >
//                     <Mail size={16} />
//                     Contact
//                   </a>
//                 </div>

//                 {/* Dropdown */}
//                 <select
//                   value={app.status}
//                   onChange={(e) => handleStatusChange(app._id, e.target.value)}
//                   className="px-4 py-2 rounded-xl border bg-transparent text-white text-sm outline-none"
//                   style={{
//                     borderColor: "rgba(196,181,253,0.2)",
//                   }}
//                 >
//                   <option value="pending" className="text-black">
//                     Pending
//                   </option>
//                   <option value="accepted" className="text-black">
//                     Accept
//                   </option>
//                   <option value="rejected" className="text-black">
//                     Reject
//                   </option>
//                 </select>
//               </div>

//               {/* Bio + Skills */}
//               <div className="w-full md:w-[35%] text-sm text-white/50 leading-relaxed">
//                 <p className="mb-2">
//                   <span className="text-white/70 font-semibold">Bio:</span>{" "}
//                   {app?.applicant?.profile?.bio || "No bio provided"}
//                 </p>

//                 <p>
//                   <span className="text-white/70 font-semibold">Skills:</span>{" "}
//                   {app?.applicant?.profile?.skills?.length > 0
//                     ? app?.applicant?.profile?.skills.join(", ")
//                     : "Not specified"}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="h-20"></div>
//       </div>
//     </div>
//   );
// }

// export default JobApplicants;




import { useAuth } from "@/context/Auth";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Search,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Download,
  FileText,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

function JobApplicants() {
  const { jobId } = useParams();
  const { auth } = useAuth();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ==============================
  // Skeleton Card
  // ==============================
  const ApplicantSkeleton = () => {
    return (
      <div
        className="p-6 rounded-2xl border backdrop-blur-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(196,181,253,0.15)",
        }}
      >
        {/* Left */}
        <div className="flex flex-col gap-4">
          <Skeleton className="w-14 h-14 rounded-full bg-white/10" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-40 bg-white/10" />
            <Skeleton className="h-3 w-56 bg-white/10" />
            <Skeleton className="h-3 w-32 bg-white/10" />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col md:items-end gap-4">
          <Skeleton className="h-6 w-24 rounded-full bg-white/10" />

          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-10 w-32 rounded-xl bg-white/10" />
            <Skeleton className="h-10 w-32 rounded-xl bg-white/10" />
            <Skeleton className="h-10 w-28 rounded-xl bg-white/10" />
          </div>

          <Skeleton className="h-10 w-40 rounded-xl bg-white/10" />
        </div>

        {/* Bio Skills */}
        <div className="w-full md:w-[35%] space-y-2">
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-[90%] bg-white/10" />
          <Skeleton className="h-4 w-[70%] bg-white/10" />
        </div>
      </div>
    );
  };

  // ==============================
  // Fetch Applicants
  // ==============================
  const getApplicants = async () => {
    try {
      setLoading(true);

      const url = `${import.meta.env.VITE_API_URL}/api/v1/application/${jobId}/applicants`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

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
      const url = `${import.meta.env.VITE_API_URL}/api/v1/application/status/${applicationId}/update`;

      const { data } = await axios.put(
        url,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
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
    if (jobId && auth?.token) getApplicants();
  }, [jobId, auth?.token]);

  // ==============================
  // Filter Applicants
  // ==============================
  const filteredApplicants = useMemo(() => {
    return applications.filter((app) =>
      app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [applications, search]);

  // ==============================
  // Stats
  // ==============================
  const stats = useMemo(() => {
    const total = applications.length;
    const accepted = applications.filter((a) => a.status === "accepted").length;
    const rejected = applications.filter((a) => a.status === "rejected").length;
    const pending = applications.filter((a) => a.status === "pending").length;

    return { total, accepted, rejected, pending };
  }, [applications]);

  // ==============================
  // Badge
  // ==============================
  const StatusBadge = ({ status }) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border";

    if (status === "pending") {
      return (
        <span
          className={base}
          style={{
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Pending
        </span>
      );
    }

    if (status === "accepted") {
      return (
        <span
          className={base}
          style={{
            background: "rgba(16,185,129,0.15)",
            borderColor: "rgba(16,185,129,0.3)",
            color: "rgba(110,231,183,1)",
          }}
        >
          Accepted
        </span>
      );
    }

    return (
      <span
        className={base}
        style={{
          background: "rgba(244,63,94,0.15)",
          borderColor: "rgba(244,63,94,0.3)",
          color: "rgba(251,113,133,1)",
        }}
      >
        Rejected
      </span>
    );
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden px-4 sm:px-8 lg:pl-16 lg:pr-48 py-12"
      style={{
        background:
          "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
      }}
    >
      <div className="relative overflow-hidden min-h-screen px-6 py-10 lg:pl-20 lg:pr-48">
        {/* Glow Orbs */}
        <div
          className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25"
          style={{
            background: "radial-gradient(circle, #7C3AED, transparent 70%)",
          }}
        />
        <div
          className="fixed bottom-1/3 left-0 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #9D5CF6, transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="relative z-10 mb-10">
          <h1 className="text-3xl font-bold text-white">
            {job?.title || "Loading Job..."}
          </h1>
          <p className="text-sm mt-2 text-white/50">
            Manage applicants and update their status instantly.
          </p>

          <div className="mt-5 h-[1px] w-full rounded-2xl bg-gradient-to-r from-purple-500/60 via-fuchsia-500/40 to-indigo-500/20" />
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div
            className="p-5 rounded-2xl border backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <Users className="text-purple-300" size={20} />
              <p className="text-white/60 text-sm font-semibold">Applicants</p>
            </div>
            <h2 className="text-3xl font-bold text-white mt-3">
              {stats.total}
            </h2>
          </div>

          <div
            className="p-5 rounded-2xl border backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-300" size={20} />
              <p className="text-white/60 text-sm font-semibold">Pending</p>
            </div>
            <h2 className="text-3xl font-bold text-white mt-3">
              {stats.pending}
            </h2>
          </div>

          <div
            className="p-5 rounded-2xl border backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-300" size={20} />
              <p className="text-white/60 text-sm font-semibold">Accepted</p>
            </div>
            <h2 className="text-3xl font-bold text-white mt-3">
              {stats.accepted}
            </h2>
          </div>

          <div
            className="p-5 rounded-2xl border backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <XCircle className="text-rose-300" size={20} />
              <p className="text-white/60 text-sm font-semibold">Rejected</p>
            </div>
            <h2 className="text-3xl font-bold text-white mt-3">
              {stats.rejected}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div
          className="relative z-10 p-6 rounded-2xl border backdrop-blur-xl mb-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(196,181,253,0.15)",
          }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Search Applicants
          </h2>

          <div className="relative w-full md:w-[400px]">
            <Search size={18} className="absolute left-3 top-3 text-white/40" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-transparent border text-white outline-none"
              style={{
                borderColor: "rgba(196,181,253,0.2)",
              }}
            />
          </div>
        </div>

        {/* Skeleton Loading */}
        {loading && (
          <div className="relative z-10 space-y-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <ApplicantSkeleton key={i} />
            ))}
          </div>
        )}

        {/* No Applicants */}
        {!loading && filteredApplicants.length === 0 && (
          <div
            className="relative z-10 p-10 rounded-2xl border backdrop-blur-xl text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <p className="text-white/60 text-lg font-semibold">
              No applicants found.
            </p>
            <p className="text-white/40 text-sm mt-2">
              Try searching with a different name.
            </p>
          </div>
        )}

        {/* Applicants List */}
        {!loading && (
          <div className="relative z-10 space-y-5">
            {filteredApplicants.map((app) => (
              <div
                key={app._id}
                className="p-6 rounded-2xl border backdrop-blur-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(196,181,253,0.15)",
                }}
              >
                {/* Left Side */}
                <div className="flex flex-col gap-4">
                  <img
                    src={`${app?.applicant?.profile?.profilePhoto}`}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border border-white/10"
                  />

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {app?.applicant?.fullname}
                    </h2>
                    <p className="text-sm text-white/50">
                      {app?.applicant?.email}
                    </p>

                    <p className="text-xs text-white/40 mt-1">
                      Applied on{" "}
                      {new Date(app.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col md:items-end gap-4">
                  {/* Badge */}
                  <StatusBadge status={app?.status} />

                  {/* Resume + Contact */}
                  <div className="flex flex-wrap gap-3">
                    {app?.applicant?.profile?.resume ? (
                      <>
                        <a
                          href={`${app?.applicant?.profile?.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition flex items-center gap-2"
                          style={{
                            borderColor: "rgba(196,181,253,0.2)",
                            background:
                              "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(157,92,246,0.2))",
                            color: "white",
                          }}
                        >
                          <FileText size={16} />
                          View Resume
                        </a>

                        <a
                          href={`${app?.applicant?.profile?.resume}`}
                          download
                          className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition flex items-center gap-2"
                          style={{
                            borderColor: "rgba(196,181,253,0.2)",
                            background: "rgba(255,255,255,0.05)",
                            color: "white",
                          }}
                        >
                          <Download size={16} />
                          Download
                        </a>
                      </>
                    ) : (
                      <span className="text-xs text-white/40">No Resume</span>
                    )}

                    <a
                      href={`mailto:${app?.applicant?.email}`}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition flex items-center gap-2"
                      style={{
                        borderColor: "rgba(196,181,253,0.2)",
                        background: "rgba(255,255,255,0.05)",
                        color: "white",
                      }}
                    >
                      <Mail size={16} />
                      Contact
                    </a>
                  </div>

                  {/* Dropdown */}
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                    className="px-4 py-2 rounded-xl border bg-transparent text-white text-sm outline-none"
                    style={{
                      borderColor: "rgba(196,181,253,0.2)",
                    }}
                  >
                    <option value="pending" className="text-black">
                      Pending
                    </option>
                    <option value="accepted" className="text-black">
                      Accept
                    </option>
                    <option value="rejected" className="text-black">
                      Reject
                    </option>
                  </select>
                </div>

                {/* Bio + Skills */}
                <div className="w-full md:w-[35%] text-sm text-white/50 leading-relaxed">
                  <p className="mb-2">
                    <span className="text-white/70 font-semibold">Bio:</span>{" "}
                    {app?.applicant?.profile?.bio || "No bio provided"}
                  </p>

                  <p>
                    <span className="text-white/70 font-semibold">Skills:</span>{" "}
                    {app?.applicant?.profile?.skills?.length > 0
                      ? app?.applicant?.profile?.skills.join(", ")
                      : "Not specified"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default JobApplicants;