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
// // import { useAuth } from "@/context/Auth";
// import axios from "axios";
// import { KeyRoundIcon, LogInIcon } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   // const [auth, setAuth] = useAuth()
//   const [fullname, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   // const [photo, setPhoto] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = {
//         fullname,
//         email,
//         phone,
//         password,
//         role,
//       };

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
//         data,
//       );
//       if (res.data.success) {
//         navigate("/login");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="max-w-3xl  py-10 mx-auto flex flex-col items-center justify-center shadow-xl border-r-1 max-h-[200vh] border-b-1 border-zinc-400">
//         <div className="w-[70%]">
//           <div className="flex gap-4 items-center border-b-4 mb-4 border-indigo-800 w-[250px]">
//             <h1 className="text-2xl text-zinc-100">New User, Sign up</h1>
//             <KeyRoundIcon className="text-white"/>
//           </div>
//           <form action="" onSubmit={handleSubmit} className="">
//             <FieldGroup>
//               <Field>
//                 <FieldLabel className="text-white" htmlFor="form-fullname">Name</FieldLabel>
//                 <Input
//                   className="text-white"
//                   onChange={(e) => setFullName(e.target.value)}
//                   value={fullname}
//                   id="form-fullname"
//                   type="text"
//                   placeholder="Evil Rabbit"
//                   required
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel className="text-white" htmlFor="form-email">Email</FieldLabel>
//                 <Input
//                   className="text-white"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   id="form-email"
//                   type="email"
//                   placeholder="john@example.com"
//                 />
//                 <FieldDescription className="text-white">
//                   We&apos;ll never share your email with anyone.
//                 </FieldDescription>
//               </Field>
//               <div className="max-w-5xl">
//                 <Field>
//                   <FieldLabel className="text-white" htmlFor="form-phone">Phone</FieldLabel>
//                   <Input
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="text-white"
//                     value={phone}
//                     id="form-phone"
//                     type="tel"
//                     placeholder="934-123-4567"
//                   />
//                 </Field>
//                 {/* <Field>
//             <FieldLabel htmlFor="form-country">Country</FieldLabel>
//             <Select defaultValue="us">
//               <SelectTrigger id="form-country">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="us">United States</SelectItem>
//                 <SelectItem value="uk">United Kingdom</SelectItem>
//                 <SelectItem value="ca">Canada</SelectItem>
//               </SelectContent>
//             </Select>
//           </Field> */}
//               </div>
//               <Field>
//                 <FieldLabel className="text-white" htmlFor="form-password">Password</FieldLabel>
//                 <Input
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="text-white"
//                   value={password}
//                   id="form-password"
//                   type="password"
//                   placeholder="password"
//                 />
//               </Field>
//               <div className="flex items-start justify-between">
//                 <div className="">
//                   <RadioGroup
//                     value={role}
//                     onValueChange={(value) => setRole(value)}
//                     className="text-white"
//                   >
//                     <Label className="text-white" htmlFor="Role">
//                       Role
//                     </Label>
//                     <div className="flex items-center gap-3">
//                       <RadioGroupItem value="student" id="student" />
//                       <Label className="text-zinc-500" htmlFor="student">
//                         Student
//                       </Label>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <RadioGroupItem value="recruiter" id="recruiter" />
//                       <Label className="text-zinc-500" htmlFor="recruiter">
//                         Recruiter
//                       </Label>
//                     </div>
//                   </RadioGroup>
//                 </div>
//                 {/* <div>
//                   <Label className="pb-3" htmlFor="profile">
//                     Profile Photo
//                   </Label>
//                   <Input
//                     id="profile-photo"
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       console.log(e.target.files[0]); // 👈 check this
//                       setPhoto(e.target.files[0]);
//                     }}                  />
//                 </div> */}
//               </div>
//               <Field className="text-white" orientation="horizontal">
//                 <Button type="button" variant="outline">
//                   Cancel
//                 </Button>
//                 <Button className="bg-indigo-800 text-white" type="submit">
//                   Submit
//                 </Button>
//               </Field>
//             </FieldGroup>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Register;




import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { UserRound, Building2 } from "lucide-react";

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
function DarkInput({ id, type = "text", placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
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

// ── Role card ─────────────────────────────────────────────────────────────────
function RoleCard({ value, selected, onSelect, Icon, label, description }) {
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
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: selected ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.06)" }}
        >
          <Icon className="w-4 h-4" style={{ color: selected ? "#C4B5FD" : "rgba(255,255,255,0.35)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold"
            style={{ color: selected ? "#fff" : "rgba(255,255,255,0.5)" }}>
            {label}
          </p>
          <p className="text-xs mt-0.5 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.28)" }}>
            {description}
          </p>
        </div>
        <div
          className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200"
          style={{ background: selected ? "#9D5CF6" : "rgba(255,255,255,0.1)" }}
        />
      </div>
    </button>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
              style={{
                background: done
                  ? "linear-gradient(135deg, #7C3AED, #9D5CF6)"
                  : active
                  ? "rgba(124,58,237,0.3)"
                  : "rgba(255,255,255,0.06)",
                border: active
                  ? "1px solid rgba(196,181,253,0.3)"
                  : done
                  ? "none"
                  : "1px solid rgba(196,181,253,0.1)",
                color: done ? "#fff" : active ? "#C4B5FD" : "rgba(255,255,255,0.25)",
              }}
            >
              {done ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-8 h-px flex-shrink-0"
                style={{ background: done ? "rgba(124,58,237,0.5)" : "rgba(196,181,253,0.12)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Password strength ─────────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const strength =
    password.length === 0 ? 0 :
    password.length < 6   ? 1 :
    password.length < 10  ? 2 :
    /[^a-zA-Z0-9]/.test(password) ? 4 : 3;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#EF4444", "#F59E0B", "#10B981", "#10B981"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1.5 mb-1">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: s <= strength ? colors[strength] : "rgba(255,255,255,0.08)" }}
          />
        ))}
      </div>
      <p className="text-[11px]" style={{ color: colors[strength] }}>
        {labels[strength]}
      </p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function Register() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("student");
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) { setError("Please agree to the Terms of Service."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        { fullname, email, phone, password, role }
      );
      if (res.data.success) navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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

        {/* ══ LEFT — Role selector panel ══ */}
        <div
          className="hidden lg:flex flex-col justify-between p-10 w-[42%] flex-shrink-0 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1E1333 0%, #2D1B5E 55%, #3B1F7A 100%)",
            borderRight: "1px solid rgba(196,181,253,0.08)",
          }}
        >
          <GlowOrb className="w-52 h-52 -top-10 -left-10"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)" }} />
          <GlowOrb className="w-40 h-40 -bottom-8 right-4"
            style={{ background: "radial-gradient(circle, rgba(157,92,246,0.2), transparent 70%)" }} />

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
            <StepIndicator steps={["Account", "Details", "Done"]} current={1} />

            <div
              className="w-10 h-1 rounded-full"
              style={{ background: "linear-gradient(90deg, #7C3AED, #C4B5FD)" }}
            />

            <h2 className="text-2xl font-bold text-white leading-snug">
              Join as a{" "}
              <span style={{
                background: "linear-gradient(90deg, #C4B5FD, #9D5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                job seeker
              </span>
              <br />or recruiter
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Pick the role that fits you. You can always switch later from your settings.
            </p>

            {/* Role cards */}
            <div className="space-y-3">
              <RoleCard
                value="student"
                selected={role === "student"}
                onSelect={setRole}
                Icon={UserRound}
                label="Job Seeker / Student"
                description="Browse jobs, apply and track your career progress."
              />
              <RoleCard
                value="recruiter"
                selected={role === "recruiter"}
                onSelect={setRole}
                Icon={Building2}
                label="Recruiter"
                description="Post jobs, manage candidates and hire top talent."
              />
            </div>
          </div>

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
            Create account
          </p>
          <h1 className="text-2xl font-bold text-white mb-1">Start your journey</h1>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
            Fill in your details to get started for free.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="reg-name">Full name</FieldLabel>
                <DarkInput
                  id="reg-name"
                  placeholder="Riya Kapoor"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="reg-phone">Phone</FieldLabel>
                <DarkInput
                  id="reg-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <FieldLabel htmlFor="reg-email">Email address</FieldLabel>
              <DarkInput
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-[11px] mt-1.5" style={{ color: "rgba(255,255,255,0.22)" }}>
                We'll never share your email with anyone.
              </p>
            </div>

            {/* Password */}
            <div>
              <FieldLabel htmlFor="reg-password">Password</FieldLabel>
              <DarkInput
                id="reg-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <PasswordStrength password={password} />
            </div>

            {/* Mobile role selector */}
            <div className="lg:hidden space-y-2">
              <FieldLabel>I am a</FieldLabel>
              <RoleCard
                value="student"
                selected={role === "student"}
                onSelect={setRole}
                Icon={UserRound}
                label="Job Seeker / Student"
                description="Browse and apply to jobs."
              />
              <RoleCard
                value="recruiter"
                selected={role === "recruiter"}
                onSelect={setRole}
                Icon={Building2}
                label="Recruiter"
                description="Post jobs and hire talent."
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-150"
                style={{
                  background: agreed ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
                  border: agreed ? "1px solid rgba(196,181,253,0.4)" : "1px solid rgba(196,181,253,0.2)",
                }}
              >
                {agreed && (
                  <div className="w-2 h-2 rounded-sm" style={{ background: "#9D5CF6" }} />
                )}
              </button>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                I agree to the{" "}
                <span style={{ color: "rgba(196,181,253,0.65)" }}>Terms of Service</span>
                {" "}and{" "}
                <span style={{ color: "rgba(196,181,253,0.65)" }}>Privacy Policy</span>
                {" "}of JobsX
              </p>
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
              {loading ? "Creating account..." : "Create account →"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(196,181,253,0.1)" }} />
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>or sign up with</span>
              <div className="flex-1 h-px" style={{ background: "rgba(196,181,253,0.1)" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200"
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

            {/* Login link */}
            <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              Already have an account?{" "}
              <NavLink
                to="/login"
                style={{ color: "#C4B5FD" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C4B5FD")}
              >
                Sign in
              </NavLink>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
