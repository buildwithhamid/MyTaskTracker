import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form"
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import NameField from "./FormFields/NameField";
import CategoryField from "./FormFields/CategoryField";
import DateField from "./FormFields/DateField";
import AmountField from "./FormFields/AmountField";
import TextAreaField from "./FormFields/TextAreaField";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useContext } from "react";
import { TaskContext } from "~/ContextFiles/TaskContext";
import { useAPIContext } from "~/ContextFiles/UsersContext";

const FormSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .min(3, { message: "Title must be at least 3 characters." })
    .max(50, { message: "Title cannot exceed 50 characters." }),

  description: z
    .string({
      message: "Description is required"
    })
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description too long"),

  assignedTo: z
    .string({
      message: "Assignee is required"
    })
    .min(3, { message: "Assignee must be at least 3 characters." })
    .max(50, { message: "Assignee cannot exceed 50 characters." }),

  category: z
    .string({
      message: "Category is required",
    }),

  dueDate: z.date({
    message: "Date is required",
  }),

  priority: z
    .string({
      message: "Priority is required",
    }),

  status: z
    .string({
      message: "Status is required",
    }),

  isPublic: z
    .boolean(),

});

interface AddDialogProps {
  onClose: () => void;
}

export function AddDialog({ onClose }: AddDialogProps) {
  const taskContext = useContext(TaskContext);
  const { users } = useAPIContext();

  var categories = ["Personal", "Work", "Learning", "Others"]
  var priorities = ["Low", "High", "Medium"]
  var status = ["Pending", "Completed", "Inprogress"]
  const usernames: string[] = users.map(user => user.username);


  function onSubmit(data: z.infer<typeof FormSchema>) {
    // if (!taskContext) return;

    const { addTask } = taskContext!;

    const selectedUser = users.find(user => user.username === data.assignedTo);

    // ✅ If user not found, stop and show error
    if (!selectedUser) {
      console.error("Selected user not found");
      return;
    }

    const newTask = {
      id: selectedUser.uid,
      ...data,
    };

    addTask(newTask);
    onClose(); // close modal after adding
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      dueDate: new Date(),
      priority: "",
      status: "",
      category: "",
      isPublic: true,
    },
  })

  return (
    <DialogContent className="sm:max-w-[800px] overflow-visible">
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>

      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <NameField control={form.control} name="title" />
              <TextAreaField control={form.control} desc="description" />
              <CategoryField control={form.control} category="category" list={categories} />
              <CategoryField control={form.control} category="status" list={status} />
            </div>
            <div className="flex flex-col gap-3">
              <CategoryField control={form.control} category="assignedTo" list={usernames} />

              <CategoryField control={form.control} category="priority" list={priorities} />

              {/* <AmountField control={form.control} amount="amount" /> */}
              <DateField control={form.control} date="dueDate" />
              <div className="flex gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Task should be public</Label>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </div>

          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
