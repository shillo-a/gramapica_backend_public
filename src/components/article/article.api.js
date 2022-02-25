import { Router } from 'express';
import { isAuth } from '../../middleware/isAuth.middleware.js';

import { 
    postDraftArticleController,
    getDraftArticleController,
    getDraftArticlesController,
    deleteDraftArticleController,
    putDraftArticleController,
    postDraftArticleSectionController,
    deleteDraftArticleSectionController,
    putDraftArticleStatusController,
    getUserArticlesController,
    putDraftArticleTagsController,
    getUserPublishedArticlesController,
    getUserArticleController,
    getArticleOptionsController,
    putDraftArticleRegionsController,
    putUserArticleStatusController,
    deleteUserArticleController,
    getFavoriteArticles,
    getPublishedArticleController,
    getNewestPublishedArticlesController,
    getNewestPublishedArticlesTotalPagesController,
    getPopularPublishedArticlesController,
    getPopularPublishedArticlesTotalPagesController
} from './article.controller.js';

const router = Router();

// 1. GET DRAFT ARTICLE BY ID - OWNER
router.get('/draft-articles/:articleId',
    isAuth,
    getDraftArticleController
) 

// 2. POST DRAFT ARTICLE - AUTHORIZED
router.post('/draft-articles', 
    isAuth, 
    postDraftArticleController
)

// 3. DELETE DRAFT ARTICLE - OWNER
router.delete('/draft-articles/:articleId',
    isAuth,
    deleteDraftArticleController
)

// 4. GET ALL DRAFT ARTICLES - OWNER
router.get('/draft-articles', 
    isAuth,
    getDraftArticlesController
)

// 5. PUT DRAFT ARTICLE - OWNER
router.put('/draft-articles/:articleId',
    isAuth,
    putDraftArticleController
)

// 6. POST SECTION FOR DRAFT ARTICLE - OWNER (of draft article)
router.post('/draft-articles/:articleId/sections', 
    isAuth,
    postDraftArticleSectionController
)

// 7. DELETE SECTION FOR DRAFT ARTICLE - OWNER (of draft article)
router.delete('/draft-articles/:articleId/sections/:sectionId', 
    isAuth,
    deleteDraftArticleSectionController
)

// 8. CHANGE ARTICLE STATUS DRAFT --> MODERATION (ЛЮБОЙ ДРУГОЙ СТАТУС!!!) - OWNER
router.put('/draft-articles/:articleId/statuses/:statusName',
    isAuth,
    putDraftArticleStatusController
)

// 9. GET ALL USER ARTICLES (MODERATION, PUBLISHED, REJECTED) - OWNER
router.get('/user-articles',
    isAuth,
    getUserArticlesController
)

// 10. CHANGE TAGS FOR DRAFT ARTICLE  - OWNER (of draft article)
router.put('/draft-articles/:articleId/tags',
    isAuth,
    putDraftArticleTagsController
)

// 11. GET ALL PUBLISHED ARTICLES BY USER - EVERYONE
router.get('/published-articles/users/:userKey', getUserPublishedArticlesController)

// 12. GET ONE USER ARTICLE (MODERATION, PUBLISHED, REJECTED) - OWNER
router.get('/user-articles/:articleId',
    isAuth,
    getUserArticleController
)

// 13. GET PUBLICLY AVAILABLE INFORMATION ABOUT ARTICLE TABLE - EVERYONE
router.get('/options/articles/:articleId', getArticleOptionsController)

// 14. CHANGE REGIONS FOR DRAFT ARTICLE  - OWNER (of draft article)
router.put('/draft-articles/:articleId/regions',
    isAuth,
    putDraftArticleRegionsController
)

// 15. CHANGE ARTICLE STATUS (MODERATION, PUBLISHED, REJECTED) --> DRAFT -- OWNER
router.put('/user-articles/:articleId/statuses/:statusName',
    isAuth,
    putUserArticleStatusController
)

// 16. DELETE USER ARTICLE - OWNER
router.delete('/user-articles/:articleId',
    isAuth,
    deleteUserArticleController
)

// 17. GET ALL FAVORITES (PUBLISHED) ARTICLES - OWNER
router.get('/favorite-articles',
    isAuth,
    getFavoriteArticles
)

// 18. GET PUBLISHED ARTICLE BY ID - EVERYONE
// КАЖДЫЙ ВЫЗОВ ДОБАВЛЯЕТ +1 В ARTICLE_TOTAL - TOTAL_VIEWS
router.get('/published-articles/:articleId', getPublishedArticleController)

// 19. GET NEWEST PUBLISHED ARTICLES (wuth pagination) - EVERYONE
router.get('/newest-published-articles', getNewestPublishedArticlesController)

// 20. GET NEWEST PUBLISHED ARTICLES TOTAL PAGES - EVERYONE
router.get('/newest-published-articles-total-pages', getNewestPublishedArticlesTotalPagesController)

// 21. GET POPULAR (MOST POPULAR) PUBLISHED ARTICLES (wuth pagination) - EVERYONE
router.get('/popular-published-articles', getPopularPublishedArticlesController)

//22. GET POPULAR PUBLISHED ARTICLES TOTAL PAGES - EVERYONE

router.get('/popular-published-articles-total-pages', getPopularPublishedArticlesTotalPagesController)


//GET PUBLISHED ARTICLES (RECOMMENDED) - EVERYONE

export default router;