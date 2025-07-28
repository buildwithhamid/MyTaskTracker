import { Menu } from "lucide-react";
import { useSidebar } from "~/components/ui/sidebar";

export function SidebarToggleButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar} className="md:hidden p-2">
      <Menu />
    </button>
  );
}
