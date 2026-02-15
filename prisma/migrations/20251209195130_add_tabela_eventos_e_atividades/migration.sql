-- CreateTable
CREATE TABLE "EventosAtividades" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT,
    "showOnHomepage" BOOLEAN NOT NULL DEFAULT false,
    "details" JSONB,

    CONSTRAINT "EventosAtividades_pkey" PRIMARY KEY ("id")
);
