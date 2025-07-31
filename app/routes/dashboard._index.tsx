import { AdminDashboard, useAuth, UserDashboard } from "./imports";

export default function Dashboard() {
  const { email } = useAuth();

  if (email === "task-manager@admn.com") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
