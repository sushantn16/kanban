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
                status: z.string().optional(),
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

    getTasksForUser: protectedProcedure
        .input(z.object({ done: z.boolean().optional() }))
        .query(async ({ ctx, input }) => {
            const whereCondition: {
                user_id: string;
                status?: string | { not: string };
            } = {
                user_id: ctx.session.user.id,
            };

            if (input.done !== undefined) {
                whereCondition.status = input.done ? 'done' : { not: 'done' };
            }

            const tasksForUser = await ctx.db.task.findMany({
                where: whereCondition,
                include: {
                    user: true,
                    project: true
                }
            });

            return tasksForUser;
        }),

    createComment: protectedProcedure
        .input(
            z.object({
                taskId: z.number(),
                content: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const createdComment = await ctx.db.comment.create({
                data: {
                    content: input.content,
                    task: { connect: { id: input.taskId } },
                    user: { connect: { id: ctx.session.user.id } },
                },
            });
            return createdComment;
        }),

    updateComment: protectedProcedure
        .input(
            z.object({
                commentId: z.number(),
                content: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const updatedComment = await ctx.db.comment.update({
                where: { id: input.commentId },
                data: {
                    content: input.content,
                },
            });

            return updatedComment;
        }),

    deleteComment: protectedProcedure
        .input(z.object({ commentId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const deletedComment = await ctx.db.comment.delete({
                where: { id: input.commentId },
            });

            return deletedComment;
        }),

    getCommentsForTask: protectedProcedure
        .input(
            z.object({
                taskId: z.number(),
            })
        )
        .query(async ({ ctx, input }) => {
            const commentsForTask = await ctx.db.comment.findMany({
                where: {
                    taskId: input.taskId,
                },
                include: {
                    user: true, // Include user information if needed
                },
                orderBy: {
                    createdAt: 'desc', // Sort by createdAt field in descending order
                },
            });
            return commentsForTask;
        }),

});
