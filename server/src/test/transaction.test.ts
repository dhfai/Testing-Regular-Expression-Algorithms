import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const prisma = new PrismaClient();

beforeAll(async () => {
  await execPromise('npx prisma migrate reset --force');
  await execPromise('npx prisma db seed');
}, 20000);

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Transaction Tests', () => {
  test('successful transfer', async () => {
    const sender = await prisma.nasabah.findUnique({ where: { norekening: '12345' } });
    const receiver = await prisma.nasabah.findUnique({ where: { norekening: '67890' } });

    await prisma.$transaction(async (prisma) => {
      await prisma.nasabah.update({
        where: { norekening: sender?.norekening },
        data: { saldo: sender?.saldo! - 100 },
      });

      await prisma.nasabah.update({
        where: { norekening: receiver?.norekening },
        data: { saldo: receiver?.saldo! + 100 },
      });
    });

    const updatedSender = await prisma.nasabah.findUnique({ where: { norekening: '12345' } });
    const updatedReceiver = await prisma.nasabah.findUnique({ where: { norekening: '67890' } });

    expect(updatedSender).not.toBeNull();
    expect(updatedReceiver).not.toBeNull();

    if (updatedSender && updatedReceiver) {
      expect(updatedSender.saldo).toBe(900);
      expect(updatedReceiver.saldo).toBe(600);
    }
  }, 20000);

  test('failed transfer due to insufficient balance', async () => {
    const sender = await prisma.nasabah.findUnique({ where: { norekening: '54321' } });
    const receiver = await prisma.nasabah.findUnique({ where: { norekening: '09876' } });

    try {
      await prisma.$transaction(async (prisma) => {
        if (sender!.saldo < 100) {
          throw new Error('Insufficient balance');
        }

        await prisma.nasabah.update({
          where: { norekening: sender?.norekening },
          data: { saldo: sender?.saldo! - 100 },
        });

        await prisma.nasabah.update({
          where: { norekening: receiver?.norekening },
          data: { saldo: receiver?.saldo! + 100 },
        });
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const updatedSender = await prisma.nasabah.findUnique({ where: { norekening: '54321' } });
    const updatedReceiver = await prisma.nasabah.findUnique({ where: { norekening: '09876' } });

    expect(updatedSender).not.toBeNull();
    expect(updatedReceiver).not.toBeNull();

    if (updatedSender && updatedReceiver) {
      expect(updatedSender.saldo).toBe(50);
      expect(updatedReceiver.saldo).toBe(300);
    }
  }, 20000);
});
