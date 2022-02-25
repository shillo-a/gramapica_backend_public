import { Router } from 'express';
import { isAuth } from '../../middleware/isAuth.middleware.js';

import { putArticleReviewController } from './articleReview.controller.js';

const router = Router();

// 1. CHANGE OR UPDATE 
router.put('/article-reviews/articles/:articleId',
    isAuth,
    putArticleReviewController
) 

export default router;