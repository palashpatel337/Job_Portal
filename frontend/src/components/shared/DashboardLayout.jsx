import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import AdminMenu from "./Adminmenu";
import Layout from "./Layout";

function DashboardLayout() {
  return (
    <Layout>

    <SidebarProvider>
        <div className="flex border-0">

        <Sidebar className="mt-14 bg-white">
          <SidebarHeader className="p-4 font-bold text-lg ">
            Recruiter Panel
          </SidebarHeader>

          <SidebarContent className="">
            <AdminMenu />
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>
    </SidebarProvider>
        </Layout>

  );
}

export default DashboardLayout;
