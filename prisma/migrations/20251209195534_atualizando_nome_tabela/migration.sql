/*
  Warnings:

  - You are about to drop the `EventosAtividades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EventosAtividades";

-- CreateTable
CREATE TABLE "EventsActivities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT,
    "showOnHomepage" BOOLEAN NOT NULL DEFAULT false,
    "details" JSONB,

    CONSTRAINT "EventsActivities_pkey" PRIMARY KEY ("id")
);
