import { ModeToggle, SidebarToggleButton } from "./imports";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between border-b">
      <SidebarToggleButton />
      <div className="flex justify-between items-center gap-3">
        <img className="h-12 w-12" src="/expense.png" alt="" />
        <h1 className="text-2xl font-semibold">Tasks Manager</h1>
      </div>
      <ModeToggle />
    </header>
  );
}