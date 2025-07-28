import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { TaskItem } from "~/ContextFiles/TaskContext";

export interface Task {
    title: string;
    description: string;
    assignedTo: string;
    category: string;
    dueDate: Date;
    priority: string;
    status: string;
    isPublic: boolean;
    createdAt?: string;
}

export async function createTask(task: Task) {
    try {
        await addDoc(collection(db, "tasks"), {
            ...task,
            createdAt: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error("Error creating task:", error.message);
        throw new Error(error.message);
    }
}

export async function getTasks() {
    try {
        const snapshot = await getDocs(collection(db, "tasks"));
        const tasks = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                description: data.description,
                assignedTo: data.assignedTo,
                category: data.category,
                dueDate: data.dueDate,
                priority: data.priority,
                status: data.status,
                isPublic: data.isPublic,
            } as TaskItem;
        })
        return tasks;
    } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
        throw new Error(error.message);
    }
}