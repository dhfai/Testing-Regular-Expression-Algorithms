import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nasabah1 = await prisma.nasabah.create({
    data: {
      name: 'Nasabah 1',
      accountNo: '1234567890',
      balance: 10000000,
      password: 'password123',
    },
  });

  const nasabah2 = await prisma.nasabah.create({
    data: {
      name: 'Nasabah 2',
      accountNo: '0987654321',
      balance: 2000,
      password: 'password456',
    },
  });

  console.log({ nasabah1, nasabah2 });
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
