'use client'
import { Textarea } from "./textarea";
import { priorityOptions } from "./task";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Input } from "./input";
import type { TaskResponse } from "~/app/quest/[id]/page";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "./button";
import { statusOptions } from "~/app/exports/data";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface TaskDetailProps {
    task: TaskResponse;
    id: number;
}
const TaskDetail: React.FC<TaskDetailProps> = ({ task, id }) => {

    const [taskDetail, setTaskDetail] = useState(task);
    const [comment, setComment] = useState('');

    const getTasksQuery = api.project.getTasksForProject.useQuery({ projectId: Number(id) });

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskDetail((prevTask) => ({
            ...prevTask,
            description: e.target.value,
        }));
    };

    const handleTaskDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDetail((prevTask) => ({
            ...prevTask,
            task_name: e.target.value,
        }));
    }

    const onSelectChange = (value: string) => {
        setTaskDetail((prevTask) => ({
            ...prevTask,
            priority: value,
        }));
    };

    const onStatusChange = (value: string) => {
        setTaskDetail((prevTask) => ({
            ...prevTask,
            status: value,
        }));
    };

    const addComment = api.task.createComment.useMutation({
        onSuccess: async () => {
            toast.success("Comment added")
            await getComments.refetch();
            setComment('');
        },
        onError: () => {
            toast.error("Error adding a new comment")
        }
    })

    const updateTask = api.task.updateTask.useMutation({
        onSuccess: async () => {
            toast.success('Task has been updated');
            await getTasksQuery.refetch();
        },
        onError: () => {
            toast.error('Some problem updating the task');
        },
    });

    const getComments = api.task.getCommentsForTask.useQuery({ taskId: taskDetail.id });
    const commentData = getComments.data ?? [];
    const saveTaskDetail = () => {
        updateTask.mutate({
            taskId: taskDetail.id,
            taskName: taskDetail.task_name,
            description: taskDetail.description,
            priority: taskDetail.priority,
            status: taskDetail.status,
        })
    }
    const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const addCommentButtonClick = () => {
        addComment.mutate({
            taskId: taskDetail.id,
            content: comment,
        })
    }

    return (
        <>
            <div className="flex justify-between pr-3 items-center">
                <p className="text-l">Task Detail</p>
                <Avatar>
                    <AvatarImage src={taskDetail.user.image ?? ''} />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            </div>

            <div className="flex">
                <Input value={taskDetail.task_name} onChange={handleTaskDescription} className="border-0 shadow-none focus:border-1" />
                <Select name='status' onValueChange={onStatusChange} value={taskDetail.status}>
                    <SelectTrigger className='w-[150px] border-0 shadow-none ml-10'>
                        <SelectValue placeholder='Priority' />
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map((option, i) => (
                            <SelectItem key={i} value={option.value}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Textarea id="description" value={taskDetail.description} onChange={handleDescriptionChange} className="h-32 border-0 shadow-none focus:border-1" />
            <div className="flex justify-between mb-5">
            <Select name='priority' onValueChange={onSelectChange} value={taskDetail.priority}>
                <SelectTrigger className='w-[100px]'>
                    <SelectValue placeholder='Priority' />
                </SelectTrigger>
                <SelectContent>
                    {priorityOptions.map((option, i) => (
                        <SelectItem key={i} value={option.value}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
                <Button onClick={saveTaskDetail}>Save Changes</Button>
            </div>

            <div>
                <p className="text-bold mb-3">Comments</p>
                <div className="flex">
                    <Input value={comment} onChange={handleCommentInputChange} />
                    <Button onClick={addCommentButtonClick} className="ml-3">Add Comment</Button>
                </div>
                <div className="mt-5 inline-block">
                    {commentData.map((comment, i) => (
                        <div key={i} className="flex my-2">
                            <Avatar>
                                <AvatarImage src={comment.user.image ?? ''} />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <p className="text-md rounded-md p-2 bg-secondary ml-3">{comment.content}</p>

                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
export default TaskDetail;