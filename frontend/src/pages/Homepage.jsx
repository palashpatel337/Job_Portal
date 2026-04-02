
// import React, { useEffect, useState } from 'react'
// import Layout from "../components/shared/Layout";
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '@/context/Auth';

// // ── Badge color by job type ───────────────────────────────────────────────────
// function JobBadge({ type = '' }) {
//   const t = type.toLowerCase();
//   const colors =
//     t.includes('full')     ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
//     t.includes('part')     ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'    :
//     t.includes('remote')   ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'          :
//     t.includes('contract') ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'       :
//     t.includes('intern')   ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
//                              'bg-white/10 text-white/50 border border-white/20';
//   return (
//     <span className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${colors}`}>
//       {type}
//     </span>
//   );
// }

// // ── Skeleton card ─────────────────────────────────────────────────────────────
// function SkeletonCard() {
//   return (
//     <div className="bg-white/5 border border-purple-400/10 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
//       <div className="flex items-center justify-between">
//         <div className="w-11 h-11 rounded-xl bg-white/10" />
//         <div className="w-20 h-5 rounded-full bg-white/10" />
//       </div>
//       <div className="space-y-2">
//         <div className="w-3/4 h-4 rounded bg-white/10" />
//         <div className="w-1/2 h-3 rounded bg-white/5" />
//       </div>
//       <div className="h-px bg-white/5" />
//       <div className="flex items-center justify-between">
//         <div className="w-24 h-3 rounded bg-white/10" />
//         <div className="w-16 h-8 rounded-full bg-white/10" />
//       </div>
//     </div>
//   );
// }

// // ── Glowing orb background decoration ────────────────────────────────────────
// function GlowOrb({ className }) {
//   return (
//     <div
//       className={`absolute rounded-full pointer-events-none blur-3xl opacity-30 ${className}`}
//     />
//   );
// }

// // ── Main ──────────────────────────────────────────────────────────────────────
// function Homepage() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { auth } = useAuth();

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
//       {/* ── Page wrapper with dark gradient background ── */}
//       <section
//         className="bg-transparent min-h-screen px-4 sm:px-8 lg:px-16 xl:px-28 py-12 relative overflow-hidden"
//         // style={{
//         //   background: 'linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)',
//         // }}
//       >
//         {/* Ambient glow orbs */}
//         <GlowOrb className="w-96 h-96 bg-purple-600 -top-20 -right-20" />
//         <GlowOrb className="w-72 h-72 bg-violet-700 bottom-40 left-1/4" />
//         <GlowOrb className="w-56 h-56 bg-fuchsia-700 top-1/2 -left-10" />

//         {/* ── Hero header ── */}
//         <div className="relative z-10 mb-12">
//           <p className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-300/70 mb-3">
//             Latest Openings
//           </p>

//           <div className="flex items-end justify-between flex-wrap gap-4">
//             <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
//               Find your{' '}
//               <span
//                 className="italic font-bold"
//                 style={{
//                   background: 'linear-gradient(90deg, #C4B5FD, #9D5CF6)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                 }}
//               >
//                 dream role
//               </span>
//               <br />
//               <span className="text-white/80 text-3xl sm:text-4xl font-normal">
//                 without the noise.
//               </span>
//             </h2>

//             {!loading && (
//               <span className="text-xs font-semibold tracking-widest uppercase text-purple-300 bg-purple-500/15 border border-purple-400/25 px-5 py-2 rounded-full backdrop-blur-sm">
//                 {jobs.length} position{jobs.length !== 1 ? 's' : ''} open
//               </span>
//             )}
//           </div>

//           <p className="text-white/50 text-base mt-4 max-w-md leading-relaxed">
//             Curated opportunities from companies that actually care about their people.
//           </p>

//           {/* Accent line */}
//           <div
//             className="mt-8 h-px w-full"
//             style={{
//               background: 'linear-gradient(90deg, #7C3AED 0%, rgba(196,181,253,0.3) 40%, transparent 100%)',
//             }}
//           />
//         </div>

//         {/* ── Job grid ── */}
//         <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

//           {loading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)

//             : jobs.length === 0
//               ? (
//                 <div className="col-span-full flex flex-col items-center justify-center py-24 text-white/30">
//                   <span className="text-5xl mb-4 opacity-40">📭</span>
//                   <p className="text-xl font-semibold text-white/60">No openings right now</p>
//                   <p className="text-sm mt-1 text-white/30">Check back soon — new roles are added regularly.</p>
//                 </div>
//               )

//               : jobs.map((j, idx) => (
//                 <JobCard key={j._id} job={j} featured={idx === 0} />
//               ))
//           }

//         </div>
//       </section>
//     </Layout>
//   );
// }

// // ── Job card ──────────────────────────────────────────────────────────────────
// function JobCard({ job: j, featured }) {
//   return (
//     <div
//       className={`
//         group relative flex flex-col gap-4 rounded-2xl p-5 cursor-pointer
//         transition-all duration-300 hover:-translate-y-1 overflow-hidden
//         ${featured
//           ? 'border border-purple-500/50 bg-purple-600/12'
//           : 'border border-purple-400/12 bg-white/[0.04] hover:border-purple-400/40 hover:bg-purple-600/10'
//         }
//       `}
//       style={featured ? { background: 'rgba(124,58,237,0.12)' } : {}}
//     >
//       {/* Hover glow effect */}
//       <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//         style={{ background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.15), transparent 70%)' }}
//       />

//       {/* Featured badge */}
//       {featured && (
//         <div
//           className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase text-white px-3 py-1 rounded-full"
//           style={{ background: 'linear-gradient(135deg, #7C3AED, #9D5CF6)' }}
//         >
//           Featured
//         </div>
//       )}

//       {/* Logo + badge */}
//       <div className="flex items-center justify-between">
//         {j?.companyId?.logo
//           ? (
//             <img
//               src={j.companyId.logo}
//               alt={j.companyId?.name}
//               className="w-11 h-11 rounded-xl object-cover border border-purple-400/20"
//             />
//           ) : (
//             <div
//               className="w-11 h-11 rounded-xl text-white flex items-center justify-center text-base font-bold uppercase flex-shrink-0"
//               style={{ background: 'linear-gradient(135deg, #7C3AED, #9D5CF6)' }}
//             >
//               {j.companyId?.name?.charAt(0) || '?'}
//             </div>
//           )
//         }
//         {!featured && <JobBadge type={j.jobType} />}
//       </div>

//       {/* Title + meta */}
//       <div>
//         <p className="text-base font-bold text-white capitalize leading-snug tracking-tight">
//           {j.title}
//         </p>
//         <p className="text-sm text-white/40 mt-1 flex items-center gap-1.5">
//           <span>{j.companyId?.name}</span>
//           <span className="w-1 h-1 rounded-full bg-purple-400/40 inline-block" />
//           <span>{j.location}</span>
//         </p>
//       </div>

//       {/* Tags row */}
//       <div className="flex flex-wrap gap-2">
//         <JobBadge type={j.jobType} />
//         {j.location?.toLowerCase().includes('remote') && (
//           <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
//             Remote
//           </span>
//         )}
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-purple-400/10" />

//       {/* Footer */}
//       <div className="flex items-center justify-between">
//         {j.salary
//           ? (
//             <span className="text-sm font-semibold text-purple-300 flex items-center gap-1">
//               <span className="text-amber-400">₹</span>
//               {j.salary} LPA
//             </span>
//           )
//           : (
//             <span className="text-xs italic text-white/25">Salary not disclosed</span>
//           )
//         }
//         <NavLink
//           to={`/get/${j._id}`}
//           className="text-xs font-semibold text-purple-200 transition-colors duration-200 hover:text-white"
//           onClick={e => e.stopPropagation()}
//         >
//           Apply →
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export default Homepage;




import React, { useEffect, useState, useMemo } from 'react';
import Layout from "../components/shared/Layout";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { Bookmark, Search, MapPin, X } from 'lucide-react';

// ── Category definitions — matched against job description + title + requirements
const CATEGORIES = [
  { label: 'All',        icon: '⊞', keywords: [] },
  { label: 'Technology', icon: '💻', keywords: ['software', 'developer', 'engineer', 'backend', 'frontend', 'fullstack', 'devops', 'cloud', 'data', 'ml', 'ai', 'machine learning', 'python', 'java', 'react', 'node', 'kubernetes', 'docker'] },
  { label: 'Design',     icon: '🎨', keywords: ['design', 'ui', 'ux', 'figma', 'product design', 'visual', 'graphic', 'brand', 'creative', 'prototype', 'wireframe'] },
  { label: 'Marketing',  icon: '📣', keywords: ['marketing', 'growth', 'seo', 'content', 'social media', 'campaign', 'digital marketing', 'ads', 'copywriting', 'branding'] },
  { label: 'Finance',    icon: '📊', keywords: ['finance', 'accounting', 'analyst', 'investment', 'banking', 'financial', 'equity', 'audit', 'tax', 'cfa', 'budget'] },
  { label: 'Healthcare', icon: '🏥', keywords: ['health', 'medical', 'clinical', 'pharma', 'doctor', 'nurse', 'hospital', 'patient', 'biotech', 'diagnostic'] },
  { label: 'Research',   icon: '🔬', keywords: ['research', 'scientist', 'lab', 'analysis', 'data science', 'phd', 'academic', 'publication', 'experiment'] },
];

// ── Category match — checks description, title, requirements ─────────────────
function matchCategory(job, category) {
  if (!category || category.label === 'All') return true;
  const haystack = [job.description, job.title, job.requirements]
    .join(' ')
    .toLowerCase();
  return category.keywords.some((kw) => haystack.includes(kw));
}

// ── Job type badge ────────────────────────────────────────────────────────────
function JobBadge({ type = '' }) {
  const t = type.toLowerCase();
  const colors =
    t.includes('full')     ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' :
    t.includes('part')     ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'    :
    t.includes('remote')   ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'          :
    t.includes('contract') ? 'bg-pink-500/20 text-pink-300 border-pink-500/30'       :
    t.includes('intern')   ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                             'bg-white/10 text-white/50 border-white/20';
  return (
    <span className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${colors}`}>
      {type}
    </span>
  );
}

function ExpBadge({ level }) {
  if (!level) return null;
  return (
    <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
      {level}+ yrs
    </span>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4 animate-pulse"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,181,253,0.1)' }}>
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-white/10" />
        <div className="w-7 h-7 rounded-lg bg-white/10" />
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-4 rounded bg-white/10" />
        <div className="w-1/2 h-3 rounded bg-white/5" />
      </div>
      <div className="flex gap-2">
        <div className="w-16 h-5 rounded-full bg-white/10" />
        <div className="w-12 h-5 rounded-full bg-white/10" />
      </div>
      <div className="h-px bg-white/5" />
      <div className="flex items-center justify-between">
        <div className="w-20 h-3 rounded bg-white/10" />
        <div className="w-14 h-3 rounded bg-white/10" />
      </div>
    </div>
  );
}

// ── Glow orb ──────────────────────────────────────────────────────────────────
function GlowOrb({ className, style }) {
  return (
    <div className={`absolute rounded-full pointer-events-none blur-3xl opacity-25 ${className}`}
      style={style} />
  );
}

// ── Card 2 — Job card ─────────────────────────────────────────────────────────
function JobCard({ job: j }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="group relative flex flex-col gap-4 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,181,253,0.12)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,181,253,0.35)';
        e.currentTarget.style.background = 'rgba(124,58,237,0.09)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,181,253,0.12)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      {/* Radial hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.13), transparent 70%)' }} />

      {/* ── Logo + bookmark ── */}
      <div className="relative flex items-start justify-between">
        {j?.companyId?.logo ? (
          <img src={j.companyId.logo} alt={j.companyId?.name}
            className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
            style={{ border: '1px solid rgba(196,181,253,0.2)' }} />
        ) : (
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #9D5CF6)' }}>
            {j?.companyId?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0"
          style={{
            background: saved ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.05)',
            border: saved ? '1px solid rgba(196,181,253,0.3)' : '1px solid rgba(196,181,253,0.12)',
          }}
        >
          <Bookmark style={{ width: 13, height: 13 }}
            className={saved ? 'text-purple-300' : 'text-white/30'}
            fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* ── Title + company ── */}
      <div className="relative">
        <p className="text-[15px] font-semibold text-white capitalize leading-snug tracking-tight">
          {j?.title}
        </p>
        <p className="text-sm mt-1 flex items-center gap-1.5"
          style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span>{j?.companyId?.name}</span>
          <span className="w-1 h-1 rounded-full inline-block flex-shrink-0"
            style={{ background: 'rgba(196,181,253,0.35)' }} />
          <span>{j?.location}</span>
        </p>
      </div>

      {/* ── Tags ── */}
      <div className="relative flex flex-wrap gap-2">
        <JobBadge type={j?.jobType} />
        <ExpBadge level={j?.experienceLevel} />
      </div>

      {/* ── Divider ── */}
      <div className="relative h-px" style={{ background: 'rgba(196,181,253,0.08)' }} />

      {/* ── Footer ── */}
      <div className="relative flex items-center justify-between">
        {j?.salary ? (
          <span className="text-sm font-semibold flex items-center gap-1" style={{ color: '#C4B5FD' }}>
            <span style={{ color: '#FBBF24' }}>₹</span>{j.salary} LPA
          </span>
        ) : (
          <span className="text-xs italic" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Salary not disclosed
          </span>
        )}
        <NavLink
          to={`/get/${j?._id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-semibold transition-colors duration-200"
          style={{ color: 'rgba(196,181,253,0.7)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(196,181,253,0.7)')}
        >
          Apply →
        </NavLink>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function Homepage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {auth} = useAuth();

  const [searchQuery, setSearchQuery]   = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

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

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || [job.title, job.description, job.companyId?.name, job.requirements]
        .join(' ').toLowerCase().includes(q);

      const loc = locationQuery.toLowerCase().trim();
      const matchesLocation = !loc || job.location?.toLowerCase().includes(loc);

      const matchesCat = matchCategory(job, activeCategory);

      return matchesSearch && matchesLocation && matchesCat;
    });
  }, [jobs, searchQuery, locationQuery, activeCategory]);

  // ── Category job counts ───────────────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.label] = cat.label === 'All'
        ? jobs.length
        : jobs.filter((j) => matchCategory(j, cat)).length;
    });
    return counts;
  }, [jobs]);

  const hasFilters = searchQuery || locationQuery || activeCategory.label !== 'All';
  const clearFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setActiveCategory(CATEGORIES[0]);
  };

  return (
    <Layout>
      <section
        className="min-h-screen px-4 sm:px-8 lg:px-16 xl:px-28 py-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)' }}
      >
        {/* Ambient orbs */}
        <GlowOrb className="w-96 h-96 -top-20 -right-20"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        <GlowOrb className="w-72 h-72 bottom-40 left-1/4"
          style={{ background: 'radial-gradient(circle, #9D5CF6, transparent 70%)' }} />
        <GlowOrb className="w-56 h-56 top-1/2 -left-10"
          style={{ background: 'radial-gradient(circle, #6D28D9, transparent 70%)' }} />

        {/* ══ HERO ══ */}
        <div className="relative z-10 mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: 'rgba(196,181,253,0.6)' }}>
            Latest Openings
          </p>

          <div className="flex items-end justify-between flex-wrap gap-4 mb-4">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
              Find your{' '}
              <span className="italic font-bold" style={{
                background: 'linear-gradient(90deg, #C4B5FD, #9D5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                dream role
              </span>
              <br />
              <span className="font-normal text-3xl sm:text-4xl"
                style={{ color: 'rgba(255,255,255,0.7)' }}>
                without the noise.
              </span>
            </h2>

            {!loading && (
              <span className="text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full"
                style={{
                  color: '#C4B5FD',
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(196,181,253,0.25)',
                }}>
                {filteredJobs.length} of {jobs.length} positions
              </span>
            )}
          </div>

          <p className="text-base max-w-md leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            Curated opportunities from companies that actually care about their people.
          </p>

          {/* ── Search bar ── */}
          <div
            className="flex flex-col sm:flex-row rounded-2xl overflow-hidden max-w-2xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(196,181,253,0.18)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Keyword */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3.5">
              <Search style={{ width: 16, height: 16, flexShrink: 0 }} className="text-purple-400/60" />
              <input
                type="text"
                placeholder="Job title, skills or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full"
                style={{ fontFamily: 'inherit' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0">
                  <X style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px my-3"
              style={{ background: 'rgba(196,181,253,0.15)' }} />

            {/* Location */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3.5">
              <MapPin style={{ width: 16, height: 16, flexShrink: 0 }} className="text-purple-400/60" />
              <input
                type="text"
                placeholder="City, state or Remote..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full"
                style={{ fontFamily: 'inherit' }}
              />
              {locationQuery && (
                <button onClick={() => setLocationQuery('')}
                  className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0">
                  <X style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>

            {/* Search CTA */}
            <button
              className="px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #9D5CF6)' }}
            >
              Search
            </button>
          </div>

          {/* Quick-fill tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['UI/UX Designer', 'Product Manager', 'Full Stack Dev', 'Data Analyst', 'DevOps'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background: 'rgba(196,181,253,0.08)',
                  border: '1px solid rgba(196,181,253,0.15)',
                  color: 'rgba(196,181,253,0.65)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(196,181,253,0.15)';
                  e.currentTarget.style.color = '#C4B5FD';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(196,181,253,0.08)';
                  e.currentTarget.style.color = 'rgba(196,181,253,0.65)';
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Accent divider */}
          <div className="mt-8 h-px w-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED 0%, rgba(196,181,253,0.3) 40%, transparent 100%)' }} />
        </div>

        {/* ══ BROWSE BY CATEGORY ══ */}
        <div className="relative z-10 mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'rgba(196,181,253,0.45)' }}>
              Browse by category
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-medium flex items-center gap-1.5 transition-colors"
                style={{ color: 'rgba(196,181,253,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C4B5FD')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(196,181,253,0.5)')}
              >
                <X style={{ width: 12, height: 12 }} /> Clear filters
              </button>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory.label === cat.label;
              const count = categoryCounts[cat.label] ?? 0;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-3.5 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.03)',
                    border: isActive
                      ? '1px solid rgba(196,181,253,0.35)'
                      : '1px solid rgba(196,181,253,0.1)',
                    minWidth: 110,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{cat.icon}</span>
                  <span className="text-[13px] font-medium"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                    {cat.label}
                  </span>
                  <span className="text-[11px]"
                    style={{ color: isActive ? 'rgba(196,181,253,0.7)' : 'rgba(255,255,255,0.25)' }}>
                    {count} job{count !== 1 ? 's' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ RESULTS LABEL ══ */}
        {!loading && (
          <div className="relative z-10 mb-5">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Showing{' '}
              <span className="text-white font-medium">{filteredJobs.length}</span>
              {' '}result{filteredJobs.length !== 1 ? 's' : ''}
              {activeCategory.label !== 'All' && (
                <span> in <span className="text-purple-300">{activeCategory.label}</span></span>
              )}
              {searchQuery && (
                <span> for <span className="text-purple-300">"{searchQuery}"</span></span>
              )}
            </p>
          </div>
        )}

        {/* ══ JOB GRID ══ */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-yellow-900">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)

            : filteredJobs.length === 0
              ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                  <span className="text-5xl mb-4 opacity-30">🔍</span>
                  <p className="text-xl font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    No jobs match your search
                  </p>
                  <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Try different keywords or browse all categories.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #9D5CF6)' }}
                  >
                    Clear all filters
                  </button>
                </div>
              )
              : filteredJobs.map((j) => <JobCard key={j._id} job={j} />)
          }
        </div>

        {/* ══ STATS ROW ══ */}
        {!loading && jobs.length > 0 && (
          <div className="relative z-10 flex gap-10 mt-16 pt-8"
            style={{ borderTop: '1px solid rgba(196,181,253,0.08)' }}>
            {[
              { num: `${jobs.length}+`,  label: 'Active jobs' },
              { num: `${new Set(jobs.map((j) => j.companyId?._id)).size}+`, label: 'Companies' },
              { num: `${CATEGORIES.length - 1}`, label: 'Categories' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{num}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(196,181,253,0.45)' }}>{label}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Homepage;
