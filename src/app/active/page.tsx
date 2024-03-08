import { api } from "~/trpc/server";
import TaskView from "~/components/taskView";

const ActiveTasks = async () => {
    const activeTasks = await api.task.getTasksForUser.query({ done: false });
    return (
        <>
            <p className="text-2xl font-bold mb-5">Active Tasks</p>
            <div className="flex flex-col gap-3 mt-3">
                {activeTasks.map((task) => (
                    <TaskView key={task.id} task={task}/>
                ))}
            </div>
        </>
    )
}
export default ActiveTasks;