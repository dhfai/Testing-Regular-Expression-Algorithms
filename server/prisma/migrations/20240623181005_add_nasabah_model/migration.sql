-- CreateTable
CREATE TABLE "Nasabah" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mutasi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nasabahId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Mutasi_nasabahId_fkey" FOREIGN KEY ("nasabahId") REFERENCES "Nasabah" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Nasabah_accountNo_key" ON "Nasabah"("accountNo");
