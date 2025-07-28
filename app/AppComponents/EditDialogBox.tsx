import z from "zod";
import { Button } from "../components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import NameField from "./FormFields/NameField";
import CategoryField from "./FormFields/CategoryField";
import DateField from "./FormFields/DateField";
import TextAreaField from "./FormFields/TextAreaField";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useContext, useEffect } from "react";
import { TaskContext, type TaskItem} from "~/ContextFiles/TaskContext";

const FormSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(5).max(500),
  assignedTo: z.string().min(3).max(50),
  category: z.string(),
  dueDate: z.date(),
  priority: z.string(),
  status: z.string(),
  isPublic: z.boolean(),
});

interface EditDialogProps {
  onClose: () => void;
  task: TaskItem;
}

export function EditDialogBox({ onClose, task }: EditDialogProps) {
  const taskContext = useContext(TaskContext)!;
  const { updateTask } = taskContext;

  const categories = ["Personal", "Work", "Learning", "Others"];
  const priorities = ["Low", "High", "Medium"];
  const statuses = ["Pending", "Completed", "Inprogress"];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...task,
      dueDate: new Date(task.dueDate),
    },
  });

  // Ensure form updates if a different task is passed while open
  useEffect(() => {
    form.reset({
      ...task,
      dueDate: new Date(task.dueDate),
    });
  }, [task]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateTask(task.id, data);
    onClose();
  }

  return (
    <DialogContent className="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <NameField control={form.control} name="title" />
              <TextAreaField control={form.control} desc="description" />
              <CategoryField control={form.control} category="category" list={categories} />
              <CategoryField control={form.control} category="status" list={statuses} />
            </div>
            <div className="flex flex-col gap-3">
              <NameField control={form.control} name="assignedTo" />
              <CategoryField control={form.control} category="priority" list={priorities} />
              <DateField control={form.control} date="dueDate" />
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="isPublic"
                  checked={form.watch("isPublic")}
                  onCheckedChange={(checked) => form.setValue("isPublic", Boolean(checked))}
                />
                <Label htmlFor="isPublic">Task should be public</Label>
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
  );
}
