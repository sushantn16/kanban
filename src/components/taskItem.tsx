import { TaskResponse } from "~/app/exports/interfaces";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Badge } from "./ui/badge";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import TaskDetail from "./taskDetail";

interface TaskItemProps {
    task: TaskResponse;
    id: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, id }) => {
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>{task.task_name}</CardTitle>
                    <Badge>{task.priority}</Badge>
                </CardHeader>
                <CardContent>
                    <CardDescription>{task.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Dialog>
                        <DialogTrigger>
                            <Button>Details</Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-[800px]">
                            <TaskDetail task={task} id={id}/>
                            
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </>
    );
};

export default TaskItem;
