import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // ✅ import hook
} from "../components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Profile", url: "#", icon: Calendar },
  { title: "Logout", url: "/login", icon: LogOut },
];

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>

                <div className="flex flex-col justify-center items-center gap-2">
                  <img className="h-25 w-25" src="woman.png" alt="" />
                  <p className="text-gray-700 ">Kausar Fatima</p>
                  <p className="text-gray-700 ">kausarfatima1044@gmail.com</p>

                </div>

              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-12 w-12 m-2" />
                      <span className="m-2">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
