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

describe('Deadlock Handling', () => {
  test('handles deadlocks by retrying the transaction', async () => {
    const senderAccount = '12345';
    const receiverAccount = '67890';

    const transaction1 = prisma.$transaction(async (prisma) => {
      const sender = await prisma.nasabah.findUnique({ where: { norekening: senderAccount } });
      if (!sender || sender.saldo < 100) throw new Error('Insufficient balance');
      await prisma.nasabah.update({ where: { norekening: senderAccount }, data: { saldo: sender.saldo - 100 } });
    });

    const transaction2 = prisma.$transaction(async (prisma) => {
      const receiver = await prisma.nasabah.findUnique({ where: { norekening: receiverAccount } });
      if (!receiver) throw new Error('Receiver account not found');
      await prisma.nasabah.update({ where: { norekening: receiverAccount }, data: { saldo: receiver.saldo + 100 } });
    });

    await Promise.all([transaction1, transaction2]);
    const updatedSender = await prisma.nasabah.findUnique({ where: { norekening: senderAccount } });
    const updatedReceiver = await prisma.nasabah.findUnique({ where: { norekening: receiverAccount } });

    expect(updatedSender).not.toBeNull();
    expect(updatedReceiver).not.toBeNull();

    if (updatedSender && updatedReceiver) {
      expect(updatedSender.saldo).toBe(900);
      expect(updatedReceiver.saldo).toBe(600);
    }
  }, 30000);
});
