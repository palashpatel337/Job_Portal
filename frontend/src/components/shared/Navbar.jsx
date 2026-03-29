// import React, { useEffect, useState } from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { LogOut, User2 } from "lucide-react";
// import { useAuth } from "@/context/Auth";
// import { NavLink } from "react-router-dom";
// import axios from "axios";

// function Navbar() {
//   const [auth, setAuth] = useAuth();
//     const [user, setUser] = useState(null);
  
//   const getUserProfile = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/profile`
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


//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//   };

//   return (
//       <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/40 borde border-white/20 shadow-l flex justify-between items-center mx-auto max-w-7xl h-16 px-8 rounded-2x mt-2">      <div>
//         <h1 className="text-indigo-700 font-bold text-xl">
//           <NavLink to="/">
//             Jobs<span className="text-zinc-900">X</span>
//           </NavLink>
//         </h1>
//       </div>
//       <div className="flex gap-12 items-center justify-between">
//         <ul className="flex gap-6 mr-8">
//           <li>
//             <NavLink to="/">Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/application/get">My Application</NavLink>
//           </li>
//           <li>Saved Jobs</li>
//         </ul>
//         {!auth?.user ? (
//           <div className="flex gap-4">
//             <Button>
//               <NavLink to="/login">Login</NavLink>
//             </Button>
//             <Button className="bg-indigo-800 text-white" variant="outline">
//               <NavLink to="/register">Signup</NavLink>
//             </Button>
//           </div>
//         ) : (
//           <Popover className='bg-red-500'>
//             <PopoverTrigger asChild>
//               <Avatar>
//                 <AvatarImage src={`${import.meta.env.VITE_API_URL}/uploads/${user?.profile?.profilePhoto}`}
//  />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//             </PopoverTrigger>
//             <PopoverContent className='bg-slate-100 mr-28'>
//               <div className="z-100 bg-slate-100">
//                 <div className="flex gap-2 my-2 cursor-pointer">
//                   <Avatar>
//                     <AvatarImage src="https://github.com/shadcn.png" />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                   <div className="">
//                     <h1>{user?.fullname}</h1>
//                     <p className="text-zinc-500 text-sm lg:truncate truncate w-[200px]">
//                       {user?.email}
//                       </p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-2 my-2 ">
//                   <div className="flex items-center">
//                     <User2 />
//                     <Button variant="link">
//                       {auth?.user?.role=="recruiter" ?(
//                         <NavLink to="/dashboard/recruiter">View Profile</NavLink>
//                       ):(
//                         <NavLink to="/profile">View Profile</NavLink>
//                       )}

//                     </Button>
//                   </div>
//                   <div className="flex items-center">
//                     <LogOut />
//                     <Button onClick={handleLogout} variant="link">
//                       <NavLink to="/login">Logout</NavLink>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </PopoverContent>
//           </Popover>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useAuth } from "@/context/Auth";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile`
      );
      if (res?.data?.success) setUser(res.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => { getUserProfile(); }, []);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <div
      className="sticky top-0 z-50 flex justify-between items-center mx-aut max-w-7x h-16 px-[5vw] "
      style={{
          background: 'linear-gradient(180deg, #0D0A1A 0%, #1E1333 40%)',
        }}
      // style={{
      //   background: "rgba(26, 5, 77, 0.04)",
      //   border: "1px solid rgba(196,181,253,0.15)",
        // backdropFilter: "blur(16px)",
        // WebkitBackdropFilter: "blur(16px)",
      // }}
    >
      {/* ── Logo ── */}
      <NavLink to="/" className="flex items-center gap-1 select-none">
        <span
          className="font-bold text-xl tracking-tight"
          style={{
            background: "linear-gradient(90deg, #413863, #715893)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Jobs
        </span>
        <span className="font-bold text-xl text-zinc-100 tracking-tight">X</span>
      </NavLink>

      {/* ── Nav links + auth ── */}
      <div className="flex items-center gap-10">
        <ul className="flex items-center gap-7">
          {[
            { label: "Home", to: "/" },
            { label: "My Applications", to: "/application/get" },
            { label: "Saved Jobs", to: "/saved" },
          ].map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-purple-300"
                      : "text-white/50 hover:text-white/90"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Auth buttons / avatar ── */}
        {!auth?.user ? (
          <div className="flex items-center gap-3">
            {/* Ghost login */}
            <NavLink
              to="/login"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 px-4 py-1.5 rounded-full border border-purple-400/20 hover:border-purple-400/40"
            >
              Log in
            </NavLink>
            {/* Solid signup */}
            <NavLink
              to="/register"
              className="text-sm font-semibold text-white px-4 py-1.5 rounded-full transition-all duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #9D5CF6)",
              }}
            >
              Sign up
            </NavLink>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative flex-shrink-0 focus:outline-none group">
                <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-purple-500/30 group-hover:ring-purple-400/60 transition-all duration-200">
                  <AvatarImage
                    src={`${user?.profile?.profilePhoto}`}
                  />
                  <AvatarFallback
                    className="text-white text-sm font-semibold"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
                  >
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1E1333]" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="w-64 p-0 rounded-2xl overflow-hidden shadow-2xl border"
              style={{
                background: "rgba(30,19,51,0.95)",
                borderColor: "rgba(196,181,253,0.15)",
                backdropFilter: "blur(20px)",
              }}
              align="end"
              sideOffset={10}
            >
              {/* User info header */}
              <div
                className="flex items-center gap-3 px-4 py-4"
                style={{ borderBottom: "1px solid rgba(196,181,253,0.1)" }}
              >
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage
                    src={`${user?.profile?.profilePhoto}`}
                  />
                  <AvatarFallback
                    className="text-white text-sm font-semibold"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
                  >
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user?.fullname}</p>
                  <p className="text-xs text-white/40 truncate">{user?.email}</p>
                </div>
              </div>

              {/* Menu items */}
              <div className="px-2 py-2 flex flex-col gap-0.5">
                <NavLink
                  to={auth?.user?.role === "recruiter" ? "/dashboard/recruiter" : "/profile"}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-purple-500/15 transition-all duration-150"
                >
                  <User2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  View Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150 w-full text-left"
                >
                  <LogOut className="w-4 h-4 text-red-400/60 flex-shrink-0" />
                  Log out
                </button>
              </div>

              {/* Footer tag */}
              <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(196,181,253,0.08)" }}
              >
                <span className="text-[10px] tracking-widest uppercase text-white/20 font-medium">JobsX</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(124,58,237,0.25)",
                    color: "#C4B5FD",
                  }}
                >
                  {auth?.user?.role || "member"}
                </span>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default Navbar;
