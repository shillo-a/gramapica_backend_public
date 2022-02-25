import { Router } from 'express';
import { getTagsController } from './tag.controller.js';


const router = Router();

// 1. GET ALL TAGS - EVERYONE
router.get('/tags', getTagsController)

export default router;