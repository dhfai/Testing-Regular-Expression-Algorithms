import {prisma} from '../db/prisma';

interface TransactionResult {
  success: boolean;
  message: string;
  details?: string;
}

const ADMIN_FEE = 2500;

async function transferFunds(fromAccountNo: string, toAccountNo: string, amount: number, fromBank: string, toBank: string): Promise<TransactionResult> {
  try {
    console.log('Starting transaction...');
    
    const transaction = await prisma.$transaction(async (prisma) => {
      const from = await prisma.nasabah.findUnique({ where: { accountNo: fromAccountNo } });
      const to = await prisma.nasabah.findUnique({ where: { accountNo: toAccountNo } });

      if (!from || !to) {
        throw new Error('Account not found');
      }

      let totalAmount = amount;
      if (fromBank !== toBank) {
        totalAmount += ADMIN_FEE;
      }

      if (from.balance < totalAmount) {
        throw new Error('Insufficient funds');
      }

      console.log(`Transferring ${amount} from ${from.name} to ${to.name}...`);
      
      await prisma.nasabah.update({
        where: { accountNo: fromAccountNo },
        data: { balance: from.balance - totalAmount },
      });

      await prisma.nasabah.update({
        where: { accountNo: toAccountNo },
        data: { balance: to.balance + amount },
      });

      console.log('Transaction successful!');
      return { success: true, message: `Transfer successful from ${from.name} to ${to.name}. Admin fee: ${fromBank !== toBank ? ADMIN_FEE : 0}` };
    });

    return transaction;
  } catch (err: unknown) {
    let errorMessage = 'An unknown error occurred';
    let details = '';
    if (err instanceof Error) {
      errorMessage = err.message;
      details = `Rollback reason: ${err.message}`;
    }
    console.log('Transaction failed! Rolling back...');
    console.log(details);
    return { success: false, message: `Transfer failed: ${errorMessage}`, details };
  }
}

export { transferFunds };
