// import {
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
// } from "@/components/ui/sidebar";

// import {
//   LayoutDashboard,
//   PlusCircle,
//   Users,
//   Briefcase,
//   Settings,
//   LogOut,
// } from "lucide-react";

// import { NavLink } from "react-router-dom";

// function AdminMenu() {
//   const menuItems = [
//     {
//       name: "Dashboard",
//       icon: LayoutDashboard,
//       path: "/dashboard/recruiter",
//     },
//     {
//       name: "Create Company",
//       icon: PlusCircle,
//       path: "/dashboard/recruiter/create-company",
//     },
//     {
//       name: "Post Job",
//       icon: PlusCircle,
//       path: "/dashboard/recruiter/post-job",
//     },
//     {
//       name: "Applicants",
//       icon: Users,
//       path: "/dashboard/recruiter/applicants",
//     },
//     {
//       name: "My Jobs",
//       icon: Briefcase,
//       path: "/dashboard/recruiter/my-jobs",
//     },
//     {
//       name: "Settings",
//       icon: Settings,
//       path: "/dashboard/recruiter/settings",
//     },
//   ];

//   return (
//     <SidebarMenu className="p-4 space-y-2">

//       {menuItems.map((item, index) => {
//         const Icon = item.icon;

//         return (
//           <SidebarMenuItem key={index}>
//             <SidebarMenuButton asChild>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
//                   ${
//                     isActive
//                       ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-zinc-600 shadow-md"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
//                   }`
//                 }
//               >
//                 <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
//                 <span className="font-medium">{item.name}</span>
//               </NavLink>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         );
//       })}

//       {/* Divider */}
//       <div className="border-t my-4" />

//       {/* Logout */}
//       <SidebarMenuItem>
//         <SidebarMenuButton asChild>
//           <NavLink
//             to="/logout"
//             className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
//           >
//             <LogOut className="h-5 w-5" />
//             <span className="font-medium">Logout</span>
//           </NavLink>
//         </SidebarMenuButton>
//       </SidebarMenuItem>

//     </SidebarMenu>
//   );
// }

// export default AdminMenu;

import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";
// import { NavLink } from "@/components/NavLink";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const mainNav = [
  { title: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
  { title: "Create Company", url: "/dashboard/recruiter/create-company", icon: PlusCircle },
  { title: "Post Job", url: "/dashboard/recruiter/post-job", icon: PlusCircle },
  // { title: "Applicants", url: "/dashboard/recruiter/applicants", icon: Users },
  { title: "My Jobs", url: "/dashboard/recruiter/my-jobs", icon: Briefcase },
];

const bottomNav = [
  { title: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  { title: "Logout", url: "/logout", icon: LogOut },
];

export default function AdminMenu() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="sidebar-glow border-r-0 mt-20">
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-700 -sidebar-primary font-display text-sm font-bold text-sidebar-primary-foreground">
            R
          </div>
          {!collapsed && (
            <div className="animate-slide-in">
              <h2 className="font-display text-sm font-semibold text-sidebar-accent-foreground">
                Recruiter Panel
              </h2>
              <p className="text-xs text-sidebar-muted">Talent Acquisition</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <Separator className="bg-sidebar-border mx-3 w-auto" />

      <SidebarContent className="px-2 pt-4">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-sidebar-muted px-3 mb-1">
              Main
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="default" tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`rounded-lg bg-zinc-200 px-3 py-2 text-zinc-800 -sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground `}
                      // activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          {bottomNav.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="default" tooltip={item.title}>
                <NavLink
                  to={item.url}
                  className="rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  // activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <Separator className="bg-sidebar-border mx-1 w-auto my-2" />

        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 animate-slide-in">
              <p className="text-sm font-medium text-sidebar-accent-foreground">Jane Doe</p>
              <p className="text-xs text-sidebar-muted">Admin</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
