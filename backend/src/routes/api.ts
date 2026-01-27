import { Router } from 'express';
import healthRouter from './health';

const router = Router();

// Mount route handlers
router.use('/health', healthRouter);

// Future API routes will be added here
// router.use('/users', userRouter);
// router.use('/contacts', contactRouter);
// etc.

export default router;
