/*
  Warnings:

  - You are about to drop the `GuriaTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Guria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Made the column `imageUrl` on table `News` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GuriaTag" DROP CONSTRAINT "GuriaTag_guriaId_fkey";

-- DropForeignKey
ALTER TABLE "GuriaTag" DROP CONSTRAINT "GuriaTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Guria" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "News" ALTER COLUMN "imageUrl" SET NOT NULL;

-- DropTable
DROP TABLE "GuriaTag";

-- CreateTable
CREATE TABLE "GuriaTags" (
    "id" SERIAL NOT NULL,
    "guriaId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "GuriaTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuriaTags_guriaId_tagId_key" ON "GuriaTags"("guriaId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Guria_name_key" ON "Guria"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "GuriaTags" ADD CONSTRAINT "GuriaTags_guriaId_fkey" FOREIGN KEY ("guriaId") REFERENCES "Guria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuriaTags" ADD CONSTRAINT "GuriaTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
