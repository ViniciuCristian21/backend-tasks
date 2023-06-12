-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
