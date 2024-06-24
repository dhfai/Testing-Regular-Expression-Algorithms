-- CreateTable
CREATE TABLE "Nasabah" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "norekening" TEXT NOT NULL,
    "saldo" REAL NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Nasabah_norekening_key" ON "Nasabah"("norekening");
