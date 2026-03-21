/*
  Warnings:

  - The primary key for the `org_admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `org_admins` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "org_admins" DROP CONSTRAINT "org_admins_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "org_admins_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "org_admins_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "org_admins_id_key" ON "org_admins"("id");
