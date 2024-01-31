import { api } from "~/trpc/server";

const CompeletedTasks = async () => {
    const activeTasks = await (api.task.getTasksForUser.query({done:true}));
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
export default CompeletedTasks;