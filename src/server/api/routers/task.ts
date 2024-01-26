import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({

    createTask: protectedProcedure
        .input(
            z.object({
                projectId: z.number(),
                taskName: z.string(),
                description: z.string(),
                priority: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const createdTask = await ctx.db.task.create({
                data: {
                    task_name: input.taskName,
                    description: input.description,
                    priority: input.priority,
                    status: "todo",
                    project: { connect: { id: input.projectId } },
                    user: { connect: { id: ctx.session.user.id } },
                },
            });
            return createdTask;
        }),

    updateTask: protectedProcedure
        .input(
            z.object({
                taskId: z.number(),
                taskName: z.string(),
                description: z.string().optional(),
                priority: z.string().optional(),
                status:z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const updatedTask = await ctx.db.task.update({
                where: { id: input.taskId },
                data: {
                    task_name: input.taskName,
                    description: input.description,
                    priority: input.priority,
                    status: input.status
                },
            });

            return updatedTask;
        }),

    updateTaskStatus: protectedProcedure
        .input(z.object({ taskId: z.number(), status: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const updatedTask = await ctx.db.task.update({
                where: { id: input.taskId },
                data: { status: input.status },
            });

            return updatedTask;
        }),

});
