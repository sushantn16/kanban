import type {TaskResponse}  from "~/app/quest/[id]/page";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Badge } from "./badge";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./dialog";
import { Button } from "./button";
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
                        <DialogContent>
                            <TaskDetail task={task} id={id}/>
                            
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </>
    );
};

export default TaskItem;
