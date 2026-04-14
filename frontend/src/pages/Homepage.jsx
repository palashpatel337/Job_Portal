



import React, { useEffect, useState, useMemo } from 'react';
import Layout from "../components/shared/Layout";
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
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
function JobCard({ job: j,onToggleSave }) {
  // const [saved, setSaved] = useState(false);
    const saved = j?.isSaved;


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
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave(j._id, saved);
        }}
        className="w-8 h-8 rounded-lg ..."
      >
        <Bookmark
          style={{ width: 13, height: 13 }}
          className={saved ? "text-purple-300" : "text-white/30"}
          fill={saved ? "currentColor" : "none"}
        />
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
  const { jobId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {auth} = useAuth();
  const [favourite, setFavourite] = useState()
  const [searchQuery, setSearchQuery]   = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [debouncedLocationQuery, setDebouncedLocationQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const toggleSaveJob = async (jobId, isSaved) => {
  try {
    const url = isSaved
      ? `${import.meta.env.VITE_API_URL}/api/v1/job/unsave/${jobId}`
      : `${import.meta.env.VITE_API_URL}/api/v1/job/save/${jobId}`;

    const res = await axios.post(url, {}, {
      headers: { Authorization: `Bearer ${auth?.token}` }
    });

    if (res.data.success) {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? { ...job, isSaved: !isSaved }
            : job
        )
      );
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};
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

  // ── Debounce typing for filtered job calculations ──────────────────────────
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchQuery(searchQuery), 3000);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedLocationQuery(locationQuery), 3000);
    return () => clearTimeout(timeout);
  }, [locationQuery]);

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = debouncedSearchQuery.toLowerCase().trim();
      const matchesSearch = !q || [job.title, job.description, job.companyId?.name, job.requirements]
        .join(' ').toLowerCase().includes(q);

      const loc = debouncedLocationQuery.toLowerCase().trim();
      const matchesLocation = !loc || job.location?.toLowerCase().includes(loc);

      const matchesCat = matchCategory(job, activeCategory);

      return matchesSearch && matchesLocation && matchesCat;
    });
  }, [jobs, debouncedSearchQuery, debouncedLocationQuery, activeCategory]);

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
          <div className="flex gap-5 items-center justify-between mb-4">
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
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              : filteredJobs.map((j) => <JobCard key={j._id} job={j} onToggleSave={toggleSaveJob} />)
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
