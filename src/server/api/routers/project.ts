import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(z.object({ projectName: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.projectName,
          users: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      where: { users: { some: { id: ctx.session.user.id } } },
    });
  }),

  getTasksForProject: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.task.findMany({
        where: { project: { id: input.projectId } },
        include: { user: true }
      });
    }),

  addUserToProject: protectedProcedure
    .input(z.object({ projectId: z.number(), userEmail: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId, users: { some: { id: ctx.session.user.id } } },
      });
      if (!project) {
        throw new Error("Permission denied. Project not found or user does not have access.");
      }
      const userToAdd = await ctx.db.user.findUnique({
        where: { email: input.userEmail },
      });
      if (!userToAdd) {
        throw new Error(`User with email ${input.userEmail} not found.`);
      }
      // Add the user to the project
      await ctx.db.project.update({
        where: { id: input.projectId },
        data: {
          users: {
            connect: [{ id: userToAdd.id }],
          },
        },
      });
      return `User ${input.userEmail} added to the project successfully.`;
    }),
});
