import { api } from "~/trpc/server";
import {
    Card,
    CardDescription,
    CardTitle,
} from "~/components/ui/card"

const ActiveTasks = async () => {
    const activeTasks = await (api.task.getTasksForUser.query({}));
    return (
        <>
            <p>Active Tasks</p>
            <div className="flex flex-col gap-3">
                {activeTasks.map((task) => (
                    <Card className="p-4 w-1/2" key={task.id}>
                        <CardTitle>{task.task_name}</CardTitle>
                        <div>
                            <CardDescription>{task.description}</CardDescription>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}
export default ActiveTasks;