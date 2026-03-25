// import React, { useEffect } from 'react'
// import Layout from "../components/shared/Layout";
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   // CardAction,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { useState } from 'react';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '@/context/Auth';


// function Homepage() {
//   const [jobs,setJobs] = useState([])
//   const [auth, setAuth] = useAuth();

//   const getAllJobs = async() => {
//     try {
//       const {data} = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/job/get`,
//                 {
//     headers: {
//       Authorization: `Bearer ${auth?.token}`
//     }
//   }

//       )
//       if(data?.success){
//         setJobs(data?.jobs || [])
//         console.log(data.jobs);
        
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Error")
      
//     }
//   }
//   useEffect(() => {
//     getAllJobs()
//   },[])


//   return (
//     <Layout>
// <div className="relative top-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 px-36 py-8">
//   {jobs.map((j) => (
    
//     <Card key={j._id} className="w-full">
      
//       <CardHeader>
//         <div className="flex items-center gap-3 mb-2">
//       {j?.companyId?.logo ? (
//         <img
//           src={j.companyId.logo}
//           alt="company logo"
//           className="h-10 w-10 rounded object-cover border"
//         />
//       ) : (
//         <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded">
//           {j.companyId?.name?.charAt(0)}
//         </div>
//       )}
//       </div>
//         <Badge className={"capitalize"} variant="secondary">{j.jobType}</Badge>

//         <CardTitle className="text-lg font-semibold capitalize">
//           {j.title}
//         </CardTitle>

//         <CardDescription>
//           {j.companyId.name} • {j.location}
//         </CardDescription>
//       </CardHeader>

//       <CardFooter className="flex justify-between">
//         <span className="text-sm text-zinc-500">
//           {j.salary && j.salary
//             ? `Salary: ₹${j.salary}LPA`
//             : "Salary Not Disclosed"}
//         </span>

//         <Button size="sm">
//           <NavLink to={`/get/${j._id}`}>View</NavLink>
//         </Button>
//       </CardFooter>
//     </Card>
//   ))}
// </div>
//      </Layout>
//   )
// }

// export default Homepage




import React, { useEffect, useState } from 'react'
import Layout from "../components/shared/Layout";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/Auth';

// ── Badge color by job type ───────────────────────────────────────────────────
function JobBadge({ type = '' }) {
  const t = type.toLowerCase();
  const colors =
    t.includes('full')     ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
    t.includes('part')     ? 'bg-amber-50 text-amber-700 border border-amber-200'       :
    t.includes('remote')   ? 'bg-blue-50 text-blue-700 border border-blue-200'          :
    t.includes('contract') ? 'bg-pink-50 text-pink-700 border border-pink-200'          :
    t.includes('intern')   ? 'bg-violet-50 text-violet-700 border border-violet-200'    :
                             'bg-zinc-100 text-zinc-600 border border-zinc-200';
  return (
    <span className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${colors}`}>
      {type}
    </span>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-xl bg-zinc-200" />
        <div className="w-20 h-5 rounded-full bg-zinc-200" />
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-4 rounded bg-zinc-200" />
        <div className="w-1/2 h-3 rounded bg-zinc-100" />
      </div>
      <div className="h-px bg-zinc-100" />
      <div className="flex items-center justify-between">
        <div className="w-24 h-3 rounded bg-zinc-200" />
        <div className="w-16 h-8 rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function Homepage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  const getAllJobs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/job/get`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) setJobs(data?.jobs || []);
    } catch (error) {
      console.log(error.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getAllJobs(); }, []);

  return (
    <Layout>
      <section className="min-h-screen bg-zinc-50 px-4 sm:px-8 lg:px-16 xl:px-28 py-10">

        {/* ── Header ── */}
        <div className="flex items-end justify-between flex-wrap gap-3 mb-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-1">
              Latest Openings
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              Find Your Next <span className="text-rose-600 italic">Role</span>
            </h2>
          </div>
          {!loading && (
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-500 bg-white border border-zinc-200 px-4 py-1.5 rounded-full">
              {jobs.length} position{jobs.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* ── Accent line ── */}
        <div className="h-px bg-gradient-to-r from-rose-500 via-zinc-200 to-transparent mb-8" />

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)

            : jobs.length === 0
              ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-zinc-400">
                  <span className="text-5xl mb-4 opacity-30">📭</span>
                  <p className="text-xl font-semibold text-zinc-700">No openings right now</p>
                  <p className="text-sm mt-1">Check back soon — new roles are added regularly.</p>
                </div>
              )

              : jobs.map((j) => (
                <div
                  key={j._id}
                  className="group bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col gap-4 hover:border-rose-400 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >

                  {/* Logo + badge */}
                  <div className="flex items-center justify-between">
                    {j?.companyId?.logo
                      ? (
                        <img
                          src={j.companyId.logo}
                          alt={j.companyId?.name}
                          className="w-11 h-11 rounded-xl object-cover border border-zinc-200"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-zinc-900 text-white flex items-center justify-center text-base font-bold uppercase flex-shrink-0">
                          {j.companyId?.name?.charAt(0) || '?'}
                        </div>
                      )
                    }
                    <JobBadge type={j.jobType} />
                  </div>

                  {/* Title + meta */}
                  <div>
                    <p className="text-base font-bold text-zinc-900 capitalize leading-snug tracking-tight">
                      {j.title}
                    </p>
                    <p className="text-sm text-zinc-400 mt-0.5 flex items-center gap-1.5">
                      <span>{j.companyId?.name}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300 inline-block" />
                      <span>{j.location}</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-zinc-100" />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {j.salary
                      ? (
                        <span className="text-sm font-semibold text-zinc-800 flex items-center gap-1">
                          <span className="text-amber-500">₹</span>
                          {j.salary} LPA
                        </span>
                      )
                      : (
                        <span className="text-xs italic text-zinc-400">Salary not disclosed</span>
                      )
                    }
                    <NavLink
                      to={`/get/${j._id}`}
                      className="text-xs font-semibold bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors duration-200"
                    >
                      View →
                    </NavLink>
                  </div>

                </div>
              ))
          }

        </div>
      </section>
    </Layout>
  );
}

export default Homepage;
