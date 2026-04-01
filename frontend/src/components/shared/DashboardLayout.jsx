// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
// } from "@/components/ui/sidebar";

// import { Outlet } from "react-router-dom";
// import AdminMenu from "./Adminmenu";
// import Layout from "./Layout";

// function DashboardLayout() {
//   return (
//     <Layout>

//     <SidebarProvider>
//         <div className="flex border-0">

//         <Sidebar className="mt-14 bg-white">
//           <SidebarHeader className="p-4 font-bold text-lg ">
//             Recruiter Panel
//           </SidebarHeader>

//           <SidebarContent className="">
//             <AdminMenu />
//           </SidebarContent>
//         </Sidebar>

//         <main className="flex-1 p-8">
//           <Outlet />
//         </main>

//       </div>
//     </SidebarProvider>
//         </Layout>

//   );
// }

// export default DashboardLayout;




import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import AdminMenu from "./Adminmenu";
import Layout from "./Layout";

function DashboardLayout() {
  return (
    <Layout>
      <div
        className="min-h-screen bg-red-300"
        style={{
          background:
            "linear-gradient(135deg, #0D0A1A 0%, #1E1333 40%, #2D1B5E 70%, #3B1F7A 100%)",
        }}
      >
        {/* Ambient glow orbs — same as Homepage */}
        <div
          className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
        />
        <div
          className="fixed bottom-1/3 left-0 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #9D5CF6, transparent 70%)" }}
        />

        <SidebarProvider>
          <div className="relative z-10 flex min-h-screen">

            {/* ── Sidebar ── */}
            <AdminMenu className="bg-transparent"/>

            {/* ── Main content area ── */}
            <main className="flex-1 p-8 overflow-auto">

              {/* Subtle top accent line */}
              <div
                className="mb-8 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(124,58,237,0.6), rgba(196,181,253,0.2), transparent)",
                }}
              />

              {/* Page content */}
              <div className="text-white">
                <Outlet />
              </div>

            </main>
          </div>
        </SidebarProvider>
      </div>
    </Layout>
  );
}

export default DashboardLayout;
