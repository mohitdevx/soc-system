/*
  Warnings:

  - You are about to drop the column `description` on the `organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactName` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "description",
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
