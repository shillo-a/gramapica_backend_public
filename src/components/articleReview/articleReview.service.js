import { putArticleReviewDal } from "./articleReview.dal.js";

// 1.
export const putArticleReviewService = async (articleId, userId, articleReview) => {
    const updatedArticleReview = await putArticleReviewDal(articleId, userId, articleReview);
    return updatedArticleReview;
}