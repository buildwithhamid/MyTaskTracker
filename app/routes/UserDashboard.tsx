"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { useContext, useMemo, useState } from "react";
import { TaskContext } from "~/ContextFiles/TaskContext"
import { useAuth } from "~/ContextFiles/AuthContext"
import { Timestamp } from "firebase/firestore"
import { Spinner } from "~/components/ui/spinner"

const globalFilterFn = <TData extends object>(
  row: Row<TData>,
  filterValue: string
) => {
  const search = filterValue.toLowerCase();
  const searchableFields = ["title", "category", "status", "priority", "description", "dueDate"];
  return searchableFields.some((key) => {
    const value = row.original[key as keyof TData];
    return String(value).toLowerCase().includes(search);
  });
};

export type Task = {
  title: string
  category: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  description: string
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.getValue("category"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("priority")}</span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => row.getValue("dueDate"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description"),
  },
]

export default function UserDashboard() {
  const { taskData } = useContext(TaskContext)!;
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true)

  const userTasks = useMemo(() => {
    console.log("Updated taskData from context:", taskData);

    return taskData
      .filter((task) => {
        console.log("task.userId:", task.userId);
        console.log("Expected userId:", userId);
        console.log("isPublic:", task.isPublic);
        return task.userId === userId && task.isPublic;
      })
      .map((task) => ({
        title: task.title,
        category: task.category,
        status: task.status as "pending" | "in-progress" | "completed",
        priority: task.priority as "low" | "medium" | "high",
        dueDate:
          task.dueDate instanceof Date
            ? task.dueDate.toLocaleDateString()
            : task.dueDate instanceof Timestamp
              ? task.dueDate.toDate().toLocaleDateString()
              : typeof task.dueDate === "string"
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A",
        description: task.description,
      }));
  }, [taskData, userId]);
  React.useEffect(() => {
    if (taskData.length > 0) {
      setLoading(false);
    }
  }, [taskData]);

  console.log(userId);
  console.log(userTasks)

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: userTasks,
    columns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: globalFilterFn,
  });


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search tasks..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full overflow-auto">
        <div className="min-w-[800px] rounded-md border">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex justify-center items-center py-10 w-full">
                      <Spinner size="sm" className="dark:bg-white" />
                    </div>
                  </TableCell>

                </TableRow>
              ) : <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex justify-center items-center py-10 w-full">
                    No Record
                  </div>
                </TableCell>

              </TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
