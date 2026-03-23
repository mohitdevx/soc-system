/*
  Warnings:

  - Added the required column `change` to the `org_admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "org_admins" ADD COLUMN     "change" TEXT NOT NULL;
