// import React from 'react'
// import { Link } from 'react-router-dom'

// const Footer = () => {
//   return (
//     <div className='footer bg-[#1f1b2e text-gray-900 py-8'>
//         <h1 className='flex text-2xl items-center justify-center font- font-small leading-3'>
//           All rights reserved  &#169; jobsX.com
//         </h1>
//         <p className='flex font-light mt-4 items-center justify-center gap-5 py- leading-6'>
//           <Link to="/">Home</Link>|
//           <Link to="/contact">Contact</Link>|
//           <Link to="/about">About</Link>|          
//           <Link to="/privacy_policy">Privacy and Policy</Link>

//         </p>
//     </div>
// )}

// export default Footer



import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden px-8 py-12"
      style={{
        background: "linear-gradient(180deg, #1E1333 0%, #0D0A1A 100%)",
        borderTop: "1px solid rgba(196,181,253,0.1)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 pointer-events-none blur-3xl opacity-20"
        style={{ background: "radial-gradient(ellipse, #7C3AED, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 select-none">
          <span
            className="font-bold text-2xl tracking-tight"
            style={{
              background: "linear-gradient(90deg, #C4B5FD, #9D5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Jobs
          </span>
          <span className="font-bold text-2xl text-white tracking-tight">X</span>
        </Link>

        {/* Tagline */}
        <p className="text-sm text-white/30 tracking-wide text-center max-w-xs">
          Curated opportunities from companies that actually care about their people.
        </p>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.2), transparent)",
          }}
        />

        {/* Nav links */}
        <nav className="flex items-center gap-2 flex-wrap justify-center">
          {[
            { label: "Home", to: "/" },
            { label: "Contact", to: "/contact" },
            { label: "About", to: "/about" },
            { label: "Privacy Policy", to: "/privacy_policy" },
          ].map(({ label, to }, i, arr) => (
            <React.Fragment key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-200 px-1 ${
                    isActive ? "text-purple-300 font-medium" : "text-white/40 hover:text-white/80"
                  }`
                }
              >
                {label}
              </NavLink>
              {i < arr.length - 1 && (
                <span className="text-purple-400/20 select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-white/20 tracking-widest uppercase">
          © {new Date().getFullYear()} JobsX.com — All rights reserved
        </p>

      </div>
    </footer>
  )
}

export default Footer
