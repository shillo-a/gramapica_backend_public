import { 
    getDraftArticleService, 
    postDraftArticleService,
    getDraftArticlesService,
    deleteDraftArticleService,
    putDraftArticleService,
    postDraftArticleSectionService,
    deleteDraftArticleSectionService,
    putDraftArticleStatusService,
    getUserArticlesService,
    putDraftArticleTagsService,
    getUserPublishedArticlesService,
    getUserArticleService,
    getArticleOptionsService,
    putDraftArticleRegionsService,
    putUserArticleStatusService,
    deleteUserArticleService,
    getFavoriteArticlesService,
    getPublishedArticleService,
    getNewestPublishedArticlesService,
    getNewestPublishedArticlesTotalPagesService,
    getPopularPublishedArticlesService,
    getPopularPublishedArticlesTotalPagesService
} from "./article.service.js"

import { 
    deleteDraftArticleSectionValidation, 
    deleteDraftArticleValidation, 
    deleteUserArticleValidation, 
    getDraftArticleValidation, 
    getPublishedArticleValidation, 
    getUserArticleValidation, 
    getUserPublishedArticlesValidation, 
    postDraftArticleSectionValidation, 
    putDraftArticleRegionsValidation, 
    putDraftArticleStatusValidation, 
    putDraftArticleTagsValidation, 
    putDraftArticleValidation, 
    putUserArticleStatusValidation 
} from "./article.validation.js";

import { HttpError } from "../../errors/Errors.js";


// 1.
export const getDraftArticleController = async (req, res, next) => {

    const { articleId } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await getDraftArticleValidation(articleId, userId)
        const draftArticle = await getDraftArticleService(articleId);

        if(!draftArticle){
            throw new HttpError(400);
        }
        return res.status(200).json(draftArticle);

    } catch(err) {
        next(err)
    }

}

// 2.
export const postDraftArticleController = async (req, res, next) => {
    
    const { userId } = req;

    try {
        // сантитизация не требуется
        // валидация не требуется
        const draftArticle = await postDraftArticleService(userId);
        if(!draftArticle){
            throw new HttpError(400)
        }
        return res.status(201).json(draftArticle)

    } catch(err){
        next(err)
    }

}

// 3.
export const deleteDraftArticleController = async (req, res, next) => {

    const { articleId } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await deleteDraftArticleValidation(articleId, userId);
        const draftArticleId = await deleteDraftArticleService(articleId);

        if(!draftArticleId){
            throw new HttpError(400);
        }
        return res.status(200).json(draftArticleId);

    } catch(err) {
        next(err)
    }

}

// 4.
export const getDraftArticlesController = async (req, res, next) => {

    const { userId } = req;

    try{
        // санитизация не требуется
        // валидация не требуется
        const draftArticles = await getDraftArticlesService(userId);
        if(!draftArticles){
            throw new HttpError(400)
        }
        return res.status(200).json(draftArticles)

    } catch(err){
        next(err)
    }
    
}

// 5.
export const putDraftArticleController = async (req, res, next) => {

    const { articleId } = req.params;
    const { userId } = req;
    const { article } = req.body;

    try {
        // санитизация не требуется
        await putDraftArticleValidation(articleId, userId);
        const draftArticle = await putDraftArticleService(articleId, article);

        if(!draftArticle){
            throw new HttpError(400)
        }

        return res.status(200).json(draftArticle)

    } catch (err){
        next(err)
    }
    
}

// 6.
export const postDraftArticleSectionController = async (req, res, next) => {
    const { articleId } = req.params;
    const { userId } = req;
    const { typeName } = req.body;
    const { orderNum } = req.body;

    try {
        // санитизация не требуется
        await postDraftArticleSectionValidation(articleId, userId);
        const draftArticleSection = await postDraftArticleSectionService(articleId, typeName, orderNum);

        if(!draftArticleSection){
            throw new HttpError(400)
        }

        return res.status(200).json(draftArticleSection);
    } catch (err){
        next(err)
    }
}

// 7.
export const deleteDraftArticleSectionController = async (req, res, next) => {
    const { articleId } = req.params;
    const { sectionId } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await deleteDraftArticleSectionValidation(articleId, sectionId, userId);
        const draftArticleSectionId = await deleteDraftArticleSectionService(sectionId);
        
        if(!draftArticleSectionId){
            throw new HttpError(400)
        }

        return res.status(200).json(draftArticleSectionId);
    } catch (err){
        next(err)
    }
}

// 8.
export const putDraftArticleStatusController = async (req, res, next) => {
    const { articleId } = req.params;
    const { statusName } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await putDraftArticleStatusValidation(articleId, userId);
        const draftArticleId = await putDraftArticleStatusService(articleId, statusName);
        
        if(!draftArticleId){
            throw new HttpError(400)
        }

        return res.status(200).json(draftArticleId);
    } catch (err){
        next(err)
    }
}

// 9.
export const getUserArticlesController = async (req, res, next) => {

    const { userId } = req;
    try{
        // санитизация не требуется
        // валидация не требуется
        const userArticles = await getUserArticlesService(userId);
        if(!userArticles){
            throw new HttpError(400)
        }
        return res.status(200).json(userArticles)

    } catch(err){
        next(err)
    }

}

// 10.
export const putDraftArticleTagsController = async (req, res, next) => {
    const { articleId } = req.params;
    const { userId } = req;
    const { tags } = req.body;

    try {
        // санитизация не требуется
        await putDraftArticleTagsValidation(articleId, userId);
        const draftArticleTags = await putDraftArticleTagsService(articleId, tags);

        if(!draftArticleTags){
            throw new HttpError(400)
        }

        return res.status(200).json(draftArticleTags)

    } catch (err){
        next(err)
    }
    
}

// 11.
export const getUserPublishedArticlesController = async (req, res, next) => {
    const { userKey } = req.params;
    try{
        // санитизация не требуется
        await getUserPublishedArticlesValidation(userKey);

        const userPublishedArticles = await getUserPublishedArticlesService(userKey);
        if(!userPublishedArticles){
            throw new HttpError(400)
        }
        return res.status(200).json(userPublishedArticles)

    } catch(err){
        next(err)
    }
}

// 12.
export const getUserArticleController = async (req, res, next) => {

    const { articleId } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await getUserArticleValidation(articleId, userId)
        const userArticle = await getUserArticleService(articleId);

        if(!userArticle){
            throw new HttpError(400);
        }
        return res.status(200).json(userArticle);

    } catch(err) {
        next(err)
    }

}

// 13.
export const getArticleOptionsController = async (req, res, next) => {

    const { articleId } = req.params;

    try {

        // санитизация не требуется
        // валидация не требуется
        const articleOptions = await getArticleOptionsService(articleId);

        if(!articleOptions){
            throw new HttpError(400);
        }
        return res.status(200).json(articleOptions);

    } catch(err){
        next(err)
    }
}


// 14.
export const putDraftArticleRegionsController = async (req, res, next) => {

    const { articleId } = req.params;
    const { userId } = req;
    const { regions } = req.body;

    try {
        // санитизация не требуется
        await putDraftArticleRegionsValidation(articleId, userId);
        const draftArticleRegions = await putDraftArticleRegionsService(articleId, regions);

        if(!draftArticleRegions){
            throw new HttpError(400)
        }

        return res.status(200).json(draftArticleRegions)

    } catch (err){
        next(err)
    }

}

// 15.
export const putUserArticleStatusController = async (req, res, next) => {

    const { articleId } = req.params;
    const { statusName } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await putUserArticleStatusValidation(articleId, userId);
        const userArticleId = await putUserArticleStatusService(articleId, statusName);
        
        if(!userArticleId){
            throw new HttpError(400)
        }

        return res.status(200).json(userArticleId);
    } catch (err){
        next(err)
    }

}

// 16.
export const deleteUserArticleController = async (req, res, next) => {

    const { articleId } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await deleteUserArticleValidation(articleId, userId);
        const userArticleId = await deleteUserArticleService(articleId);

        if(!userArticleId){
            throw new HttpError(400);
        }
        return res.status(200).json(userArticleId);

    } catch(err) {
        next(err)
    }

}

// 17.
export const getFavoriteArticles = async (req, res, next) => {

    const { userId } = req;
    try{
        // санитизация не требуется
        // валидация не требуется
        const favoriteArticles = await getFavoriteArticlesService(userId);
        if(!favoriteArticles){
            throw new HttpError(400)
        }
        return res.status(200).json(favoriteArticles)

    } catch(err){
        next(err)
    }

}

// 18.
export const getPublishedArticleController = async (req, res, next) => {

    const { articleId } = req.params;

    try {
        // санитизация не требуется
        await getPublishedArticleValidation(articleId)
        const publishedArticle = await getPublishedArticleService(articleId);

        if(!publishedArticle){
            throw new HttpError(400);
        }
        return res.status(200).json(publishedArticle);

    } catch(err) {
        next(err)
    }

}

// 19.
export const getNewestPublishedArticlesController = async (req, res, next) => {

    const { pageNum, regionName } = req.query;

    try {
        // санитизация не требуется
        // валидация не требуется
        const newestPublishedArticles = await getNewestPublishedArticlesService(pageNum, regionName)

        if(!newestPublishedArticles){
            throw new HttpError(400);
        }
        return res.status(200).json(newestPublishedArticles);

    } catch(err) {
        next(err)
    }
   
}

// 20.
export const getNewestPublishedArticlesTotalPagesController = async (req, res, next) => {
    
    const { regionName } = req.query;
    
    try {
        // санитизация не требуется
        // валидация не требуется
        const newestPublishedArticlesTotalPages = await getNewestPublishedArticlesTotalPagesService(regionName)

        if(!newestPublishedArticlesTotalPages){
            throw new HttpError(400);
        }
        return res.status(200).json(newestPublishedArticlesTotalPages);

    } catch(err) {
        next(err)
    }
}

// 21.
export const getPopularPublishedArticlesController = async (req, res, next) => {

    const { pageNum, regionName, timePeriod } = req.query;

    try {
        // санитизация не требуется
        // валидация не требуется
        const popularPublishedArticles = await getPopularPublishedArticlesService(pageNum, regionName, timePeriod)

        if(!popularPublishedArticles){
            throw new HttpError(400);
        }
        return res.status(200).json(popularPublishedArticles);

    } catch(err) {
        next(err)
    }
    
}

// 22.
export const getPopularPublishedArticlesTotalPagesController = async (req, res, next) => {
 
    const { regionName } = req.query;

    try {
        // санитизация не требуется
        // валидация не требуется
        const popularPublishedArticlesTotalPages = await getPopularPublishedArticlesTotalPagesService(regionName)

        if(!popularPublishedArticlesTotalPages){
            throw new HttpError(400);
        }
        return res.status(200).json(popularPublishedArticlesTotalPages);

    } catch(err) {
        next(err)
    }

}

//Здесь выбрасываем ошибки (throw!!!) связанные с http (Controller)
//А также ловим все остальные ошибки этого компонента (Service и DAL) и передаем их в Express Error Handler