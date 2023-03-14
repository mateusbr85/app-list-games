-- CreateTable
CREATE TABLE "announcement" (
    "announcement_id" TEXT NOT NULL PRIMARY KEY,
    "game_fk_id" TEXT NOT NULL,
    "announcement_name" TEXT NOT NULL,
    "announcement_yers_paying" INTEGER NOT NULL,
    "announcement_discord" TEXT NOT NULL,
    "announcement_week_days" TEXT NOT NULL,
    "announcement_hour_start" INTEGER NOT NULL,
    "announcement_hour_end" INTEGER NOT NULL,
    "announcement_voice_channel" BOOLEAN NOT NULL,
    "announcement_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "announcement_game_fk_id_fkey" FOREIGN KEY ("game_fk_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
