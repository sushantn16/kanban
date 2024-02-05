'use client'
import { PlusIcon } from "@radix-ui/react-icons";
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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { TaskResponse, User } from "~/app/exports/interfaces";

const Quest = ({ params }: { params: { id: number } }) => {
    const [quest, setQuest] = useState<TaskResponse[]>([]);
    const [email, setEmail] = useState('');

    const getTasksQuery = api.project.getTasksForProject.useQuery({ projectId: Number(params.id) });
    const getUsers = api.project.getUsersForProject.useQuery({ projectId: Number(params.id) });
    const users = getUsers.data ?? []

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
        <>

            <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{quest[0]?.project.name}</p>
                <div className="flex">
                    <Dialog>
                        <DialogTrigger className="mr-10">
                            <Button variant={"outline"}>Add Task</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>Add a new Task</DialogHeader>
                            <Task projectId={params.id} />
                        </DialogContent>
                    </Dialog>
                    <div className="flex">
                        {users?.map((user: User) =>
                            <Avatar key={user.id}>
                                <AvatarImage src={user.image ?? ''} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        )}
                        <Dialog>
                            <DialogTrigger className="z-10 -ml-5">
                                <Button variant={"outline"} className="rounded-full" size={"icon"}><PlusIcon /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>Add users to quest</DialogHeader>
                                <div>
                                    <Input placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    <Button onClick={handleAddUserButtonClick}>Add</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-row p-4 min-h-[calc(100vh-200px)]">
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
        </>
    );
};

export default Quest;
