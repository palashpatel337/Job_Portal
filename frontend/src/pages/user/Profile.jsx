// import Layout from "@/components/shared/Layout";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Mail, Phone, FileText, Calendar } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "@/context/Auth";

// function Profile() {
//   const [user, setUser] = useState(null);
//   const [auth, setAuth] = useAuth();

//   const getUserProfile = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
//         {
//     headers: {
//       Authorization: `Bearer ${auth?.token}`
//     }
//   }
//       );

//       if (res?.data?.success) {
//         setUser(res.data.user);
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br  py-12 px-4">
//         <div className="max-w-5xl mx-auto">
//           {user ? (
//             <Card className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl border-0 overflow-hidden">
//               {/* HEADER SECTION */}
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
//                 <div className="flex items-center gap-6">
//                   <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl">
//                     <img
//                       src={`${user?.profile?.profilePhoto}`}
//                       alt="profile"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h1 className="text-3xl font-bold">{user.fullname}</h1>
//                     <Badge className="mt-2 bg-white text-indigo-600 hover:bg-white">
//                       {user.role}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>

//               <CardContent className="p-10 space-y-10">
//                 {/* CONTACT CARDS */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="p-6 rounded-2xl bg-indigo-50 hover:shadow-lg transition-all duration-300">
//                     <div className="flex items-center gap-3 text-indigo-600 font-semibold">
//                       <Mail size={18} />
//                       Email
//                     </div>
//                     <p className="text-zinc-700 mt-2">{user.email}</p>
//                   </div>

//                   <div className="p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-all duration-300">
//                     <div className="flex items-center gap-3 text-purple-600 font-semibold">
//                       <Phone size={18} />
//                       Phone
//                     </div>
//                     <p className="text-zinc-700 mt-2">
//                       {user.phone || "Not Provided"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* BIO */}
//                 <div>
//                   <h2 className="text-xl font-semibold mb-3">About Me</h2>
//                   <p className="text-zinc-600 leading-relaxed">
//                     {user.profile.bio || "No bio added yet."}
//                   </p>
//                 </div>

//                 {/* SKILLS */}
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">Skills</h2>
//                   <div className="flex flex-wrap gap-3">
//                     {user.profile.skills?.length > 0 ? (
//                       user.profile.skills.map((skill, index) => (
//                         <Badge
//                           key={index}
//                           className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition-transform"
//                         >
//                           {skill}
//                         </Badge>
//                       ))
//                     ) : (
//                       <p className="text-zinc-500">No skills added</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* EXPERIENCE & EDUCATION */}
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div className="p-6 rounded-2xl border hover:shadow-lg transition">
//                     <h3 className="text-lg font-semibold mb-2">Experience</h3>
//                     <p className="text-zinc-600">
//                       {user.experience || "No experience added"}
//                     </p>
//                   </div>

//                   <div className="p-6 rounded-2xl border hover:shadow-lg transition">
//                     <h3 className="text-lg font-semibold mb-2">Education</h3>
//                     <p className="text-zinc-600">
//                       {user.education || "No education added"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* RESUME */}
//                 <div className="flex items-center justify-between bg-zinc-100 p-6 rounded-2xl">
//                   <div className="flex items-center gap-3">
//                     <FileText size={20} className="text-indigo-600" />
//                     {user.profile.resume ? (
//                       <a
//                         href={`${user?.profile?.resume}`}
//                         download
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-indigo-600 font-medium hover:underline"
//                       >
//                         View Resume
//                       </a>
//                     ) : (
//                       <span className="text-zinc-500">No resume uploaded</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* FOOTER */}
//                 <div className="flex items-center justify-between pt-6 border-t">
//                   <div className="flex items-center gap-2 text-sm text-zinc-500">
//                     <Calendar size={16} />
//                     Joined on {new Date(user.createdAt).toLocaleDateString()}
//                   </div>

//                   <Button className="rounded-full px-6 shadow-md hover:shadow-xl transition">
//                     <NavLink to={`/profile/update`}>Edit Profile</NavLink>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : (
//             <p className="text-center text-zinc-500">Loading profile...</p>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Profile;



import Layout from "@/components/shared/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Mail, Phone, FileText, Calendar, Pencil } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/Auth";

// ── Glow orb ──────────────────────────────────────────────────────────────────
function GlowOrb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-25 ${className}`}
      style={style}
    />
  );
}

// ── Section card ──────────────────────────────────────────────────────────────
function SectionCard({ title, icon: Icon, children }) {
  return (
    <div
      className="rounded-2xl p-6 space-y-4"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(196,181,253,0.12)",
      }}
    >
      {title && (
        <>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span
              className="inline-block w-1 h-4 rounded-full"
              style={{ background: "linear-gradient(180deg, #7C3AED, #C4B5FD)" }}
            />
            {title}
            {Icon && <Icon className="w-3.5 h-3.5 ml-1" style={{ color: "rgba(196,181,253,0.5)" }} />}
          </h2>
          <div className="h-px" style={{ background: "rgba(196,181,253,0.08)" }} />
        </>
      )}
      {children}
    </div>
  );
}

// ── Skill pill ────────────────────────────────────────────────────────────────
function SkillPill({ label }) {
  return (
    <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
      {label.trim()}
    </span>
  );
}

// ── Contact tile ──────────────────────────────────────────────────────────────
function ContactTile({ icon: Icon, label, value, href }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:border-purple-400/30"
      style={{
        background: "rgba(124,58,237,0.08)",
        border: "1px solid rgba(196,181,253,0.1)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(124,58,237,0.25)" }}
      >
        <Icon className="w-4 h-4" style={{ color: "#C4B5FD" }} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-widest font-semibold"
           style={{ color: "rgba(196,181,253,0.45)" }}>
          {label}
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-purple-300 hover:text-white transition-colors underline underline-offset-2 truncate block"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-white/70 truncate">{value || "Not provided"}</p>
        )}
      </div>
    </div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function ProfileSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="rounded-2xl p-8 flex items-center gap-6"
           style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,181,253,0.12)" }}>
        <div className="w-24 h-24 rounded-2xl bg-white/10 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="w-48 h-6 rounded bg-white/10" />
          <div className="w-24 h-4 rounded bg-white/5" />
          <div className="w-16 h-6 rounded-full bg-white/10" />
        </div>
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} className="rounded-2xl p-6 space-y-3"
             style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,181,253,0.08)" }}>
          <div className="w-32 h-4 rounded bg-white/10" />
          <div className="w-full h-3 rounded bg-white/5" />
          <div className="w-3/4 h-3 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function Profile() {
  const [user, setUser] = useState(null);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res?.data?.success) setUser(res.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getUserProfile(); }, []);

  return (
    <Layout>
      <div
        className="min-h-screen relative overflow-hidden px-4 sm:px-8 lg:px-16 xl:px-28 py-12"
        style={{
          background:
            "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
        }}
      >
        {/* Ambient orbs */}
        <GlowOrb className="w-96 h-96 -top-20 -right-20"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }} />
        <GlowOrb className="w-72 h-72 bottom-40 left-1/4"
          style={{ background: "radial-gradient(circle, #9D5CF6, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* ── Page header ── */}
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
               style={{ color: "rgba(196,181,253,0.45)" }}>
              Account
            </p>
            <h1
              className="text-4xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(90deg, #fff 40%, #C4B5FD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Profile
            </h1>
            <div className="mt-6 h-px"
              style={{ background: "linear-gradient(90deg, #7C3AED, rgba(196,181,253,0.3), transparent)" }} />
          </div>

          {/* ── Loading ── */}
          {loading && <ProfileSkeleton />}

          {/* ── Profile content ── */}
          {!loading && user && (
            <div className="space-y-5">

              {/* ── Hero card ── */}
              <div
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(196,181,253,0.2)",
                }}
              >
                {/* Subtle inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at top left, rgba(124,58,237,0.2), transparent 60%)",
                  }}
                />

                <div className="relative flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-5">
                    {/* Avatar */}
                    {user.profile?.profilePhoto ? (
                      <img
                        src={user.profile.profilePhoto}
                        alt="profile"
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                        style={{ border: "2px solid rgba(196,181,253,0.25)" }}
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shrink-0"
                        style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
                      >
                        {user.fullname?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}

                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        {user.fullname}
                      </h2>
                      <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {user.email}
                      </p>
                      <span
                        className="inline-block mt-2 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(124,58,237,0.3)",
                          color: "#C4B5FD",
                          border: "1px solid rgba(196,181,253,0.25)",
                        }}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Edit button */}
                  <NavLink
                    to="/profile/update"
                    className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Profile
                  </NavLink>
                </div>
              </div>

              {/* ── Contact ── */}
              <SectionCard title="Contact Information">
                <div className="grid sm:grid-cols-2 gap-3">
                  <ContactTile icon={Mail} label="Email" value={user.email} />
                  <ContactTile icon={Phone} label="Phone" value={user.phone} />
                </div>
              </SectionCard>

              {/* ── About ── */}
              <SectionCard title="About Me">
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {user.profile?.bio || (
                    <span style={{ color: "rgba(255,255,255,0.25)" }}>No bio added yet.</span>
                  )}
                </p>
              </SectionCard>

              {/* ── Skills ── */}
              <SectionCard title="Skills">
                {user.profile?.skills?.filter((s) => s.trim()).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.profile.skills.filter((s) => s.trim()).map((skill, i) => (
                      <SkillPill key={i} label={skill} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                    No skills added yet.
                  </p>
                )}
              </SectionCard>

              {/* ── Experience & Education ── */}
              <div className="grid sm:grid-cols-2 gap-5">
                <SectionCard title="Experience">
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {user.experience || (
                      <span style={{ color: "rgba(255,255,255,0.25)" }}>No experience added.</span>
                    )}
                  </p>
                </SectionCard>
                <SectionCard title="Education">
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {user.education || (
                      <span style={{ color: "rgba(255,255,255,0.25)" }}>No education added.</span>
                    )}
                  </p>
                </SectionCard>
              </div>

              {/* ── Resume ── */}
              <SectionCard title="Resume">
                {user.profile?.resume ? (
                  <ContactTile
                    icon={FileText}
                    label="Uploaded resume"
                    value="View / Download PDF"
                    href={user.profile.resume}
                  />
                ) : (
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                    No resume uploaded yet.
                  </p>
                )}
              </SectionCard>

              {/* ── Footer ── */}
              <div
                className="flex items-center justify-between px-2 py-4"
                style={{ borderTop: "1px solid rgba(196,181,253,0.08)" }}
              >
                <div className="flex items-center gap-2 text-xs"
                     style={{ color: "rgba(196,181,253,0.35)" }}>
                  <Calendar className="w-3.5 h-3.5" />
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <NavLink
                  to="/profile/update"
                  className="text-xs font-semibold text-purple-300 hover:text-white transition-colors"
                >
                  Edit Profile →
                </NavLink>
              </div>

            </div>
          )}

          {/* ── Not found ── */}
          {!loading && !user && (
            <div
              className="flex flex-col items-center justify-center py-24 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(196,181,253,0.1)",
              }}
            >
              <p className="text-white/40 text-lg">Could not load profile.</p>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default Profile;
