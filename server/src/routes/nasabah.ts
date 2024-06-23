import { Router } from 'express';
import {prisma} from '../db/prisma';

const router = Router();

router.get('/nasabah/:accountNo', async (req, res) => {
  const { accountNo } = req.params;
  try {
    const nasabah = await prisma.nasabah.findUnique({
      where: { accountNo },
      include: { mutasi: true },
    });
    if (!nasabah) {
      return res.status(404).json({ message: 'Nasabah not found' });
    }
    res.json(nasabah);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
