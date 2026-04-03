// import Layout from "@/components/shared/Layout";
// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useAuth } from "@/context/Auth";
// import axios from "axios";
// import { KeyRoundIcon } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   const { auth, setAuth } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
//         { email, password, role },
//       );

//       if (res.data.success) {
//         setAuth({
//           user: res.data.user,
//           token: res.data.token,
//         });

//         localStorage.setItem("auth", JSON.stringify(res.data));

//         navigate("/");
//         console.log(res.data.token);
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Layout>
//       <div className="h-[100vh] lg:py[20vh] py-[10vh]">

//       <div className="lg:max-w-4xl lg:py-[20px]  flex lg:h-[50vh] px-20 mx-auto lg:flex  justify-cente items-center lg:gap-4 lg:justify-around lg:shadow-2xl  lg:max-h-[200vh] lg:border-1 border-zinc-200 rounded-lg">
//         <div className="flex items-center  lg:flex-col lg:w-[180px] lg:h-[50vh] py-5">
//           <div className="hidden lg:inline-block">
//             <span
//               className="font-bold text-xl tracking-tight"
//               style={{
//                 // background: "linear-gradient(90deg, #413863, #715893)",
//                 background: "linear-gradient(90deg, #C4B5FD, #9D5CF6)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//               >
//               Jobs
//             </span>
//             <span className="font-bold text-xl text-zinc-100 tracking-tight">
//               {" "}
//               X
//             </span>
//           </div>
//           <div className="flex items-center border-b-4 border-indigo-800">
//             <div>
//               <h1 className="text-4xl p-2 font-semibold text-white">Sign in</h1>
//             </div>
//             <div>
//               <KeyRoundIcon className="text-zinc-100" />
//             </div>
//           </div>
//         </div>
//         <div className="  ">
//           <form
//             action=""
//             onSubmit={handleSubmit}
//             className="w-[350px] max-w-sm"
//             >
//             <FieldGroup>
//               <Field>
//                 <FieldLabel className="text-white" htmlFor="form-email">
//                   Email
//                 </FieldLabel>
//                 <Input
//                   className="text-white"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   id="form-email"
//                   type="email"
//                   placeholder="john@example.com"
//                   />
//               </Field>
//               <Field>
//                 <FieldLabel className="text-white" htmlFor="form-password">
//                   Password
//                 </FieldLabel>
//                 <Input
//                   className="text-white"
//                   onChange={(e) => setPassword(e.target.value)}
//                   value={password}
//                   id="form-password"
//                   type="password"
//                   placeholder="password"
//                   />
//               </Field>
//               <RadioGroup
//                 value={role}
//                 onValueChange={(value) => setRole(value)}
//                 >
//                 <Label className="pb-3 text-white" htmlFor="Role">
//                   Role
//                 </Label>
//                 <div className="flex items-center gap-3">
//                   <RadioGroupItem value="student" id="student" />
//                   <Label className="text-white" htmlFor="student">
//                     Student
//                   </Label>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <RadioGroupItem value="recruiter" id="recruiter" />
//                   <Label className="text-white" htmlFor="recruiter">
//                     Recruiter
//                   </Label>
//                 </div>
//               </RadioGroup>
//               <Field orientation="horizontal">
//                 <Button className="text-white" type="button" variant="outline">
//                   Cancel
//                 </Button>
//                 <Button className="bg-purple-800 text-white" type="submit">
//                   Submit
//                 </Button>
//               </Field>
//             </FieldGroup>
//           </form>
//         </div>
//       </div>
//                 </div>
//     </Layout>
//   );
// }

// export default Login;



import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/context/Auth";
import { KeyRound } from "lucide-react";

// ── Glow orb ──────────────────────────────────────────────────────────────────
function GlowOrb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-25 ${className}`}
      style={style}
    />
  );
}

// ── Field label ───────────────────────────────────────────────────────────────
function FieldLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-semibold uppercase tracking-widest mb-2"
      style={{ color: "rgba(196,181,253,0.55)" }}
    >
      {children}
    </label>
  );
}

// ── Dark input ────────────────────────────────────────────────────────────────
function DarkInput({ id, type = "text", placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200 placeholder-white/25"
      style={{
        background: focused ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.05)",
        border: focused
          ? "1px solid rgba(196,181,253,0.45)"
          : "1px solid rgba(196,181,253,0.15)",
        fontFamily: "inherit",
      }}
    />
  );
}

// ── Role radio card ───────────────────────────────────────────────────────────
function RoleCard({ value, selected, onSelect, icon, label, description }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="w-full text-left p-4 rounded-xl transition-all duration-200"
      style={{
        background: selected ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.04)",
        border: selected
          ? "1px solid rgba(196,181,253,0.35)"
          : "1px solid rgba(196,181,253,0.1)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{
            background: selected ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.06)",
          }}
        >
          {icon}
        </div>
        <span
          className="text-sm font-semibold"
          style={{ color: selected ? "#fff" : "rgba(255,255,255,0.5)" }}
        >
          {label}
        </span>
        {selected && (
          <div
            className="w-2 h-2 rounded-full ml-auto flex-shrink-0"
            style={{ background: "#9D5CF6" }}
          />
        )}
      </div>
      {description && (
        <p className="text-xs mt-2 ml-11 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.3)" }}>
          {description}
        </p>
      )}
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("student");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const { setAuth }             = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        { email, password, role }
      );
      if (res.data.success) {
        setAuth({ user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
      }}
    >
      {/* Ambient orbs */}
      <GlowOrb className="w-96 h-96 -top-20 -right-20"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }} />
      <GlowOrb className="w-72 h-72 bottom-20 left-1/4"
        style={{ background: "radial-gradient(circle, #9D5CF6, transparent 70%)" }} />
      <GlowOrb className="w-56 h-56 top-1/3 -left-10"
        style={{ background: "radial-gradient(circle, #6D28D9, transparent 70%)" }} />

      {/* ── Split card ── */}
      <div
        className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col lg:flex-row"
        style={{ border: "1px solid rgba(196,181,253,0.12)" }}
      >

        {/* ══ LEFT — Branding panel ══ */}
        <div
          className="hidden lg:flex flex-col justify-between p-10 w-[42%] flex-shrink-0 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1E1333 0%, #2D1B5E 55%, #3B1F7A 100%)",
            borderRight: "1px solid rgba(196,181,253,0.08)",
          }}
        >
          <GlowOrb className="w-52 h-52 -top-10 -right-10"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)" }} />
          <GlowOrb className="w-40 h-40 -bottom-8 left-4"
            style={{ background: "radial-gradient(circle, rgba(157,92,246,0.25), transparent 70%)" }} />

          {/* Logo */}
          <div className="relative z-10">
            <NavLink to="/" className="flex items-center gap-1 w-fit">
              <span className="font-bold text-xl tracking-tight" style={{
                background: "linear-gradient(90deg, #C4B5FD, #9D5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Jobs</span>
              <span className="font-bold text-xl text-white tracking-tight">X</span>
            </NavLink>
          </div>

          {/* Center content */}
          <div className="relative z-10 space-y-6">
            <div
              className="w-10 h-1 rounded-full"
              style={{ background: "linear-gradient(90deg, #7C3AED, #C4B5FD)" }}
            />
            <h2 className="text-2xl font-bold text-white leading-snug">
              Your next{" "}
              <span style={{
                background: "linear-gradient(90deg, #C4B5FD, #9D5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                dream role
              </span>
              <br />is one click away.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Join thousands of professionals who found their perfect job on JobsX.
            </p>

            {/* Stats */}
            <div className="flex gap-6 pt-2">
              {[
                { num: "48K+", label: "Active jobs" },
                { num: "12K+", label: "Companies" },
                { num: "2.4M", label: "Job seekers" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="text-xl font-bold text-white">{num}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(196,181,253,0.45)" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-3 pt-1">
              {[
                "Track all your applications in one place",
                "Get notified when recruiters view your profile",
                "Apply to top companies with a single click",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #C4B5FD)" }} />
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom filler */}
          <div />
        </div>

        {/* ══ RIGHT — Form panel ══ */}
        <div
          className="flex-1 p-8 sm:p-10 flex flex-col justify-center"
          style={{ background: "rgba(13,10,26,0.95)" }}
        >
          {/* Mobile logo */}
          <NavLink to="/" className="flex items-center gap-1 w-fit mb-8 lg:hidden">
            <span className="font-bold text-xl tracking-tight" style={{
              background: "linear-gradient(90deg, #C4B5FD, #9D5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Jobs</span>
            <span className="font-bold text-xl text-white tracking-tight">X</span>
          </NavLink>

          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2"
            style={{ color: "rgba(196,181,253,0.5)" }}>
            Welcome back
          </p>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            Sign in to your account
            <KeyRound className="w-5 h-5" style={{ color: "rgba(196,181,253,0.5)" }} />
          </h1>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
            Access your profile, applications and saved jobs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <FieldLabel htmlFor="login-email">Email address</FieldLabel>
              <DarkInput
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <button
                  type="button"
                  className="text-[11px] transition-colors"
                  style={{ color: "rgba(196,181,253,0.55)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C4B5FD")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(196,181,253,0.55)")}
                >
                  Forgot password?
                </button>
              </div>
              <DarkInput
                id="login-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role */}
            <div>
              <FieldLabel>Sign in as</FieldLabel>
              <div className="flex flex-col gap-2">
                <RoleCard
                  value="student"
                  selected={role === "student"}
                  onSelect={setRole}
                  icon="👤"
                  label="Job Seeker / Student"
                  description="Browse jobs, apply and track your applications."
                />
                <RoleCard
                  value="recruiter"
                  selected={role === "recruiter"}
                  onSelect={setRole}
                  icon="🏢"
                  label="Recruiter"
                  description="Post jobs and manage candidates."
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs px-3 py-2 rounded-lg"
                style={{ background: "rgba(239,68,68,0.12)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(196,181,253,0.1)" }} />
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>or continue with</span>
              <div className="flex-1 h-px" style={{ background: "rgba(196,181,253,0.1)" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(196,181,253,0.13)",
                color: "rgba(255,255,255,0.55)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(196,181,253,0.28)";
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(196,181,253,0.13)";
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              }}
            >
              <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 text-[10px] font-bold text-white flex items-center justify-center">G</span>
              Continue with Google
            </button>

            {/* Sign up link */}
            <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              Don't have an account?{" "}
              <NavLink to="/register"
                className="transition-colors"
                style={{ color: "#C4B5FD" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C4B5FD")}
              >
                Sign up free
              </NavLink>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
