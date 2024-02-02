import TaskView from "~/components/ui/taskView";
import { api } from "~/trpc/server";

const CompeletedTasks = async () => {
    const activeTasks = await (api.task.getTasksForUser.query({ done: true }));
    return (
        <>
            <p className="text-2xl font-bold mb-5">Compeleted Tasks</p>
            <div className="flex flex-col gap-3">
                {activeTasks.map((task) => (
                    <TaskView task={task} />
                ))}
            </div>
        </>
    )
}
export default CompeletedTasks;