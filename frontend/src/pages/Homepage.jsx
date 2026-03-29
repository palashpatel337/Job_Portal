



// import React, { useEffect, useState } from 'react'
// import Layout from "../components/shared/Layout";
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '@/context/Auth';

// // ── Badge color by job type ───────────────────────────────────────────────────
// function JobBadge({ type = '' }) {
//   const t = type.toLowerCase();
//   const colors =
//     t.includes('full')     ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
//     t.includes('part')     ? 'bg-amber-50 text-amber-700 border border-amber-200'       :
//     t.includes('remote')   ? 'bg-blue-50 text-blue-700 border border-blue-200'          :
//     t.includes('contract') ? 'bg-pink-50 text-pink-700 border border-pink-200'          :
//     t.includes('intern')   ? 'bg-violet-50 text-violet-700 border border-violet-200'    :
//                              'bg-zinc-100 text-zinc-600 border border-zinc-200';
//   return (
//     <span className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${colors}`}>
//       {type}
//     </span>
//   );
// }

// // ── Skeleton card ─────────────────────────────────────────────────────────────
// function SkeletonCard() {
//   return (
//     <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
//       <div className="flex items-center justify-between">
//         <div className="w-11 h-11 rounded-xl bg-zinc-200" />
//         <div className="w-20 h-5 rounded-full bg-zinc-200" />
//       </div>
//       <div className="space-y-2">
//         <div className="w-3/4 h-4 rounded bg-zinc-200" />
//         <div className="w-1/2 h-3 rounded bg-zinc-100" />
//       </div>
//       <div className="h-px bg-zinc-100" />
//       <div className="flex items-center justify-between">
//         <div className="w-24 h-3 rounded bg-zinc-200" />
//         <div className="w-16 h-8 rounded-full bg-zinc-200" />
//       </div>
//     </div>
//   );
// }

// // ── Main ──────────────────────────────────────────────────────────────────────
// function Homepage() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [auth] = useAuth();

//   const getAllJobs = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/job/get`,
//         { headers: { Authorization: `Bearer ${auth?.token}` } }
//       );
//       if (data?.success) setJobs(data?.jobs || []);
//     } catch (error) {
//       console.log(error.response?.data?.message || 'Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { getAllJobs(); }, []);

//   return (
//     <Layout>
//       <section className="min-h-screen bg-zinc-50 px-4 sm:px-8 lg:px-16 xl:px-28 py-10">

//         {/* ── Header ── */}
//         <div className="flex items-end justify-between flex-wrap gap-3 mb-3">
//           <div>
//             <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-1">
//               Latest Openings
//             </p>
//             <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
//               Find Your Next <span className="text-purple-600 italic">Role</span>
//             </h2>
//           </div>
//           {!loading && (
//             <span className="text-xs font-medium tracking-widest uppercase text-zinc-500 bg-white border border-zinc-200 px-4 py-1.5 rounded-full">
//               {jobs.length} position{jobs.length !== 1 ? 's' : ''}
//             </span>
//           )}
//         </div>

//         {/* ── Accent line ── */}
//         <div className="h-px bg-gradient-to-r from-purple-500 via-zinc-200 to-transparent mb-8" />

//         {/* ── Grid ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

//           {loading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)

//             : jobs.length === 0
//               ? (
//                 <div className="col-span-full flex flex-col items-center justify-center py-24 text-zinc-400">
//                   <span className="text-5xl mb-4 opacity-30">📭</span>
//                   <p className="text-xl font-semibold text-zinc-700">No openings right now</p>
//                   <p className="text-sm mt-1">Check back soon — new roles are added regularly.</p>
//                 </div>
//               )

//               : jobs.map((j) => (
//                 <div
//                   key={j._id}
//                   className="group bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col gap-4 hover:border-purple-400 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//                 >

//                   {/* Logo + badge */}
//                   <div className="flex items-center justify-between">
//                     {j?.companyId?.logo
//                       ? (
//                         <img
//                           src={j.companyId.logo}
//                           alt={j.companyId?.name}
//                           className="w-11 h-11 rounded-xl object-cover border border-zinc-200"
//                         />
//                       ) : (
//                         <div className="w-11 h-11 rounded-xl bg-zinc-900 text-white flex items-center justify-center text-base font-bold uppercase flex-shrink-0">
//                           {j.companyId?.name?.charAt(0) || '?'}
//                         </div>
//                       )
//                     }
//                     <JobBadge type={j.jobType} />
//                   </div>

//                   {/* Title + meta */}
//                   <div>
//                     <p className="text-base font-bold text-zinc-900 capitalize leading-snug tracking-tight">
//                       {j.title}
//                     </p>
//                     <p className="text-sm text-zinc-400 mt-0.5 flex items-center gap-1.5">
//                       <span>{j.companyId?.name}</span>
//                       <span className="w-1 h-1 rounded-full bg-zinc-300 inline-block" />
//                       <span>{j.location}</span>
//                     </p>
//                   </div>

//                   {/* Divider */}
//                   <div className="h-px bg-zinc-100" />

//                   {/* Footer */}
//                   <div className="flex items-center justify-between">
//                     {j.salary
//                       ? (
//                         <span className="text-sm font-semibold text-zinc-800 flex items-center gap-1">
//                           <span className="text-amber-500">₹</span>
//                           {j.salary} LPA
//                         </span>
//                       )
//                       : (
//                         <span className="text-xs italic text-zinc-400">Salary not disclosed</span>
//                       )
//                     }
//                     <NavLink
//                       to={`/get/${j._id}`}
//                       className="text-xs font-semibold bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors duration-200"
//                     >
//                       View →
//                     </NavLink>
//                   </div>

//                 </div>
//               ))
//           }

//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Homepage;




import React, { useEffect, useState } from 'react'
import Layout from "../components/shared/Layout";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/Auth';

// ── Badge color by job type ───────────────────────────────────────────────────
function JobBadge({ type = '' }) {
  const t = type.toLowerCase();
  const colors =
    t.includes('full')     ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
    t.includes('part')     ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'    :
    t.includes('remote')   ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'          :
    t.includes('contract') ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'       :
    t.includes('intern')   ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                             'bg-white/10 text-white/50 border border-white/20';
  return (
    <span className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${colors}`}>
      {type}
    </span>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-purple-400/10 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-xl bg-white/10" />
        <div className="w-20 h-5 rounded-full bg-white/10" />
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-4 rounded bg-white/10" />
        <div className="w-1/2 h-3 rounded bg-white/5" />
      </div>
      <div className="h-px bg-white/5" />
      <div className="flex items-center justify-between">
        <div className="w-24 h-3 rounded bg-white/10" />
        <div className="w-16 h-8 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

// ── Glowing orb background decoration ────────────────────────────────────────
function GlowOrb({ className }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-30 ${className}`}
    />
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
      {/* ── Page wrapper with dark gradient background ── */}
      <section
        className="min-h-screen px-4 sm:px-8 lg:px-16 xl:px-28 py-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)',
        }}
      >
        {/* Ambient glow orbs */}
        <GlowOrb className="w-96 h-96 bg-purple-600 -top-20 -right-20" />
        <GlowOrb className="w-72 h-72 bg-violet-700 bottom-40 left-1/4" />
        <GlowOrb className="w-56 h-56 bg-fuchsia-700 top-1/2 -left-10" />

        {/* ── Hero header ── */}
        <div className="relative z-10 mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-300/70 mb-3">
            Latest Openings
          </p>

          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
              Find your{' '}
              <span
                className="italic font-bold"
                style={{
                  background: 'linear-gradient(90deg, #C4B5FD, #9D5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                dream role
              </span>
              <br />
              <span className="text-white/80 text-3xl sm:text-4xl font-normal">
                without the noise.
              </span>
            </h2>

            {!loading && (
              <span className="text-xs font-semibold tracking-widest uppercase text-purple-300 bg-purple-500/15 border border-purple-400/25 px-5 py-2 rounded-full backdrop-blur-sm">
                {jobs.length} position{jobs.length !== 1 ? 's' : ''} open
              </span>
            )}
          </div>

          <p className="text-white/50 text-base mt-4 max-w-md leading-relaxed">
            Curated opportunities from companies that actually care about their people.
          </p>

          {/* Accent line */}
          <div
            className="mt-8 h-px w-full"
            style={{
              background: 'linear-gradient(90deg, #7C3AED 0%, rgba(196,181,253,0.3) 40%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Job grid ── */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)

            : jobs.length === 0
              ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-white/30">
                  <span className="text-5xl mb-4 opacity-40">📭</span>
                  <p className="text-xl font-semibold text-white/60">No openings right now</p>
                  <p className="text-sm mt-1 text-white/30">Check back soon — new roles are added regularly.</p>
                </div>
              )

              : jobs.map((j, idx) => (
                <JobCard key={j._id} job={j} featured={idx === 0} />
              ))
          }

        </div>
      </section>
    </Layout>
  );
}

// ── Job card ──────────────────────────────────────────────────────────────────
function JobCard({ job: j, featured }) {
  return (
    <div
      className={`
        group relative flex flex-col gap-4 rounded-2xl p-5 cursor-pointer
        transition-all duration-300 hover:-translate-y-1 overflow-hidden
        ${featured
          ? 'border border-purple-500/50 bg-purple-600/12'
          : 'border border-purple-400/12 bg-white/[0.04] hover:border-purple-400/40 hover:bg-purple-600/10'
        }
      `}
      style={featured ? { background: 'rgba(124,58,237,0.12)' } : {}}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.15), transparent 70%)' }}
      />

      {/* Featured badge */}
      {featured && (
        <div
          className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase text-white px-3 py-1 rounded-full"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #9D5CF6)' }}
        >
          Featured
        </div>
      )}

      {/* Logo + badge */}
      <div className="flex items-center justify-between">
        {j?.companyId?.logo
          ? (
            <img
              src={j.companyId.logo}
              alt={j.companyId?.name}
              className="w-11 h-11 rounded-xl object-cover border border-purple-400/20"
            />
          ) : (
            <div
              className="w-11 h-11 rounded-xl text-white flex items-center justify-center text-base font-bold uppercase flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #9D5CF6)' }}
            >
              {j.companyId?.name?.charAt(0) || '?'}
            </div>
          )
        }
        {!featured && <JobBadge type={j.jobType} />}
      </div>

      {/* Title + meta */}
      <div>
        <p className="text-base font-bold text-white capitalize leading-snug tracking-tight">
          {j.title}
        </p>
        <p className="text-sm text-white/40 mt-1 flex items-center gap-1.5">
          <span>{j.companyId?.name}</span>
          <span className="w-1 h-1 rounded-full bg-purple-400/40 inline-block" />
          <span>{j.location}</span>
        </p>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        <JobBadge type={j.jobType} />
        {j.location?.toLowerCase().includes('remote') && (
          <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
            Remote
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-purple-400/10" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        {j.salary
          ? (
            <span className="text-sm font-semibold text-purple-300 flex items-center gap-1">
              <span className="text-amber-400">₹</span>
              {j.salary} LPA
            </span>
          )
          : (
            <span className="text-xs italic text-white/25">Salary not disclosed</span>
          )
        }
        <NavLink
          to={`/get/${j._id}`}
          className="text-xs font-semibold text-purple-200 transition-colors duration-200 hover:text-white"
          onClick={e => e.stopPropagation()}
        >
          Apply →
        </NavLink>
      </div>
    </div>
  );
}

export default Homepage;
