import { Router } from 'express';
import healthRouter from './health';
import echoRouter from './echo';

const router = Router();

// Mount route handlers
router.use('/health', healthRouter);
router.use('/echo', echoRouter);

// Future API routes will be added here
// router.use('/users', userRouter);
// router.use('/contacts', contactRouter);
// etc.

export default router;
