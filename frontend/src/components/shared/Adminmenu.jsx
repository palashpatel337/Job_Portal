


import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
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
  { title: "Dashboard",       url: "/dashboard/recruiter",                icon: LayoutDashboard },
  { title: "Create Company",  url: "/dashboard/recruiter/create-company", icon: PlusCircle      },
  { title: "Post Job",        url: "/dashboard/recruiter/post-job",       icon: PlusCircle      },
  { title: "My Jobs",         url: "/dashboard/recruiter/my-jobs",        icon: Briefcase       },
  { title: "Applications",    url: `/dashboard/recruiter/my-jobs/:jobId/applicants`,     icon: Users           },
  ];

const bottomNav = [
  { title: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  { title: "Logout",   url: "/logout",                       icon: LogOut   },
];

export default function AdminMenu() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 mt-20"
      style={{
        background: "linear-gradient(180deg, #1E1333 0%, #150E28 60%, #0D0A1A 100%)",
        borderRight: "1px solid rgba(196,181,253,0.1)",
      }}
    >
      {/* ── Header ── */}
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-3">
          {/* Brand avatar */}
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
          >
            R
          </div>

          {!collapsed && (
            <div className="animate-slide-in">
              <h2 className="text-sm font-semibold text-white tracking-tight">
                Recruiter Panel
              </h2>
              <p className="text-xs" style={{ color: "rgba(196,181,253,0.45)" }}>
                Talent Acquisition
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Divider */}
      <div
        className="mx-4 h-px"
        style={{ background: "rgba(196,181,253,0.1)" }}
      />

      {/* ── Main nav ── */}
      <SidebarContent className="px-2 pt-4">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel
              className="text-[10px] uppercase tracking-[0.15em] px-3 mb-2 font-semibold"
              style={{ color: "rgba(196,181,253,0.35)" }}
            >
              Main
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="default" tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard/recruiter"}
                      className={({ isActive }) =>
                        `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-white/40 hover:text-white/80"
                        }`
                      }
                      style={({ isActive }) =>
                        isActive
                          ? {
                              background:
                                "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(157,92,246,0.2))",
                              border: "1px solid rgba(196,181,253,0.2)",
                            }
                          : { background: "transparent", border: "1px solid transparent" }
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className="h-4 w-4 shrink-0"
                            style={{ color: isActive ? "#C4B5FD" : "rgba(196,181,253,0.4)" }}
                          />
                          {!collapsed && (
                            <span className="ml-3">{item.title}</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer nav ── */}
      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu className="space-y-0.5">
          {bottomNav.map((item) => {
            const isLogout = item.title === "Logout";
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="default" tooltip={item.title}>
                  <NavLink
                    to={item.url}
                    className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 border border-transparent ${
                      isLogout
                        ? "text-red-400/60 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/15"
                        : "text-white/40 hover:text-white/80 hover:bg-white/5 hover:border-white/5"
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Divider */}
        <div
          className="mx-1 my-3 h-px"
          style={{ background: "rgba(196,181,253,0.08)" }}
        />

        {/* User row */}
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-8 w-8 shrink-0 ring-2" style={{ "--tw-ring-color": "rgba(124,58,237,0.4)" }}>
            <AvatarFallback
              className="text-xs font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #7C3AED, #9D5CF6)" }}
            >
              JD
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="flex-1 min-w-0 animate-slide-in">
              <p className="text-sm font-medium text-white truncate">Jane Doe</p>
              <p
                className="text-xs truncate"
                style={{ color: "rgba(196,181,253,0.4)" }}
              >
                Recruiter
              </p>
            </div>
          )}

          {!collapsed && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
              style={{
                background: "rgba(124,58,237,0.25)",
                color: "#C4B5FD",
              }}
            >
              Pro
            </span>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
