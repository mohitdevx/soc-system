/*
  Warnings:

  - You are about to drop the column `change` on the `org_admins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "org_admins" DROP COLUMN "change";

-- CreateTable
CREATE TABLE "stream" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "stream" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stream_id_key" ON "stream"("id");

-- AddForeignKey
ALTER TABLE "stream" ADD CONSTRAINT "stream_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
