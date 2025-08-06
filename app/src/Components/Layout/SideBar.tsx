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

import { useNavigate } from "react-router-dom";
import { logoutUser } from "~/Services/authService";

export function AppSidebar() {
  const { email, username, setEmail, setUserId,setUsername } = useAuth();
  const { view } = useView();
  const navigate = useNavigate();

  const isAdmin = email === "task-manager@admn.com";

  const items = (isAdmin && view === "Admin")
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      setEmail("");
      setUserId("");
      setUsername("");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex flex-col justify-center items-center gap-2">
                  <img className="h-25 w-25" src="woman.png" alt="" />
                  <p className="text-gray-700">{username}</p>
                  <p className="text-gray-700">{email}</p>
                </div>
              </SidebarMenuItem>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Logout" ? (
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link to={item.url}>
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </Link>
                    )}
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
