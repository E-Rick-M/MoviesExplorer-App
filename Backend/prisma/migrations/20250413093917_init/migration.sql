-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT 'https://f.woowoowoowoo.net/resize/250x400/53/f0/53f0f760ace03483b4d873ebfce3a360/53f0f760ace03483b4d873ebfce3a360.jpg',
    "description" TEXT,
    "category" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Movie" ("category", "createdAt", "deletedAt", "description", "id", "isFavorite", "releaseDate", "title", "updatedAt") SELECT "category", "createdAt", "deletedAt", "description", "id", "isFavorite", "releaseDate", "title", "updatedAt" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
