import { api } from "~/trpc/server";
import TaskView from "~/components/ui/taskView";

const ActiveTasks = async () => {
    const activeTasks = await (api.task.getTasksForUser.query({}));
    return (
        <>
            <p className="text-2xl font-bold mb-5">Active Tasks</p>
            <div className="flex flex-col gap-3 mt-3">
                {activeTasks.map((task) => (
                    <TaskView task={task}/>
                ))}
            </div>
        </>
    )
}
export default ActiveTasks;