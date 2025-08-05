import ProtectedRoute from "~/src/utils/protectedRoute";
import { AppSidebar, Header, Outlet, SidebarProvider } from "./imports";

export default function dashboard() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex h-screen w-screen">
          {/* Sidebar Panel - Fixed Width */}
          <div className="hidden md:block w-64 flex-shrink-0 border-r">
            <AppSidebar />
          </div>

          {/* Main Content Panel */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
