import { TaskResponse } from "~/app/quest/[id]/page";
import {
    Card,
    CardDescription,
    CardTitle,
} from "~/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "~/components/ui/dialog";
import TaskDetail from "./taskDetail";

interface TaskTileProps {
    task: TaskResponse
}

const TaskTile: React.FC<TaskTileProps> = ({ task }) => {
    return (
        <Dialog>
            <DialogTrigger className="text-left">
                <Card className="p-4" key={task.id}>
                    <CardTitle>{task.task_name}</CardTitle>
                    <div>
                        <CardDescription>{task.description}</CardDescription>
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <TaskDetail task={task} id={task.project_id}/>
            </DialogContent>
        </Dialog>
    )
}
export default TaskTile;