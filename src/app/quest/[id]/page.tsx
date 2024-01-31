'use client'
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import { toast } from "sonner";
import { statusOptions } from "~/app/exports/data";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import Task from "~/components/ui/task";
import TaskItem from "~/components/ui/taskItem";
import { api } from "~/trpc/react";

export interface TaskResponse {
    id: number;
    task_name: string;
    description: string;
    priority: string;
    status: string;
    project_id: number;
    user_id: string;
    createdAt: Date;
    updatedAt: Date | null;
    user: User
}

interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
};

const Quest = ({ params }: { params: { id: number } }) => {
    const [quest, setQuest] = useState<TaskResponse[]>([]);
    const [email, setEmail] = useState('');
    const getTasksQuery = api.project.getTasksForProject.useQuery({ projectId: Number(params.id) });

    const addUser = api.project.addUserToProject.useMutation({
        onSuccess: async () => {
            toast.success('A new user has been added');
        },
        onError: () => {
            toast.error('Some problem adding new user');
        },
    })

    useEffect(() => {
        if (getTasksQuery.data) {
            setQuest(getTasksQuery.data);
        }
    }, [getTasksQuery.data]);

    const updateStatus = api.task.updateTaskStatus.useMutation({
        onSuccess: async () => {
            toast.success('Task status has been updated');
            await getTasksQuery.refetch();
        },
        onError: () => {
            toast.error('Some problem updating task status');
        },
    })
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return; // dropped outside the list
        const updatedQuest = [...quest];
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        if (sourceIndex !== undefined && destinationIndex !== undefined) {
            const [movedTask] = updatedQuest.splice(sourceIndex, 1);
            if (movedTask) {
                updateStatus.mutate({
                    taskId: movedTask.id,
                    status: result.destination.droppableId
                });
                movedTask.status = result.destination.droppableId;
                updatedQuest.splice(destinationIndex, 0, movedTask);
            }
            setQuest(updatedQuest);
        }
    };

    const handleAddUserButtonClick = () => {
        addUser.mutate({ projectId: Number(params.id), userEmail: email })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Dialog>
                <DialogTrigger>
                    <Button>Add Task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>Add a new Task</DialogHeader>
                    <Task projectId={params.id} />
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger>
                    <Button>Add users</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>Add users to quest</DialogHeader>
                    <div>
                        <Input placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <Button onClick={handleAddUserButtonClick}>Add</Button>
                    </div>
                </DialogContent>
            </Dialog>


            <div className="flex flex-row p-4 min-h-[calc(100vh-74px)]">
                {statusOptions.map((status) => (
                    <div key={status.value} className="w-full bg-secondary m-2 rounded-md">
                        <p className="text-xl p-3 text-center">{status.name}</p>
                        <Droppable droppableId={status.value}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-col flex-1 p-3 gap-2" >
                                    {quest.filter((task) => task.status === status.value).map((task, index) => (
                                        <Draggable
                                            key={task.task_name}
                                            draggableId={task.task_name}
                                            index={index}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}>
                                                    <TaskItem task={task} id={params.id} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Quest;
