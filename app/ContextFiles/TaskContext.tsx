import React, { createContext, useEffect, useState, type ReactNode } from "react";
import { createTask, getTasks } from "~/Services/taskService";

export interface TaskItem {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    category: string;
    dueDate: Date;
    priority: string;
    status: string;
    isPublic: boolean;
}

interface TaskContextType {
    taskData: TaskItem[];
    addTask: (task: TaskItem) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, updatedTask: Partial<TaskItem>) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
    children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {

    const [taskData, setTaskData] = useState<TaskItem[]>([]);

    useEffect(() => {
        async function loadTasks() {
            try {
                const tasksFromFirestore = await getTasks();
                setTaskData(tasksFromFirestore);
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        }
        loadTasks();
    }, []);

    const addTask = async (task: TaskItem) => {
        try {
            await createTask(task);
            setTaskData(prev => [...prev, task]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const removeTask = (id: string) => {
        setTaskData((prev) => prev.filter(item => item.id !== id));
    };

    const updateTask = (id: string, updatedTask: Partial<TaskItem>) => {
        setTaskData((prev) =>
            prev.map(item =>
                item.id === id ? { ...item, ...updatedTask } : item
            )
        );
    };

    return (
        <TaskContext.Provider value={{ taskData, addTask, removeTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
