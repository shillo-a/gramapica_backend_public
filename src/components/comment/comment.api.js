import { Router } from 'express';
import { isAuth } from '../../middleware/isAuth.middleware.js';
import { 
    deletePublishedArticleCommentController, 
    getPublishedArticleCommentsController, 
    getPublishedArticleNewCommentsController, 
    getPublishedArticleUserCommentsController, 
    postPublishedArticleCommentController, 
    putPublishedArticleCommentController
} from './comment.controller.js';

const router = Router();

// 1. GET ALL COMMENTS BY PUBLISHED ARTICLE ID - EVERYONE
router.get('/published-articles/:articleId/comments', getPublishedArticleCommentsController) 

// 2. GET ALL NEW COMMENTS BY PUBLISHED ARTICLE ID - EVERYONE (timestanp check)
router.get('/published-articles/:articleId/new-comments/:lastUpdatedAt', getPublishedArticleNewCommentsController)

// 3. GET ALL COMMENTS FOR PIBLISHED ARTICLES BY USER ID - EVERYONE
router.get('/published-articles/users/:userKey/comments', getPublishedArticleUserCommentsController)

// 4. POST COMMENT FOR PUBLISHED ARTICLE - AUTHORIZED
router.post('/published-articles/:articleId/comments', 
    isAuth,
    postPublishedArticleCommentController
) 

// 5. CHANGE COMMENT - OWNER
router.put('/published-articles/comments/:commentId', 
    isAuth,
    putPublishedArticleCommentController
)

// 6. DELETE COMMENT - OWNER
router.delete('/published-articles/comments/:commentId',
    isAuth,
    deletePublishedArticleCommentController
)

export default router;