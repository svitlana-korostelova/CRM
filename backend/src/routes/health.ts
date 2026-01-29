import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';

const router = Router();

const DB_CHECK_TIMEOUT_MS = 5000;

router.get('/', async (req: Request, res: Response) => {
  const base = {
    status: 'ok' as const,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  try {
    const dbCheck = prisma.$queryRaw`SELECT 1`;
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), DB_CHECK_TIMEOUT_MS)
    );
    await Promise.race([dbCheck, timeout]);

    res.status(200).json({ ...base, database: 'connected' });
  } catch (error) {
    const isTimeout = error instanceof Error && error.message === 'timeout';
    res.status(isTimeout ? 503 : 503).json({
      ...base,
      status: 'error',
      database: isTimeout ? 'timeout' : 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
