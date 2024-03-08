import TaskView from "~/components/taskView";
import { api } from "~/trpc/server";

const CompeletedTasks = async () => {
    const activeTasks = await (api.task.getTasksForUser.query({ done: true }));
    return (
        <>
            <p className="text-2xl font-bold mb-5">Completed Tasks</p>
            <div className="flex flex-col gap-3">
                {activeTasks.map((task) => (
                    <TaskView key={task.id} task={task} />
                ))}
            </div>
        </>
    )
}
export default CompeletedTasks;