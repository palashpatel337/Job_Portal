// import { useAuth } from "@/context/Auth";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import Layout from "@/components/shared/Layout";
// import { NavLink } from "react-router-dom";

// function MyApplications() {
//   const [auth, setAuth] = useAuth();
//   const [application, setApplication] = useState([]);

//   const getApplications = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/application/get`,
//         {
//     headers: {
//       Authorization: `Bearer ${auth?.token}`
//     }
//   }
//       );
//       if (data?.success) {
//         setApplication(data?.application);
//         console.log(data?.application.job);
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) {
//       getApplications();
//       console.log(auth?.token);
//     }
//   }, [auth?.token]);

// return (
//   <Layout>
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
//       <div className="max-w-6xl mx-auto space-y-8">

//         {/* PAGE TITLE */}
//         <div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             My Applications
//           </h1>
//           <p className="text-zinc-500 mt-2">
//             Track all the jobs you’ve applied for
//           </p>
//         </div>

//         {/* EMPTY STATE */}
//         {application?.length === 0 && (
//           <div className="text-center py-20 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl">
//             <h2 className="text-xl font-semibold text-zinc-700">
//               No Applications Yet
//             </h2>
//             <p className="text-zinc-500 mt-2">
//               Start applying to jobs to see them here.
//             </p>
//           </div>
//         )}

//         {/* APPLICATION CARDS */}
//         <div className="grid gap-6">
//           {application?.map((a) => (
//             <Card
//               key={a._id}
//               className="rounded-3xl border-0 bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//             >
//               <CardContent className="p-8 space-y-6">

//                 {/* TOP SECTION */}
//                 <div className="flex justify-between items-start flex-wrap gap-6">

//                   <div className="flex gap-5 items-start">

//                     {/* Company Logo Placeholder */}
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
//                       {a.job?.companyId?.name?.charAt(0)}
//                     </div>

//                     <div>
//                       <h2 className="text-2xl font-semibold capitalize">
//                         {a.job?.title}
//                       </h2>

//                       <p className="text-zinc-500 mt-1">
//                         {a.job?.companyId?.name} • {a.job?.location}
//                       </p>

//                       <div className="flex gap-3 mt-4 flex-wrap">
//                         <Badge variant="outline">
//                           {a.job?.jobType}
//                         </Badge>

//                         <Badge variant="secondary">
//                           {a.job?.experienceLevel}+ Years
//                         </Badge>

//                         <Badge variant="outline">
//                           ₹{a.job?.salary}L
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>

//                   {/* STATUS BADGE */}
//                   <Badge
//                     className={`px-4 py-2 rounded-full text-white capitalize text-sm shadow-md
//                       ${
//                         a.status === "accepted"
//                           ? "bg-green-500"
//                           : a.status === "rejected"
//                           ? "bg-red-500"
//                           : "bg-yellow-500"
//                       }`}
//                   >
//                     {a.status}
//                   </Badge>
//                 </div>

//                 {/* DESCRIPTION */}
//                 <p className="text-zinc-600 line-clamp-2 leading-relaxed">
//                   {a.job?.description}
//                 </p>

//                 {/* FOOTER */}
//                 <div className="flex justify-between items-center pt-4 border-t">

//                   <span className="text-sm text-zinc-500">
//                     Applied on{" "}
//                     {new Date(a.createdAt).toLocaleDateString()}
//                   </span>

//                   <Button
//                     className="rounded-full px-6 shadow-md hover:shadow-xl transition"
//                     asChild
//                   >
//                     <NavLink to={`/get/${a.job._id}`}>
//                       View Job
//                     </NavLink>
//                   </Button>

//                 </div>

//               </CardContent>
//             </Card>
//           ))}
//         </div>

//       </div>
//     </div>
//   </Layout>
// );
// }

// export default MyApplications;





import { useAuth } from "@/context/Auth";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/components/shared/Layout";
import { NavLink } from "react-router-dom";

// ── Glow orb ──────────────────────────────────────────────────────────────────
function GlowOrb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-25 ${className}`}
      style={style}
    />
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = status?.toLowerCase();
  const styles =
    s === "accepted" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
    s === "rejected" ? "bg-red-500/20 text-red-300 border-red-500/30"             :
                       "bg-amber-500/20 text-amber-300 border-amber-500/30";
  return (
    <span className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border ${styles}`}>
      {status}
    </span>
  );
}

// ── Info badge ────────────────────────────────────────────────────────────────
function InfoBadge({ children }) {
  return (
    <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
      {children}
    </span>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-6 animate-pulse space-y-5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,181,253,0.1)" }}
    >
      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 rounded-xl bg-white/10 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-2/3 h-4 rounded bg-white/10" />
          <div className="w-1/2 h-3 rounded bg-white/5" />
        </div>
        <div className="w-20 h-7 rounded-full bg-white/10" />
      </div>
      <div className="w-full h-3 rounded bg-white/5" />
      <div className="w-4/5 h-3 rounded bg-white/5" />
      <div className="h-px bg-white/5" />
      <div className="flex justify-between items-center">
        <div className="w-28 h-3 rounded bg-white/10" />
        <div className="w-20 h-8 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function MyApplications() {
  const { auth } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApplications = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/application/get`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) setApplications(data?.application);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getApplications();
  }, [auth?.token]);

  return (
    <Layout>
      <div
        className="min-h-screen relative overflow-hidden px-4 sm:px-8 lg:px-16 xl:px-28 py-12"
        style={{
          background:
            "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
        }}
      >
        {/* Ambient glow orbs */}
        <GlowOrb
          className="w-96 h-96 -top-20 -right-20"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
        />
        <GlowOrb
          className="w-72 h-72 bottom-40 left-1/4"
          style={{ background: "radial-gradient(circle, #9D5CF6, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">

          {/* ── Page header ── */}
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
               style={{ color: "rgba(196,181,253,0.45)" }}>
              Dashboard
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h1
                className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
                style={{
                  background: "linear-gradient(90deg, #fff 40%, #C4B5FD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                My Applications
              </h1>
              {!loading && (
                <span className="text-xs font-semibold tracking-widest uppercase text-purple-300 bg-purple-500/15 border border-purple-400/25 px-5 py-2 rounded-full">
                  {applications.length} application{applications.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
              Track every role you've applied for, all in one place.
            </p>

            {/* Accent line */}
            <div
              className="mt-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, #7C3AED 0%, rgba(196,181,253,0.3) 40%, transparent 100%)",
              }}
            />
          </div>

          {/* ── Skeleton ── */}
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && applications.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-24 rounded-2xl text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(196,181,253,0.1)",
              }}
            >
              <span className="text-5xl mb-4 opacity-30">📭</span>
              <p className="text-xl font-semibold text-white/60">No applications yet</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                Start applying to jobs to track them here.
              </p>
              <NavLink
                to="/"
                className="mt-6 text-sm font-semibold text-white px-6 py-2.5 rounded-full transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
              >
                Browse Jobs →
              </NavLink>
            </div>
          )}

          {/* ── Application cards ── */}
          {!loading && applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((a) => (
                <div
                  key={a._id}
                  className="group rounded-2xl p-6 space-y-5 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(196,181,253,0.12)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(196,181,253,0.3)";
                    e.currentTarget.style.background = "rgba(124,58,237,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(196,181,253,0.12)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {/* Hover radial glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at top left, rgba(124,58,237,0.12), transparent 70%)",
                    }}
                  />

                  {/* ── Top row ── */}
                  <div className="relative flex justify-between items-start flex-wrap gap-4">
                    <div className="flex gap-4 items-start">
                      {/* Company logo */}
                      {a.job?.companyId?.logo ? (
                        <img
                          src={a.job.companyId.logo}
                          alt={a.job.companyId?.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                          style={{ border: "1px solid rgba(196,181,253,0.2)" }}
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                          style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
                        >
                          {a.job?.companyId?.name?.charAt(0) || "?"}
                        </div>
                      )}

                      <div>
                        <h2 className="text-lg font-bold text-white capitalize leading-snug">
                          {a.job?.title}
                        </h2>
                        <p className="text-sm mt-0.5 flex items-center gap-1.5"
                           style={{ color: "rgba(255,255,255,0.4)" }}>
                          <span>{a.job?.companyId?.name}</span>
                          <span
                            className="w-1 h-1 rounded-full inline-block"
                            style={{ background: "rgba(196,181,253,0.4)" }}
                          />
                          <span>{a.job?.location}</span>
                        </p>
                        {/* Info badges */}
                        <div className="flex gap-2 flex-wrap mt-3">
                          <InfoBadge>{a.job?.jobType}</InfoBadge>
                          <InfoBadge>{a.job?.experienceLevel}+ Yrs</InfoBadge>
                          <InfoBadge>₹{a.job?.salary}L</InfoBadge>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <StatusBadge status={a.status} />
                  </div>

                  {/* ── Description snippet ── */}
                  {a.job?.description && (
                    <p
                      className="relative text-sm leading-relaxed line-clamp-2"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {a.job.description}
                    </p>
                  )}

                  {/* ── Footer ── */}
                  <div
                    className="relative flex justify-between items-center pt-4"
                    style={{ borderTop: "1px solid rgba(196,181,253,0.08)" }}
                  >
                    <span className="text-xs" style={{ color: "rgba(196,181,253,0.35)" }}>
                      Applied on{" "}
                      {new Date(a.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>

                    <NavLink
                      to={`/get/${a.job._id}`}
                      className="text-xs font-semibold text-purple-300 hover:text-white transition-colors duration-200"
                    >
                      View Job →
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default MyApplications;
