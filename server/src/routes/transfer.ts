import { Router } from 'express';
import { transferFunds } from '../services/transactionService';
import { login } from '../services/nasabahService';

const router = Router();

router.post('/transfer-funds', async (req, res) => {
  const { fromAccountNo, toAccountNo, amount, fromBank, toBank } = req.body;
  const result = await transferFunds(fromAccountNo, toAccountNo, amount, fromBank, toBank);
  res.json(result);
});

router.post('/login', async (req, res) => {
  const { accountNo, password } = req.body;
  const result = await login(accountNo, password);
  res.json(result);
});

export default router;
