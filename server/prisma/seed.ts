// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.nasabah.deleteMany({});
  
  await prisma.nasabah.createMany({
    data: [
      {
        nama: 'Alice',
        norekening: '12345',
        saldo: 1000,
        password: 'secret',
      },
      {
        nama: 'Bob',
        norekening: '67890',
        saldo: 500,
        password: 'secret',
      },
      {
        nama: 'Charlie',
        norekening: '54321',
        saldo: 50,
        password: 'secret',
      },
      {
        nama: 'David',
        norekening: '09876',
        saldo: 300,
        password: 'secret',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
