import { useView } from "~/ContextFiles/ViewContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Calendar,
  Home,
  Inbox,
  LogOut,
  Settings,
  Link,
  useAuth,
} from "./imports";

export function AppSidebar() {
  const { email, username } = useAuth();
  const { view } = useView();

  const isAdmin = email === "task-manager@admn.com";

  const items = (isAdmin && view==="Admin")
    ? [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Inbox", url: "#", icon: Inbox },
        { title: "Profile", url: "#", icon: Settings },
        { title: "Logout", url: "/login", icon: LogOut },
      ]
    : [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Profile", url: "#", icon: Calendar },
        { title: "Logout", url: "/login", icon: LogOut },
      ];

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
                  <p className="text-gray-700 ">{username}</p>
                  <p className="text-gray-700 ">{email}</p>

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
