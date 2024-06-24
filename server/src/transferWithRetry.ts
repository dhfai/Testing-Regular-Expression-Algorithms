import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const transferWithRetry = async (senderAccount: string, receiverAccount: string, amount: number, retries: number = 5) => {
  let attempt = 0;
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  while (attempt < retries) {
    try {
      await prisma.$transaction(async (prisma) => {
        const sender = await prisma.nasabah.findUnique({ where: { norekening: senderAccount } });
        const receiver = await prisma.nasabah.findUnique({ where: { norekening: receiverAccount } });

        if (!sender) {
          throw new Error('Sender account not found');
        }
        if (!receiver) {
          throw new Error('Receiver account not found');
        }
        if (sender.saldo < amount) {
          throw new Error('Insufficient balance');
        }

        await prisma.nasabah.update({
          where: { norekening: senderAccount },
          data: { saldo: sender.saldo - amount },
        });

        await prisma.nasabah.update({
          where: { norekening: receiverAccount },
          data: { saldo: receiver.saldo + amount },
        });
      });

      return { success: true };
    } catch (error) {
      if (error === 'Insufficient balance') {
        throw error;
      }

      console.error(`Transaction attempt ${attempt + 1} failed: ${error}`);
      attempt += 1;
      await delay(2 ** attempt * 100);
    }
  }

  throw new Error('Transaction failed after maximum retries');
};

export default transferWithRetry;
