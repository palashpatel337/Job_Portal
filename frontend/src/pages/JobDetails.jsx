



import Layout from "@/components/shared/Layout";
import { useAuth } from "@/context/Auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ── Glow orb helper ───────────────────────────────────────────────────────────
function GlowOrb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-25 ${className}`}
      style={style}
    />
  );
}

// ── Info badge ────────────────────────────────────────────────────────────────
function InfoBadge({ children, color = "purple" }) {
  const styles = {
    purple: "bg-transparent text-purple-300 border-purple-500/30",
    green:  "bg-transparent text-emerald-300 border-emerald-500/30",
    amber:  "bg-transparent text-amber-300 border-amber-500/30",
    rose:   "bg-transparent text-rose-300 border-rose-500/30",
    sky:    "bg-transparent text-sky-300 border-sky-500/30",
  };
  return (
    <span
      className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${styles[color]}`}
    >
      {children}
    </span>
  );
}

// ── Detail row ────────────────────────────────────────────────────────────────
function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] uppercase tracking-widest font-semibold"
         style={{ color: "rgba(196,181,253,0.45)" }}>
        {label}
      </p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);



  const getJob = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/job/get/${id}`,{},
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res?.data?.success) {
        console.log("Current user: user", auth?.user.userId,auth?.token);
        console.log("Applications:", res.data.job.applications);
        console.log(res.data.job.companyId);
        
        setJob(res.data.job);

        const alreadyApplied = res.data.job.applications.some(
          (app) => app.applicant?._id?.toString() === auth?.user?.userId?.toString()
        );
        console.log("Already applied:", alreadyApplied);
        setApplied(alreadyApplied);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplication = async () => {
    setApplying(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/application/apply/${id}`,
        {},
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res?.data?.success) setApplied(true);
    } catch (error) {
      if (error.response?.status === 400) setApplied(true);
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => { if (auth?.token) getJob(); }, [auth?.token]);

  // ── Loading ──
  if (loading) {
    return (
      <Layout>
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0D0A1A 0%, #1E1333 50%, #2D1B5E 100%)" }}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "rgba(196,181,253,0.4)", borderTopColor: "#9D5CF6" }}
            />
            <p className="text-white/40 text-sm tracking-widest uppercase">Loading role...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Not found ──
  if (!job) {
    return (
      <Layout>
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0D0A1A 0%, #1E1333 50%, #2D1B5E 100%)" }}
        >
          <p className="text-white/40 text-lg">Job not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen relative overflow-hidden px-4 sm:px-8 lg:px-16 xl:px-28 py-12"
        style={{ background: "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)" }}
      >
        {/* Ambient orbs */}
        <GlowOrb className="w-96 h-96 -top-20 -right-20"  style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }} />
        <GlowOrb className="w-72 h-72 bottom-40 left-1/4" style={{ background: "radial-gradient(circle, #9D5CF6, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* ── Breadcrumb ── */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
             style={{ color: "rgba(196,181,253,0.45)" }}>
            Jobs &nbsp;/&nbsp;
            <span className="text-purple-300">{job.title}</span>
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            {/* ══ LEFT — Main details ══ */}
            <div className="md:col-span-2 space-y-6">

              {/* Header card */}
              <div
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(196,181,253,0.12)",
                }}
              >
                {/* Company logo + name */}
                <div className="flex items-center gap-3 mb-6">
                  {job?.companyId?.logo ? (
                    <img
                      src={job?.companyId?.logo}
                      alt={job?.companyId?.name}
                      className="w-12 h-12 rounded-xl object-cover"
                      style={{ border: "1px solid rgba(196,181,253,0.2)" }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
                    >
                      {job.companyId?.name?.charAt(0) || "?"}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold">{job.companyId?.name}</p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{job.location}</p>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-white capitalize leading-tight tracking-tight mb-5">
                  {job.title}
                </h1>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <InfoBadge color="purple">{job.jobType}</InfoBadge>
                  <InfoBadge color="green">{job.experienceLevel}+ Years</InfoBadge>
                  <InfoBadge color="amber">{job.position} Position{job.position > 1 ? "s" : ""}</InfoBadge>
                  <InfoBadge color="rose">₹{job.salary} LPA</InfoBadge>
                </div>

                {/* Accent divider */}
                <div
                  className="h-px w-full"
                  style={{ background: "linear-gradient(90deg, #7C3AED, rgba(196,181,253,0.15), transparent)" }}
                />

                {/* Quick stats row */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <DetailRow label="Salary" value={`₹${job.salary} LPA`} />
                  <DetailRow label="Location" value={job.location} />
                  <DetailRow label="Experience" value={`${job.experienceLevel}+ Years`} />
                </div>
              </div>

              {/* Description card */}
              <div
                className="rounded-2xl p-7 space-y-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(196,181,253,0.12)",
                }}
              >
                {/* Description */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span
                      className="inline-block w-1 h-5 rounded-full"
                      style={{ background: "linear-gradient(180deg, #7C3AED, #C4B5FD)" }}
                    />
                    Job Description
                  </h2>
                  <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {job.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "rgba(196,181,253,0.08)" }} />

                {/* Requirements */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span
                      className="inline-block w-1 h-5 rounded-full"
                      style={{ background: "linear-gradient(180deg, #9D5CF6, #C4B5FD)" }}
                    />
                    Requirements
                  </h2>
                  <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {job.requirements}
                  </p>
                </div>

                {/* Posted date */}
                <p className="text-xs" style={{ color: "rgba(196,181,253,0.3)" }}>
                  Posted on {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* ══ RIGHT — Apply card ══ */}
            <div className="sticky top-24 h-fit">
              <div
                className="rounded-2xl p-6 space-y-5"
                style={{
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(196,181,253,0.2)",
                }}
              >
                {/* Salary highlight */}
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-semibold mb-1"
                     style={{ color: "rgba(196,181,253,0.45)" }}>
                    Annual Salary
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{
                      background: "linear-gradient(90deg, #C4B5FD, #9D5CF6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ₹{job.salary} LPA
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "rgba(196,181,253,0.1)" }} />

                {/* Details */}
                <div className="space-y-4">
                  <DetailRow label="Location"   value={job.location} />
                  <DetailRow label="Experience" value={`${job.experienceLevel}+ Years`} />
                  <DetailRow label="Job Type"   value={job.jobType} />
                  <DetailRow label="Openings"   value={`${job.position} Position${job.position > 1 ? "s" : ""}`} />
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "rgba(196,181,253,0.1)" }} />

                {/* Apply button */}
                {/* <p>{job.status === "open" ? "Job is still open for applications" : "This job is no longer accepting applications"}</p> */}
                <button
                  onClick={handleApplication}
                  disabled={applied || applying}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={
                    applied
                      ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(196,181,253,0.15)" }
                      : { background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }
                  }
                >
                  {applying ? "Submitting..." : applied ? "✓ Already Applied" : "Apply Now →"}
                </button>

                {applied && (
                  <p className="text-center text-xs" style={{ color: "rgba(196,181,253,0.45)" }}>
                    Your application has been received.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default JobDetails;
