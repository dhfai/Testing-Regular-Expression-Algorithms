import { prisma } from '../db/prisma';

interface LoginResult {
    success: boolean;
    message: string;
    nasabah?: {
        id: string;
        name: string;
        accountNo: string;
        balance: number;
    };
}

async function login(accountNo: string, password: string): Promise<LoginResult> {
    const nasabah = await prisma.nasabah.findUnique({
        where: { accountNo },
    });

    if (!nasabah) {
        return { success: false, message: 'Account not found' };
    }

    if (nasabah.password !== password) {
        return { success: false, message: 'Incorrect password' };
    }

    return { 
        success: true, 
        message: 'Login successful',
        nasabah: {
        id: nasabah.id,
        name: nasabah.name,
        accountNo: nasabah.accountNo,
        balance: nasabah.balance,
        }
    };
}

export { login };
