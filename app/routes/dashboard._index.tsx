import { TaskItemCard } from "~/AppComponents/TaskItem";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { AddDialog } from "~/AppComponents/AddDialogBox";
import { TaskContext, type TaskItem } from "~/ContextFiles/TaskContext";
import { useContext, useState, type Key } from "react";
import { EditDialogBox } from "~/AppComponents/EditDialogBox";
import { TaskStatusChart } from "~/AppComponents/TaskStatusChart";
import TaskStatusPieChart from "~/AppComponents/TaskStatusPieChart";

export default function TaskDashboard() {
    const taskContext = useContext(TaskContext);
    const { taskData, removeTask, updateTask } = taskContext!;
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);


    return (
        <div>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center">
                    <p>Total Tasks: {taskData.length}</p>
                    <Dialog open={addOpen} onOpenChange={setAddOpen}>

                        <DialogTrigger asChild>
                            <Button
                                size="icon"
                                variant="default"
                                className="w-35"
                                aria-label="Add Task"
                            >
                                <Plus className="h-5 w-5" />
                                <p>Add Task</p>
                            </Button>
                        </DialogTrigger>
                        <AddDialog onClose={() => setAddOpen(false)} />

                    </Dialog>

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <TaskStatusChart/>
                <TaskStatusPieChart/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {taskData.length === 0 ? (
                    <div className="col-span-full flex justify-center text-gray-500 mt-4">
                        No tasks available
                    </div>
                ) : (
                    taskData.map((task) => (
                        <TaskItemCard
                            key={task.id}
                            title={task.title}
                            category={task.category}
                            dueDate={task.dueDate}
                            status={task.status}
                            assignedTo={task.assignedTo}
                            priority={task.priority}
                            isPublic={task.isPublic}
                            onEdit={() => {
                                setSelectedTask(task);
                                setEditOpen(true);
                            }}
                            onDelete={() => removeTask(task.id)}
                        />

                    ))
                )}
            </div>
            {/* Edit Dialog */}
            {selectedTask && (
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <EditDialogBox onClose={() => setEditOpen(false)} task={selectedTask} />
                </Dialog>
            )}
        </div>
    );
};