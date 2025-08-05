import { Navigate } from "react-router-dom";
import { useAuth } from "~/ContextFiles/AuthContext";
import { Spinner } from "~/routes/imports";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userId, loading } = useAuth();

  if (loading) {
    return <div className="flex flex-col items-center justify-center">
      <Spinner size="lg"/>
    </div>;
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
