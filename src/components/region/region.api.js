import { Router } from 'express';
import { isAuth } from '../../middleware/isAuth.middleware.js';
import { getRegionsController } from './region.controller.js';

const router = Router();

// 1. GET ALL REGIONS - EVERYONE
router.get('/regions', getRegionsController)

export default router;