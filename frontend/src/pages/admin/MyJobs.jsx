// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/context/Auth';
// import axios from 'axios';
// import { ChevronRight, MoveRight, PanelRight } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { NavLink, useParams } from 'react-router-dom';

// function MyJobs() {
//   const { auth, setAuth } = useAuth();
//   const [jobs, setJobs] = useState([]);
//   const params = useParams()

//   const getAllJobs = async() => {
//     try {
//           // const token = localStorage.getItem("token");

//       const {data} = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/job/get/admin`,
//               {
//         headers: {
//           Authorization: `Bearer ${auth?.token}`,
//         },
//       }

//       )
//       if(data?.success){
//         setJobs(data?.jobs)

//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error");
//     }
//   }

//   useEffect(() => {
//     getAllJobs()

//   },[]);

//   return (
//   <div className="min-h-screen bg-transparent p-8 ml-[8vw] shadow-lg rounded-2xl">
//     <h1 className="text-3xl font-bold mb-8 text-gray-800">
//       My Posted Jobs
//     </h1>

//     {jobs.length === 0 ? (
//       <div className="text-center text-gray-500 text-lg">
//         No jobs posted yet.
//       </div>
//     ) : (
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {jobs.map((j) => (
//           <div
//             key={j._id}
//             className="bg-transparent rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border"
//           >
//             {/* Job Title */}
//             <h2 className="text-xl font-bold text-indigo-600 mb-3">
//               {j.title}
//             </h2>

//             {/* Company */}
//             <p className="text-gray-700 text-sm mb-1">
//               🏢 <span className="font-medium">Company Name:</span> {j.companyId.name}
//             </p>

//             {/* Job Type */}
//             <p className="text-gray-700 text-sm mb-1">
//               💼 <span className="font-medium">Type:</span> {j.jobType}
//             </p>

//             {/* Location */}
//             <p className="text-gray-700 text-sm mb-1">
//               📍 <span className="font-medium">Location:</span> {j.location}
//             </p>

//             {/* Salary */}
//             <p className="text-gray-700 text-sm mb-1">
//               💰 <span className="font-medium">Salary:</span> ₹{j.salary}
//             </p>

//             {/* Experience */}
//             <p className="text-gray-700 text-sm mb-1">
//               👨‍💻 <span className="font-medium">Experience:</span> {j.experienceLevel} years
//             </p>

//             {/* Vacant Positions */}
//             <p className="text-gray-700 text-sm mb-3">
//               🪑 <span className="font-medium">Positions:</span> {j.position}
//             </p>

//             {/* Requirements */}
//             <div className="mb-3">
//               <p className="text-sm font-medium text-gray-800">
//                 📋 Requirements:
//               </p>
//               <p className="text-gray-600 text-sm line-clamp-3">
//                 {j.requirements}
//               </p>
//             </div>

//             {/* Description */}
//             <div className="mb-4">
//               <p className="text-sm font-medium text-gray-800">
//                 📝 Description:
//               </p>
//               <p className="text-gray-600 text-sm line-clamp-3">
//                 {j.description}
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4 mt-4">
//               <button className="bg-indigo-600 text-white px-12 py-2 rounded-md hover:bg-indigo-700">
//                 Edit
//               </button>

//               <button className="bg-red-500 text-white px-9 py-2 rounded-md hover:bg-red-600">
//                 Delete
//               </button>
//             </div>

//             <div className='mt-4 flex'>
//               <Button className="px-16">
//                 <NavLink className={' text-zinc-300'} to={`${j._id}/applicants`}>View Applicants </NavLink>
//                 <ChevronRight/>
//               </Button>
//             </div>

//           </div>
//         ))}
//       </div>
//     )}
//   </div>
//   )
// }

// export default MyJobs

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth";
import axios from "axios";
import {
  ChevronRight,
  Briefcase,
  MapPin,
  IndianRupee,
  Trash2,
  Pencil,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function MyJobs() {
  const { auth, setAuth } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllJobs = async () => {
    try {
      setLoading(true);

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
      console.log(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllJobs();
  }, [auth?.token]);

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

        {/* Title */}
        <div className="relative z-10 mb-10">
          <h1 className="text-3xl font-bold text-white">My Posted Jobs</h1>
          <p className="text-sm mt-2 text-white/50">
            View, manage, and track all your posted jobs.
          </p>

          <div className="mt-5 h-[1px] w-full rounded-2xl bg-gradient-to-r from-purple-500/60 via-fuchsia-500/40 to-indigo-500/20" />
        </div>

        {/* Loading */}
        {loading && (
          <p className="relative z-10 text-white/50 text-sm">
            Loading your jobs...
          </p>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <div
            className="relative z-10 p-10 rounded-2xl border backdrop-blur-xl text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(196,181,253,0.15)",
            }}
          >
            <p className="text-white/60 text-lg font-semibold">
              No jobs posted yet.
            </p>
            <p className="text-white/40 text-sm mt-2">
              Post a job to start receiving applications.
            </p>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && jobs.length > 0 && (
          <div className="relative z-10 flex md:flex-row-2 lg:flex-row-3 gap-4">
            {jobs.map((j) => (
              <div
                key={j._id}
                className="rounded-2xl lg:w-[18vw] border backdrop-blur-xl p-6 shadow-lg hover:scale-[1.02] transition duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(196,181,253,0.15)",
                }}
              >
                {/* Job Title */}
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Briefcase size={18} className="text-purple-300" />
                  {j.title}
                </h2>

                {/* Company */}
                <p className="text-sm text-white/60 mb-4">
                  <span className="text-white/40">Company:</span>{" "}
                  {j.companyId?.name || "N/A"}
                </p>

                {/* Details */}
                <div className="space-y-2 text-sm text-white/60">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-purple-300" />
                    {j.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-purple-300" />₹
                    {j.salary} LPA
                  </p>

                  <p>
                    <span className="text-white/40">Job Type:</span> {j.jobType}
                  </p>

                  <p>
                    <span className="text-white/40">Experience:</span>{" "}
                    {j.experienceLevel}
                  </p>

                  <p>
                    <span className="text-white/40">Positions:</span>{" "}
                    {j.position}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-5 h-[1px] w-full bg-white/10" />

                {/* Requirements */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white mb-1">
                    Requirements
                  </p>
                  <p className="text-sm text-white/50 line-clamp-3">
                    {j.requirements}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-5">
                  <p className="text-sm font-semibold text-white mb-1">
                    Description
                  </p>
                  <p className="text-sm text-white/50 line-clamp-3">
                    {j.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    className="flex items-center justify-center gap-2 w-1/2 py-2.5 rounded-xl text-sm font-semibold text-white border hover:opacity-90 transition"
                    style={{
                      borderColor: "rgba(196,181,253,0.2)",
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(157,92,246,0.2))",
                    }}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 w-1/2 py-2.5 rounded-xl text-sm font-semibold text-white border hover:opacity-90 transition"
                    style={{
                      borderColor: "rgba(244,63,94,0.3)",
                      background: "rgba(244,63,94,0.15)",
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>

                {/* View Applicants */}
                <div className="mt-4">
                  <NavLink to={`${j._id}/applicants`}>
                    <Button
                      className="w-full py-6 rounded-xl font-semibold text-white hover:opacity-90 transition"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #9D5CF6)",
                      }}
                    >
                      View Applicants <ChevronRight className="ml-2" />
                    </Button>
                  </NavLink>
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

export default MyJobs;
