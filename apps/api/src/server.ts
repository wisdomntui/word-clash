import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/health', (_req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok',
    service: 'word-clash-api',
  });
});

app.listen(port, () => {
  console.log(`Word Clash API running at http://localhost:${port}`);
});
