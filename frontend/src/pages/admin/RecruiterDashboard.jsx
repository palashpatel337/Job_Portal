// // import AdminMenu from '@/components/shared/Adminmenu'
// // import Layout from '@/components/shared/Layout'
// // import React from 'react'

// // function RecruiterDashboard() {
// //   const { jobId } = useParams();
// //   const { auth } = useAuth();
// //   const [job, setJob] = useState(null);
// //   const [applications, setApplications] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //     const getAllJobs = async() => {
// //     try {
// //           // const token = localStorage.getItem("token");

// //       const {data} = await axios.get(
// //         `${import.meta.env.VITE_API_URL}/api/v1/job/get/admin`,
// //               {
// //         headers: {
// //           Authorization: `Bearer ${auth?.token}`,
// //         },
// //       }

// //       )
// //       if(data?.success){
// //         setJobs(data?.jobs)
        
// //       }
// //     } catch (error) {
// //       console.log(error.response?.data?.message || "Error");
// //     }
// //   }

// //   useEffect(() => {
// //     getAllJobs()
    
// //   },[]);




// //     const getApplicants = async () => {
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

// //   useEffect(() => {
// //       console.log("🔍 useEffect triggered");
// //       console.log("jobId:", jobId, "auth?.token:", auth?.token);
// //       if (jobId && auth?.token) {
// //         console.log("✅ Conditions met, calling getApplicants");
// //         getApplicants();
// //       } else {
// //         console.warn("⚠️ Conditions not met - missing jobId or auth?.token");
// //       }
// //     }, [jobId, auth?.token]);
  
// //     // ==============================
// //     // Filter Applicants by Search
// //     // ==============================
// //     const filteredApplicants = applications.filter((app) =>
// //       app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()),
// //     );
  
// //   return (
// //     <div>

// //     </div>
// //   )
// // }

// // export default RecruiterDashboard







// import Layout from "@/components/shared/Layout";
// import AdminMenu from "@/components/shared/Adminmenu";
// import { useAuth } from "@/context/Auth";
// import axios from "axios";
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import {
//   Briefcase,
//   Users,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   Search,
//   MapPin,
//   IndianRupee,
// } from "lucide-react";

// function RecruiterDashboard() {
//   const { jobId } = useParams();
//   const navigate = useNavigate();

//   const { auth, setAuth} = useAuth();

//   const [jobs, setJobs] = useState([]);
//   const [job, setJob] = useState(null);

//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");

//   // ==============================
//   // Get All Recruiter Jobs
//   // ==============================
//   const getAllJobs = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/job/get/admin`,
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         },
//       );

//       if (data?.success) {
//         setJobs(data?.jobs || []);
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error fetching jobs");
//     }
//   };

//   // ==============================
//   // Get Applicants for a Job
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
//   // UseEffects
//   // ==============================
//   useEffect(() => {
//     if (auth?.token) getAllJobs();
//   }, [auth?.token]);

//   useEffect(() => {
//     if (jobId && auth?.token) getApplicants();
//   }, [jobId, auth?.token]);

//   // ==============================
//   // Filter Applicants by Search
//   // ==============================
//   const filteredApplicants = useMemo(() => {
//     return applications.filter((app) =>
//       app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()),
//     );
//   }, [applications, search]);

//   // ==============================
//   // Dashboard Stats
//   // ==============================
//   const stats = useMemo(() => {
//     const totalJobs = jobs.length;

//     let totalApplications = 0;
//     let pending = 0;
//     let accepted = 0;
//     let rejected = 0;

//     applications.forEach((a) => {
//       totalApplications++;
//       if (a.status === "pending") pending++;
//       if (a.status === "accepted") accepted++;
//       if (a.status === "rejected") rejected++;
//     });

//     return {
//       totalJobs,
//       totalApplications,
//       pending,
//       accepted,
//       rejected,
//     };
//   }, [jobs, applications]);

//   // ==============================
//   // Helper: Badge
//   // ==============================
//   const StatusBadge = ({ status }) => {
//     const base =
//       "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border";

//     if (status === "pending") {
//       return (
//         <span
//           className={`${base}`}
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
//           className={`${base}`}
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
//         className={`${base}`}
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
//     // <Layout>
//       <div
//         className="relative overflow-hidden"
//         style={{
//           background:
//             "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
//         }}
//       >
//         {/* Glow orbs */}
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

//           <div className="flex-1 lg:pl-20 lg:pr-48 lg:py-10 mt-5  ">
//             {/* Title */}
//             <div className="mb-10">
//               <h1 className="text-3xl font-bold text-white">
//                 Recruiter Dashboard
//               </h1>
//               <p className="text-sm mt-2 text-white/50">
//                 Manage jobs, view applicants, and track hiring activity.
//               </p>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
//               <div
//                 className="p-5 rounded-2xl border backdrop-blur-xl"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   borderColor: "rgba(196,181,253,0.15)",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <Briefcase className="text-purple-300" size={20} />
//                   <p className="text-white/60 text-sm font-semibold">
//                     Total Jobs
//                   </p>
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mt-3">
//                   {stats.totalJobs}
//                 </h2>
//               </div>

//               <div
//                 className="p-5 rounded-2xl border backdrop-blur-xl"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   borderColor: "rgba(196,181,253,0.15)",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <Users className="text-purple-300" size={20} />
//                   <p className="text-white/60 text-sm font-semibold">
//                     Applications
//                   </p>
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mt-3">
//                   {stats.totalApplications}
//                 </h2>
//               </div>

//               <div
//                 className="p-5 rounded-2xl border backdrop-blur-xl"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   borderColor: "rgba(196,181,253,0.15)",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <Clock className="text-yellow-300" size={20} />
//                   <p className="text-white/60 text-sm font-semibold">Pending</p>
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mt-3">
//                   {stats.pending}
//                 </h2>
//               </div>

//               <div
//                 className="p-5 rounded-2xl border backdrop-blur-xl"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   borderColor: "rgba(196,181,253,0.15)",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <CheckCircle2 className="text-emerald-300" size={20} />
//                   <p className="text-white/60 text-sm font-semibold">
//                     Accepted
//                   </p>
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mt-3">
//                   {stats.accepted}
//                 </h2>
//               </div>

//               <div
//                 className="p-5 rounded-2xl border backdrop-blur-xl"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   borderColor: "rgba(196,181,253,0.15)",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <XCircle className="text-rose-300" size={20} />
//                   <p className="text-white/60 text-sm font-semibold">
//                     Rejected
//                   </p>
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mt-3">
//                   {stats.rejected}
//                 </h2>
//               </div>
//             </div>

//             {/* Job Selector */}
//             <div
//               className="p-6 rounded-2xl border backdrop-blur-xl mb-10"
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 borderColor: "rgba(196,181,253,0.15)",
//               }}
//             >
//               <h2 className="text-lg font-semibold text-white mb-4">
//                 Select a Job
//               </h2>

//               <select
//                 value={jobId || ""}
//                 onChange={(e) =>
//                   navigate(`/dashboard/recruiter/${e.target.value}`)
//                 }
//                 className="w-full p-3 rounded-xl text-white bg-transparent border outline-none"
//                 style={{
//                   borderColor: "rgba(196,181,253,0.2)",
//                 }}
//               >
//                 <option value="" className="text-black">
//                   -- Choose Job --
//                 </option>

//                 {jobs.map((j) => (
//                   <option key={j._id} value={j._id} className="text-black">
//                     {j.title} ({j.location})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Job Details */}
//             {job && (
//               <div
//                 className="p-7 rounded-2xl border backdrop-blur-xl mb-10"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   borderColor: "rgba(196,181,253,0.15)",
//                 }}
//               >
//                 <h2 className="text-xl font-bold text-white mb-2">
//                   {job.title}
//                 </h2>

//                 <div className="flex flex-wrap gap-4 mt-4 text-white/70 text-sm">
//                   <p className="flex items-center gap-2">
//                     <MapPin size={16} className="text-purple-300" />
//                     {job.location}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <IndianRupee size={16} className="text-purple-300" />
//                     {job.salary} LPA
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Briefcase size={16} className="text-purple-300" />
//                     {job.jobType}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Users size={16} className="text-purple-300" />
//                     Openings: {job.position}
//                   </p>
//                 </div>

//                 <p className="mt-5 text-white/50 text-sm leading-relaxed">
//                   {job.description}
//                 </p>
//               </div>
//             )}

//             {/* Applicants */}
//             <div
//               className="p-7 rounded-2xl border backdrop-blur-xl"
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 borderColor: "rgba(196,181,253,0.15)",
//               }}
//             >
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//                 <h2 className="text-xl font-bold text-white">
//                   Recent Applicants
//                 </h2>

//                 {/* Search */}
//                 <div className="relative w-full md:w-[320px]">
//                   <Search
//                     size={18}
//                     className="absolute left-3 top-3 text-white/40"
//                   />
//                   <input
//                     type="text"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search applicant..."
//                     className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-transparent border text-white outline-none"
//                     style={{
//                       borderColor: "rgba(196,181,253,0.2)",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Loading */}
//               {loading && (
//                 <p className="text-white/50 text-sm">Loading applicants...</p>
//               )}

//               {/* No applicants */}
//               {!loading && filteredApplicants.length === 0 && (
//                 <p className="text-white/50 text-sm">
//                   No applicants found for this job.
//                 </p>
//               )}

//               {/* Applicants List */}
//               <div className="space-y-4">
//                 {filteredApplicants.map((app) => (
//                   <div
//                     key={app?._id}
//                     className="p-5 rounded-2xl border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//                     style={{
//                       background: "rgba(255,255,255,0.03)",
//                       borderColor: "rgba(196,181,253,0.12)",
//                     }}
//                   >
//                     <div>
//                       <p className="text-white font-semibold text-lg">
//                         {app?.applicant?.fullname}
//                       </p>

//                       <p className="text-sm text-white/50">
//                         {app?.applicant?.email}
//                       </p>

//                       <p className="text-xs text-white/40 mt-1">
//                         Applied on{" "}
//                         {new Date(app.createdAt).toLocaleDateString("en-IN")}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <StatusBadge status={app?.status} />

//                       {app?.applicant?.profile?.resume ? (
//                         <a
//                           href={app?.applicant?.profile?.resume}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition"
//                           style={{
//                             borderColor: "rgba(196,181,253,0.2)",
//                             background:
//                               "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(157,92,246,0.2))",
//                             color: "white",
//                           }}
//                         >
//                           View Resume
//                         </a>
//                       ) : (
//                         <span className="text-xs text-white/40">
//                           No Resume
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Jobs list */}
//             <div className="mt-10">
//               <h2 className="text-xl font-bold text-white mb-6">
//                 Your Posted Jobs
//               </h2>

//               <div className="grid md:grid-cols-2 gap-5">
//                 {jobs.map((j) => (
//                   <div
//                     key={j._id}
//                     className="p-6 rounded-2xl border backdrop-blur-xl"
//                     style={{
//                       background: "rgba(255,255,255,0.04)",
//                       borderColor: "rgba(196,181,253,0.15)",
//                     }}
//                   >
//                     <h3 className="text-lg font-semibold text-white">
//                       {j.title}
//                     </h3>
//                     <p className="text-sm text-white/50 mt-1">{j.location}</p>

//                     <div className="flex flex-wrap gap-3 mt-4 text-sm text-white/60">
//                       <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
//                         {j.jobType}
//                       </span>
//                       <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
//                         {j.experienceLevel}+ yrs
//                       </span>
//                       <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
//                         ₹{j.salary} LPA
//                       </span>
//                     </div>

//                     <button
//                       onClick={() =>
//                         navigate(`/dashboard/recruiter/${j._id}`)
//                       }
//                       className="mt-5 w-full py-2.5 rounded-xl font-semibold text-white transition hover:opacity-90"
//                       style={{
//                         background: "linear-gradient(135deg, #7C3AED, #9D5CF6)",
//                       }}
//                     >
//                       View Applicants →
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer spacing */}
//             <div className="h-20"></div>
//           </div>
//         </div>
//   );
// }

// export default RecruiterDashboard;
// {/* <div className="relative z-10 flex"> */}
//   {/* Sidebar */}
//   // <AdminMenu />

//   {/* Main */}
// // </div>
// // {/* </Layout> */}


import { useAuth } from "@/context/Auth";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Briefcase,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  MapPin,
  IndianRupee,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

function RecruiterDashboard() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);

  const [applications, setApplications] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const [search, setSearch] = useState("");

  // ==============================
  // Get All Recruiter Jobs
  // ==============================
  const getAllJobs = async () => {
    try {
      setLoadingJobs(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/job/get/admin`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (data?.success) {
        setJobs(data?.jobs || []);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  // ==============================
  // Get Applicants for a Job
  // ==============================
  const getApplicants = async () => {
    try {
      setLoadingApplicants(true);

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
      setLoadingApplicants(false);
    }
  };

  // ==============================
  // UseEffects
  // ==============================
  useEffect(() => {
    if (auth?.token) getAllJobs();
  }, [auth?.token]);

  useEffect(() => {
    if (jobId && auth?.token) getApplicants();
  }, [jobId, auth?.token]);

  // ==============================
  // Filter Applicants by Search
  // ==============================
  const filteredApplicants = useMemo(() => {
    return applications.filter((app) =>
      app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [applications, search]);

  // ==============================
  // Dashboard Stats
  // ==============================
  const stats = useMemo(() => {
    const totalJobs = jobs.length;

    let totalApplications = 0;
    let pending = 0;
    let accepted = 0;
    let rejected = 0;

    applications.forEach((a) => {
      totalApplications++;
      if (a.status === "pending") pending++;
      if (a.status === "accepted") accepted++;
      if (a.status === "rejected") rejected++;
    });

    return {
      totalJobs,
      totalApplications,
      pending,
      accepted,
      rejected,
    };
  }, [jobs, applications]);

  // ==============================
  // Helper: Badge
  // ==============================
  const StatusBadge = ({ status }) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border";

    if (status === "pending") {
      return (
        <span
          className={`${base}`}
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
          className={`${base}`}
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
        className={`${base}`}
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

  // ==============================
  // Skeleton for Posted Jobs Card
  // ==============================
  const PostedJobSkeleton = () => {
    return (
      <div
        className="p-6 rounded-2xl border backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(196,181,253,0.15)",
        }}
      >
        <Skeleton className="h-6 w-[70%] bg-white/10 mb-3" />
        <Skeleton className="h-4 w-[40%] bg-white/10 mb-5" />

        <div className="flex flex-wrap gap-3 mt-4">
          <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
        </div>

        <Skeleton className="h-10 w-full rounded-xl bg-white/10 mt-6" />
      </div>
    );
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
      }}
    >
      {/* Glow orbs */}
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

      <div className="flex-1 lg:pl-16 lg:pr-48 lg:py-10 mt-5">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Recruiter Dashboard</h1>
          <p className="text-sm mt-2 text-white/50">
            Manage jobs, view applicants, and track hiring activity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          <div
            className="p-5 rounded-2xl border backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="text-purple-300" size={20} />
              <p className="text-white/60 text-sm font-semibold">Total Jobs</p>
            </div>
            <h2 className="text-3xl font-bold text-white mt-3">
              {stats.totalJobs}
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
              <Users className="text-purple-300" size={20} />
              <p className="text-white/60 text-sm font-semibold">
                Applications
              </p>
            </div>
            <h2 className="text-3xl font-bold text-white mt-3">
              {stats.totalApplications}
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

        {/* Job Selector */}
        <div
          className="p-6 rounded-2xl border backdrop-blur-xl mb-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(196,181,253,0.15)",
          }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Select a Job
          </h2>

          <select
            value={jobId || ""}
            onChange={(e) => navigate(`/dashboard/recruiter/${e.target.value}`)}
            className="w-full p-3 rounded-xl text-white bg-transparent border outline-none"
            style={{
              borderColor: "rgba(196,181,253,0.2)",
            }}
          >
            <option value="" className="text-black">
              -- Choose Job --
            </option>

            {jobs.map((j) => (
              <option key={j._id} value={j._id} className="text-black">
                {j.title} ({j.location})
              </option>
            ))}
          </select>
        </div>

        {/* Job Details */}
        {job && (
          <div
            className="p-7 rounded-2xl border backdrop-blur-xl mb-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <h2 className="text-xl font-bold text-white mb-2">{job.title}</h2>

            <div className="flex flex-wrap gap-4 mt-4 text-white/70 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-300" />
                {job.location}
              </p>

              <p className="flex items-center gap-2">
                <IndianRupee size={16} className="text-purple-300" />
                {job.salary} LPA
              </p>

              <p className="flex items-center gap-2">
                <Briefcase size={16} className="text-purple-300" />
                {job.jobType}
              </p>

              <p className="flex items-center gap-2">
                <Users size={16} className="text-purple-300" />
                Openings: {job.position}
              </p>
            </div>

            <p className="mt-5 text-white/50 text-sm leading-relaxed">
              {job.description}
            </p>
          </div>
        )}

        {/* Applicants */}
        <div
          className="p-7 rounded-2xl border backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(196,181,253,0.15)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Recent Applicants</h2>

            <div className="relative w-full md:w-[320px]">
              <Search
                size={18}
                className="absolute left-3 top-3 text-white/40"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applicant..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-transparent border text-white outline-none"
                style={{
                  borderColor: "rgba(196,181,253,0.2)",
                }}
              />
            </div>
          </div>

          {loadingApplicants && (
            <p className="text-white/50 text-sm">Loading applicants...</p>
          )}

          {!loadingApplicants && filteredApplicants.length === 0 && (
            <p className="text-white/50 text-sm">
              No applicants found for this job.
            </p>
          )}

          <div className="space-y-4">
            {filteredApplicants.map((app) => (
              <div
                key={app?._id}
                className="p-5 rounded-2xl border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(196,181,253,0.12)",
                }}
              >
                <div>
                  <p className="text-white font-semibold text-lg">
                    {app?.applicant?.fullname}
                  </p>

                  <p className="text-sm text-white/50">
                    {app?.applicant?.email}
                  </p>

                  <p className="text-xs text-white/40 mt-1">
                    Applied on{" "}
                    {new Date(app.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <StatusBadge status={app?.status} />

                  {app?.applicant?.profile?.resume ? (
                    <a
                      href={app?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-sm font-semibold border hover:opacity-90 transition"
                      style={{
                        borderColor: "rgba(196,181,253,0.2)",
                        background:
                          "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(157,92,246,0.2))",
                        color: "white",
                      }}
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-xs text-white/40">No Resume</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs list */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-6">Your Posted Jobs</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {loadingJobs &&
              Array.from({ length: 4 }).map((_, i) => (
                <PostedJobSkeleton key={i} />
              ))}

            {!loadingJobs &&
              jobs.map((j) => (
                <div
                  key={j._id}
                  className="p-6 rounded-2xl border backdrop-blur-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(196,181,253,0.15)",
                  }}
                >
                  <h3 className="text-lg font-semibold text-white">{j.title}</h3>
                  <p className="text-sm text-white/50 mt-1">{j.location}</p>

                  <div className="flex flex-wrap gap-3 mt-4 text-sm text-white/60">
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                      {j.jobType}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                      {j.experienceLevel}+ yrs
                    </span>
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                      ₹{j.salary} LPA
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/dashboard/recruiter/${j._id}`)}
                    className="mt-5 w-full py-2.5 rounded-xl font-semibold text-white transition hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #9D5CF6)",
                    }}
                  >
                    View Applicants →
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;