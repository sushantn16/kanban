import type { TaskResponse } from "~/app/quest/[id]/page";
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
import Link from "next/link";
import { Badge } from "./badge";

interface TaskTileProps {
    task: TaskResponse
}

const TaskTile: React.FC<TaskTileProps> = ({ task }) => {
    return (
        <Dialog>
            <DialogTrigger className="text-left">
                <Card className="p-3" key={task.id}>
                    <div className="flex justify-between items-center">
                    <CardTitle>{task.task_name}</CardTitle>
                    <Badge>{task.priority}</Badge>
                    </div>
                    <CardDescription className="flex justify-between items-center mt-2">
                        <p>{task.description}</p>
                        <Link href={`/quest/${task.project.id}`}>Go to Quest</Link>
                    </CardDescription>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <TaskDetail task={task} id={task.project_id} />
            </DialogContent>
        </Dialog>
    )
}
export default TaskTile;