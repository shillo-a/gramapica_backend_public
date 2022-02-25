import { changeObjectKeyName } from "../../functions/changeObjectKeyName.js";
import { convertToCamelCase } from "../../functions/convertToCamelCase.js";
import { 
    getDraftArticleDal, 
    postDraftArticleDal,
    getDraftArticlesDal,
    deleteDraftArticleDal,
    putDraftArticleDal,
    postDraftArticleSectionDal,
    deleteDraftArticleSectionDal,
    putDraftArticleStatusDal,
    getUserArticlesDal,
    putDraftArticleTagsDal,
    getUserPublishedArticlesDal,
    getUserArticleDal,
    getArticleOptionsDal,
    putDraftArticleRegionsDal,
    putUserArticleStatusDal,
    deleteUserArticleDal,
    getFavoriteArticlesDal,
    getPublishedArticleDal,
    getNewestPublishedArticlesDal,
    getNewestPublishedArticlesTotalPagesDal,
    getPopularPublishedArticlesDal,
    getPopularPublishedArticlesTotalPagesDal
} from "./article.dal.js";

// 1.
export const getDraftArticleService = async (articleId) => {
    const draftArticle = await getDraftArticleDal(articleId); 
    const draftArticle_output = draftArticle.toJSON();
    return draftArticle_output;
}

// 2.
export const postDraftArticleService = async (userId) => {
    const draftArticle = await postDraftArticleDal(userId);
    return draftArticle;
}

// 3.
export const deleteDraftArticleService = async (articleId) => {
    const draftArticleId = await deleteDraftArticleDal(articleId);
    // const draftArticle_output = draftArticle.toJSON();
    return draftArticleId;
}

// 4.
export const getDraftArticlesService = async (userId) => {
    const draftArticles = await getDraftArticlesDal(userId);
    return draftArticles;
}

// 5.
export const putDraftArticleService = async (articleId, article) => {
    const draftArticle = await putDraftArticleDal(articleId, article);
    return draftArticle;
}

// 6.
export const postDraftArticleSectionService = async (articleId, typeName, orderNum) => {
    const draftArticleSection = await postDraftArticleSectionDal(articleId, typeName, orderNum);
    const draftArticleSection_output = draftArticleSection.toJSON();
    return draftArticleSection_output;
}

// 7.
export const deleteDraftArticleSectionService = async (sectionId) => {
    const draftArticleSectionId = await deleteDraftArticleSectionDal(sectionId);
    return draftArticleSectionId;
}

// 8.
export const putDraftArticleStatusService = async (articleId, statusName) => {
    const draftArticleId = await putDraftArticleStatusDal(articleId, statusName);
    return draftArticleId;
}

// 9.
export const getUserArticlesService = async (userId) => {
    const userArticles = await getUserArticlesDal(userId);
    return userArticles;
}

// 10.
export const putDraftArticleTagsService = async (articleId, tags) => {
    const draftArticleTags = await putDraftArticleTagsDal(articleId, tags);
    return draftArticleTags;
}

// 11.
export const getUserPublishedArticlesService = async (userKey) => {
    const userPublishedArticles = await getUserPublishedArticlesDal(userKey);
    return userPublishedArticles;
}

// 12.
export const getUserArticleService = async (articleId) => {
    const userArticle = await getUserArticleDal(articleId); 
    return userArticle;
}

// 13.
export const getArticleOptionsService = async (articleId) => {
    const articleOptions = await getArticleOptionsDal(articleId); 
    return articleOptions;
}

// 14.
export const putDraftArticleRegionsService = async (articleId, regions) => {
    const draftArticleRegions = await putDraftArticleRegionsDal(articleId, regions);
    return draftArticleRegions;
}

// 15.
export const putUserArticleStatusService = async (articleId, statusName) => {
    const userArticleId = await putUserArticleStatusDal(articleId, statusName);
    return userArticleId;
}

// 16.
export const deleteUserArticleService = async (articleId) => {
    const userArticleId = await deleteUserArticleDal(articleId);
    return userArticleId;
}

// 17.
export const getFavoriteArticlesService = async (userId) => {
    const favoriteArticles = await getFavoriteArticlesDal(userId);
    return favoriteArticles;
}

// 18.
export const getPublishedArticleService = async (articleId) => {
    const publishedArticle = await getPublishedArticleDal(articleId); 
    return publishedArticle;
}

// 19.
export const getNewestPublishedArticlesService = async (pageNum, regionName) => {
    const newestPublishedArticles = await getNewestPublishedArticlesDal(pageNum, regionName); 
    return newestPublishedArticles;
}

// 20.
export const getNewestPublishedArticlesTotalPagesService = async (regionName) => {
    const newestPublishedArticlesTotalPages = await getNewestPublishedArticlesTotalPagesDal(regionName); 
    return newestPublishedArticlesTotalPages;
}

// 21.
export const getPopularPublishedArticlesService = async (pageNum, regionName, timePeriod) => {
    const popularPublishedArticles = await getPopularPublishedArticlesDal(pageNum, regionName, timePeriod); 
    return popularPublishedArticles;
}

// 22. 
export const getPopularPublishedArticlesTotalPagesService = async (regionName) => {
    const popularPublishedArticlesTotalPages = await getPopularPublishedArticlesTotalPagesDal(regionName); 
    return popularPublishedArticlesTotalPages;
}

//При необходжимости здесь выбрасываем (throw!!!) ошибки связанные с Services