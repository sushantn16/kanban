/*
  Warnings:

  - You are about to drop the column `project_name` on the `Project` table. All the data in the column will be lost.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "project_name",
ADD COLUMN     "name" TEXT NOT NULL;
