// React and state
export { useState, useRef, useContext, useMemo, type DragEvent} from "react"

// React Router
export { useNavigate, Outlet } from "react-router-dom"

// Form handling
export { useForm } from "react-hook-form"
export { zodResolver } from "@hookform/resolvers/zod"
export { z } from "zod"

// Firebase
export { Timestamp } from "firebase/firestore"

// UI Components
export { Button } from "../components/ui/button"
export {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"
export { Form } from "../components/ui/form"
export { Spinner } from "../components/ui/spinner"
export { SidebarProvider } from "../components/ui/sidebar"
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../components/ui/dropdown-menu"
export { Input } from "../components/ui/input"
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table"
export { Dialog, DialogTrigger } from "~/components/ui/dialog"

// Custom Components
export { default as EmailField } from "~/src/Components/FormFields/EmailField"
export {default as PasswordField} from "~/src/Components/FormFields/PasswordField"
export { default as NameField} from "~/src/Components/FormFields/NameField"
export { default as Header} from "~/src/Components/Layout/Header"
export { AppSidebar } from "~/src/Components/Layout/SideBar"
export { AddDialog } from "~/src/Components/Dialogs/AddDialogBox"
export { EditDialogBox } from "~/src/Components/Dialogs/EditDialogBox"
export { TaskItemCard } from "~/src/Components/TaskContent/TaskItem"
export { TaskStatusChart } from "~/src/Components/TaskContent/TaskStatusChart"
export {default as TaskStatusPieChart} from "~/src/Components/TaskContent/TaskStatusPieChart"

// Services
export { loginUser, signupUser } from "~/Services/authService"

// Context
export { useAuth } from "~/ContextFiles/AuthContext"
export { TaskContext, type TaskItem } from "~/ContextFiles/TaskContext"

// Dashboard Pages
export {default as AdminDashboard} from "~/routes/AdmnDashboard"
export {default as UserDashboard} from "~/routes/UserDashboard"

// Icons
export { ChevronDown, Plus } from "lucide-react"

// Table & React Table Utilities
export {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
