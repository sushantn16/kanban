import { Label } from "./label";
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

interface TaskDetailProps {
    task: TaskResponse;
    id: number;
}
const TaskDetail: React.FC<TaskDetailProps> = ({ task, id }) => {

    const [taskDetail, setTaskDetail] = useState(task);

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

    const updateTask = api.task.updateTask.useMutation({
        onSuccess: async () => {
            toast.success('Task has been updated');
            await getTasksQuery.refetch();
        },
        onError: () => {
            toast.error('Some problem updating the task');
        },
    });
    const saveTaskDetail = () => {
        updateTask.mutate({
            taskId: taskDetail.id,
            taskName: taskDetail.task_name,
            description: taskDetail.description,
            priority: taskDetail.priority,
            status: taskDetail.status,
        })
    }

    return (
        <>
            <p className="text-l">Task Detail</p>
            <Input value={taskDetail.task_name} onChange={handleTaskDescription} />
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" className="h-32" value={taskDetail.description} onChange={handleDescriptionChange} />

            <div className="flex justify-between">
                <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select name='priority' onValueChange={onSelectChange} value={taskDetail.priority}>
                        <SelectTrigger className='w-[180px]'>
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
                </div>
                <div>
                    <Label htmlFor="staatus">Status</Label>
                    <Select name='status' onValueChange={onStatusChange} value={taskDetail.status}>
                        <SelectTrigger className='w-[180px]'>
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
            </div>
            <Button onClick={saveTaskDetail}>Save Changes</Button>
        </>
    )
}
export default TaskDetail;