import { api } from "~/trpc/server";

const ActiveTasks = async () => {
    const activeTasks = await (api.task.getTasksForUser.query({}));
    console.log(activeTasks);
    return (
        <>
        <div>
            {activeTasks.map((task:any)=>(
                <p>{task.task_name}</p>
            ))}
        </div>
        </>
    )
}
export default ActiveTasks;