import express from 'express';

import transferRoutes from './routes/transfer';
import nasabahRoutes from './routes/nasabah';
import path from 'path';

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', transferRoutes);
app.use('/api', nasabahRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
