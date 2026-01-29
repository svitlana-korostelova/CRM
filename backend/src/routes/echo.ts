import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/echo - receive mock data from mobile, log it, return it
router.post('/', (req: Request, res: Response) => {
  const data = req.body;
  console.log('📱 Received from mobile:', JSON.stringify(data, null, 2));
  res.status(200).json({
    received: data,
    serverTime: new Date().toISOString(),
    message: 'Backend got your data!',
  });
});

export default router;
