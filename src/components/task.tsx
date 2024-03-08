'use client';
import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Textarea } from '~/components/ui/textarea';
import { Label } from "~/components/ui/label";
import { api } from '~/trpc/react';
import { toast } from 'sonner';
import { dialogClose } from './ui/dialog';

interface Task {
    name: string;
    description: string;
    priority: string;
    status: string;
}

interface TaskProps {
    projectId: number;
}

export const priorityOptions = [
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' },
];

const Task: React.FC<TaskProps> = ({ projectId }) => {
    const initialTaskState: Task = {
        name: '',
        description: '',
        priority: 'medium',
        status: 'todo',
    };



    const [task, setTask] = useState<Task>(initialTaskState);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTask(initialTaskState);
        createTask.mutate({
            projectId: Number(projectId),
            taskName: task.name,
            description: task.description,
            priority: task.priority,
        });
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const getTasksQuery = api.project.getTasksForProject.useQuery({ projectId: Number(projectId) });
    const createTask = api.task.createTask.useMutation({
        onSuccess: async () => {
            toast.success('A new task has been added');
            dialogClose();
            await getTasksQuery.refetch();
        },
        onError: () => {
            toast.error('Some problem adding a task');
        },
    });

    const onSelectChange = (value: string) => {
        setTask((prevTask) => ({
            ...prevTask,
            priority: value,
        }));
    };

    return (
        <form className='flex flex-col gap-3' onSubmit={handleFormSubmit}>
            <>
                <Label htmlFor='name'>Give a name to your task</Label>
                <Input
                    name='name'
                    onChange={handleValueChange}
                    value={task.name}
                    required
                />
            </>
            <>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                    className='h-32'
                    name='description'
                    onChange={handleValueChange}
                    value={task.description}
                />
            </>

            <>
                <Select name='priority' onValueChange={onSelectChange} value={task.priority}>
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
            </>
            <Button>Create task</Button>
        </form>
    );
};

export default Task;
