import { 
    deletePublishedArticleCommentDal, 
    getPublishedArticleCommentsDal, 
    getPublishedArticleNewCommentsDal, 
    getPublishedArticleUserCommentsDal, 
    postPublishedArticleCommentDal, 
    putPublishedArticleCommentDal 
} from "./comment.dal.js";

// 1.
export const getPublishedArticleCommentsService = async (articleId) => {
    const publishedArticleComments = await getPublishedArticleCommentsDal(articleId);
    return publishedArticleComments;
}

// 2.
export const getPublishedArticleNewCommentsService = async (articleId, lastUpdatedAt) => {
    const publishedArticleNewComments = await getPublishedArticleNewCommentsDal(articleId, lastUpdatedAt);
    return publishedArticleNewComments;
}

// 3.
export const getPublishedArticleUserCommentsService = async (userKey) => {
    const publishedArticleUserComments = await getPublishedArticleUserCommentsDal(userKey);
    return publishedArticleUserComments;
}

// 4.
export const postPublishedArticleCommentService = async (articleId, userId, comment) => {
    const postedPublishedArticleComment = await postPublishedArticleCommentDal(articleId, userId, comment);
    return postedPublishedArticleComment;
}

// 5.
export const putPublishedArticleCommentService = async (commentId, comment) => {
    const updatedPublishedArticleCommentId = await putPublishedArticleCommentDal(commentId, comment);
    return updatedPublishedArticleCommentId;
}

// 6.
export const deletePublishedArticleCommentService = async (commentId) => {
    const deletedPublishedArticleCommentId = await deletePublishedArticleCommentDal(commentId);
    return deletedPublishedArticleCommentId;
}