import { useAuth } from "~/ContextFiles/AuthContext";
import AdminDashboard from "./AdmnDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const { email } = useAuth();

  if (email === "task-manager@admn.com") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
