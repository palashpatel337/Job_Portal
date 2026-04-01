// import Layout from "@/components/shared/Layout";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/Auth";

// function EditProfile() {
//   const navigate = useNavigate();
//   const [auth, setAuth] = useAuth();

//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [resume, setResume] = useState(null);

//   const [user, setUser] = useState({
//     fullname: "",
//     phone: "",
//     role: "",
//     profile: {
//       bio: "",
//       skills: [],
//       resume: "",
//       // resumeOriginalName: "",
//       // company: "",
//       profilePhoto: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   // ======================================
//   // Upload File Function (Cloudinary Route)
//   // ======================================
//   const uploadFile = async (file, type) => {
//     try {
//       console.log("Uploading file:", file.name, "Type:", type);
      
//       const formData = new FormData();
//       formData.append("file", file);

//       // const endpoint =
//       //   type === "resume" ? "/upload/resume" : "/upload/image";

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/upload`,
//         formData
//       );

//       console.log("Upload successful, URL:", res.data?.url);
//       return res.data?.url;
//     } catch (error) {
//       console.error("UPLOAD ERROR:", error.response?.data || error.message);
//       alert("Failed to upload " + type + ": " + (error.response?.data?.message || error.message));
//       return null;
//     }
//   };

//   // =====================
//   // Fetch Profile
//   // =====================
//   const getUserProfile = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         }
//       );

//       if (res?.data?.success) {
//         setUser(res.data.user);

//         setAuth({
//           ...auth,
//           user: res.data.user,
//         });

//         const ls = JSON.parse(localStorage.getItem("auth"));
//         ls.user = res.data.user;
//         localStorage.setItem("auth", JSON.stringify(ls));
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) {
//       getUserProfile();
//     }
//   }, [auth?.token]);

//   // =====================
//   // Update Profile
//   // =====================
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let profilePhotoUrl = user.profile.profilePhoto;
//       let resumeUrl = user.profile.resume;

//       // Upload profile photo
//       if (profilePhoto) {
//         const uploadedPhoto = await uploadFile(profilePhoto, "image");
//         if (uploadedPhoto) profilePhotoUrl = uploadedPhoto;
//       }

//       // Upload resume pdf
//       if (resume) {
//         const uploadedResume = await uploadFile(resume, "resume");
//         if (uploadedResume) resumeUrl = uploadedResume;
//       }

//       console.log("Profile Photo URL:", profilePhotoUrl);
//       console.log("Resume URL:", resumeUrl);

//       const res = await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/profile/update`,
//         {
//           fullname: user.fullname,
//           phone: user.phone,
//           bio: user.profile.bio,
//           skills: user.profile.skills.join(","),
//           profilePhoto: profilePhotoUrl,
//           resume: resumeUrl,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         }
//       );

//       console.log("Update Response:", res.data);

//       if (res?.data?.success) {
//         setUser(res.data.user);

//         setAuth({
//           ...auth,
//           user: res.data.user,
//         });

//         const ls = JSON.parse(localStorage.getItem("auth"));
//         ls.user = res.data.user;
//         localStorage.setItem("auth", JSON.stringify(ls));

//         navigate("/profile");
//       } else {
//         console.error("Update failed:", res.data?.message);
//       }
//     } catch (error) {
//       console.error("UPDATE ERROR:", error.response?.data || error.message);
//       alert("Error updating profile: " + (error.response?.data?.message || error.message));
//     }

//     setLoading(false);
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
//         <div className="max-w-4xl mx-auto">
//           <Card className="rounded-3xl shadow-2xl bg-white/90 backdrop-blur">
//             <CardHeader>
//               <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
//             </CardHeader>

//             <Separator />

//             <CardContent className="py-8">
//               <form onSubmit={handleUpdate} className="space-y-6">
//                 {/* Fullname + Phone */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <Input
//                     placeholder="Full Name"
//                     value={user.fullname}
//                     onChange={(e) =>
//                       setUser({ ...user, fullname: e.target.value })
//                     }
//                   />

//                   <Input
//                     placeholder="Phone"
//                     value={user.phone}
//                     onChange={(e) =>
//                       setUser({ ...user, phone: e.target.value })
//                     }
//                   />
//                 </div>

//                 {/* Bio */}
//                 <Textarea
//                   placeholder="Write something about yourself..."
//                   value={user.profile?.bio || ""}
//                   onChange={(e) =>
//                     setUser({
//                       ...user,
//                       profile: {
//                         ...user.profile,
//                         bio: e.target.value,
//                       },
//                     })
//                   }
//                 />

//                 {/* Skills */}
//                 <div>
//                   <Input
//                     placeholder="Skills (comma separated)"
//                     value={user.profile?.skills?.join(", ") || ""}
//                     onChange={(e) =>
//                       setUser({
//                         ...user,
//                         profile: {
//                           ...user.profile,
//                           skills: e.target.value.split(","),
//                         },
//                       })
//                     }
//                   />

//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {user.profile?.skills?.map((skill, index) => (
//                       <Badge key={index} variant="secondary">
//                         {skill.trim()}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Resume Upload */}
//                 <div>
//                   <label className="text-sm font-medium">Upload Resume</label>
//                   <Input
//                     type="file"
//                     accept="application/pdf"
//                     onChange={(e) => setResume(e.target.files[0])}
//                   />

//                   {user.profile.resume && (
//                     <p className="text-sm mt-2 text-indigo-600">
//                       Current Resume:{" "}
//                       <a
//                         href={user.profile.resume}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="underline"
//                       >
//                         View Resume
//                       </a>
//                     </p>
//                   )}
//                 </div>

//                 {/* Profile Photo Upload */}
//                 <div>
//                   <label className="text-sm font-medium">
//                     Upload Profile Photo
//                   </label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setProfilePhoto(e.target.files[0])}
//                   />

//                   {user.profile.profilePhoto && (
//                     <img
//                       src={user.profile.profilePhoto}
//                       alt="profile"
//                       className="h-20 w-20 rounded-full mt-3 object-cover border"
//                     />
//                   )}
//                 </div>

//                 {/* Save Button */}
//                 <Button
//                   type="submit"
//                   className="w-full rounded-full text-lg"
//                   disabled={loading}
//                 >
//                   {loading ? "Updating..." : "Save Changes"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default EditProfile;



import Layout from "@/components/shared/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

// ── Dark field wrapper ────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <label
      className="block text-[11px] font-semibold uppercase tracking-widest mb-2"
      style={{ color: "rgba(196,181,253,0.55)" }}
    >
      {children}
    </label>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(196,181,253,0.15)",
  color: "#fff",
  borderRadius: "12px",
  padding: "11px 16px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

function DarkInput({ className = "", style = {}, ...props }) {
  return (
    <input
      {...props}
      style={{ ...inputStyle, ...style }}
      className={`placeholder-white/25 focus:border-purple-400/50 ${className}`}
    />
  );
}

function DarkTextarea({ ...props }) {
  return (
    <textarea
      {...props}
      rows={4}
      style={{
        ...inputStyle,
        resize: "vertical",
        lineHeight: "1.6",
      }}
      className="placeholder-white/25 focus:border-purple-400/50"
    />
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

// ── Section card ──────────────────────────────────────────────────────────────
function SectionCard({ title, children }) {
  return (
    <div
      className="rounded-2xl p-6 space-y-5"
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
          </h2>
          <div className="h-px" style={{ background: "rgba(196,181,253,0.08)" }} />
        </>
      )}
      {children}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function EditProfile() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    phone: "",
    role: "",
    profile: { bio: "", skills: [], resume: "", profilePhoto: "" },
  });

  // ── Upload helper ──
  const uploadFile = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData);
      return res.data?.url || null;
    } catch (error) {
      console.error("UPLOAD ERROR:", error.response?.data || error.message);
      return null;
    }
  };

  // ── Fetch profile ──
  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res?.data?.success) {
        setUser(res.data.user);
        setAuth({ ...auth, user: res.data.user });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = res.data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => { if (auth?.token) getUserProfile(); }, [auth?.token]);

  // ── Photo preview ──
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // ── Submit ──
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let profilePhotoUrl = user.profile.profilePhoto;
      let resumeUrl = user.profile.resume;

      if (profilePhoto) {
        const uploaded = await uploadFile(profilePhoto, "image");
        if (uploaded) profilePhotoUrl = uploaded;
      }
      if (resume) {
        const uploaded = await uploadFile(resume, "resume");
        if (uploaded) resumeUrl = uploaded;
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile/update`,
        {
          fullname: user.fullname,
          phone: user.phone,
          bio: user.profile.bio,
          skills: user.profile.skills.join(","),
          profilePhoto: profilePhotoUrl,
          resume: resumeUrl,
        },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      if (res?.data?.success) {
        setUser(res.data.user);
        setAuth({ ...auth, user: res.data.user });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = res.data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
        navigate("/profile");
      }
    } catch (error) {
      console.error("UPDATE ERROR:", error.response?.data || error.message);
    }
    setLoading(false);
  };

  const currentPhoto = photoPreview || user.profile?.profilePhoto;

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

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* ── Page header ── */}
          <div className="mb-8">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(196,181,253,0.45)" }}
            >
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
              Edit Profile
            </h1>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              Keep your information up to date so recruiters can find you.
            </p>
            <div
              className="mt-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, #7C3AED, rgba(196,181,253,0.3), transparent)",
              }}
            />
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">

            {/* ── Profile photo ── */}
            <SectionCard title="Profile Photo">
              <div className="flex items-center gap-6">
                {/* Avatar preview */}
                <div className="shrink-0">
                  {currentPhoto ? (
                    <img
                      src={currentPhoto}
                      alt="profile"
                      className="w-20 h-20 rounded-2xl object-cover"
                      style={{ border: "2px solid rgba(196,181,253,0.25)" }}
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
                    >
                      {user.fullname?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>

                {/* File input */}
                <div className="flex-1">
                  <FieldLabel>Upload new photo</FieldLabel>
                  <label
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:border-purple-400/40"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px dashed rgba(196,181,253,0.2)",
                    }}
                  >
                    <span className="text-sm" style={{ color: "rgba(196,181,253,0.6)" }}>
                      {profilePhoto ? profilePhoto.name : "Choose image (JPG, PNG)"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </SectionCard>

            {/* ── Basic info ── */}
            <SectionCard title="Basic Information">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Full name</FieldLabel>
                  <DarkInput
                    placeholder="Your full name"
                    value={user.fullname}
                    onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                  />
                </div>
                <div>
                  <FieldLabel>Phone</FieldLabel>
                  <DarkInput
                    placeholder="+91 98765 43210"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Bio</FieldLabel>
                <DarkTextarea
                  placeholder="Write something about yourself..."
                  value={user.profile?.bio || ""}
                  onChange={(e) =>
                    setUser({ ...user, profile: { ...user.profile, bio: e.target.value } })
                  }
                />
              </div>
            </SectionCard>

            {/* ── Skills ── */}
            <SectionCard title="Skills">
              <div>
                <FieldLabel>Skills (comma separated)</FieldLabel>
                <DarkInput
                  placeholder="e.g. React, Node.js, Figma, Python"
                  value={user.profile?.skills?.join(", ") || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      profile: {
                        ...user.profile,
                        skills: e.target.value.split(","),
                      },
                    })
                  }
                />
              </div>
              {user.profile?.skills?.filter((s) => s.trim()).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.profile.skills.filter((s) => s.trim()).map((skill, i) => (
                    <SkillPill key={i} label={skill} />
                  ))}
                </div>
              )}
            </SectionCard>

            {/* ── Resume ── */}
            <SectionCard title="Resume">
              <div>
                <FieldLabel>Upload PDF resume</FieldLabel>
                <label
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:border-purple-400/40"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px dashed rgba(196,181,253,0.2)",
                  }}
                >
                  <span className="text-sm" style={{ color: "rgba(196,181,253,0.6)" }}>
                    {resume ? resume.name : "Choose PDF file"}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="hidden"
                  />
                </label>

                {user.profile?.resume && (
                  <p className="text-xs mt-2" style={{ color: "rgba(196,181,253,0.45)" }}>
                    Current resume:{" "}
                    <a
                      href={user.profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-300 underline underline-offset-2 hover:text-white transition-colors"
                    >
                      View uploaded resume ↗
                    </a>
                  </p>
                )}
              </div>
            </SectionCard>

            {/* ── Submit ── */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:border-purple-400/40"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(196,181,253,0.15)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
              >
                {loading ? "Saving changes..." : "Save Changes →"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}

export default EditProfile;
