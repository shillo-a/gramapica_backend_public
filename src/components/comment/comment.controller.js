import { HttpError } from "../../errors/Errors.js";
import { 
    deletePublishedArticleCommentService, 
    getPublishedArticleCommentsService, 
    getPublishedArticleNewCommentsService, 
    getPublishedArticleUserCommentsService, 
    postPublishedArticleCommentService, 
    putPublishedArticleCommentService 
} from "./comment.service.js";
import { 
    deletePublishedArticleCommentValidation, 
    getPublishedArticleCommentsValidation, 
    getPublishedArticleNewCommentsValidation, 
    getPublishedArticleUserCommentsValidation, 
    postPublishedArticleCommentValidation, 
    putPublishedArticleCommentValidation
} from "./comment.validation.js";

// 1.
export const getPublishedArticleCommentsController = async (req, res, next) => {

    const { articleId } = req.params;

    try {
        // санитизация не требуется
        await getPublishedArticleCommentsValidation(articleId)
        const publishedArticleComments = await getPublishedArticleCommentsService(articleId);

        if(!publishedArticleComments){
            throw new HttpError(400);
        }
        return res.status(200).json(publishedArticleComments);

    } catch(err) {
        next(err)
    }

}

// 2.
export const getPublishedArticleNewCommentsController = async (req, res, next) => {

    const { articleId, lastUpdatedAt } = req.params;
    try {
        // санитизация не требуется
        await getPublishedArticleNewCommentsValidation(articleId)
        const publishedArticleNewComments = await getPublishedArticleNewCommentsService(articleId, lastUpdatedAt);

        if(!publishedArticleNewComments){
            throw new HttpError(400);
        }
        return res.status(200).json(publishedArticleNewComments);

    } catch(err){
        next(err)
    }

}

// 3.
export const getPublishedArticleUserCommentsController = async (req, res, next) => {

    const { userKey } = req.params;
    try {
        // санитизация не требуется
        await getPublishedArticleUserCommentsValidation(userKey)
        const publishedArticleUserComments = await getPublishedArticleUserCommentsService(userKey);

        if(!publishedArticleUserComments){
            throw new HttpError(400);
        }
        return res.status(200).json(publishedArticleUserComments);

    } catch(err){
        next(err)
    }

}


// 4.
export const postPublishedArticleCommentController = async (req, res, next) => {
    const { articleId } = req.params;
    const { userId } = req;
    const { comment } = req.body;

    try {
        // санитизация не требуется
        await postPublishedArticleCommentValidation(articleId, comment);
        const postedPublishedArticleComment = await postPublishedArticleCommentService(articleId, userId, comment);

        if(!postedPublishedArticleComment){
            throw new HttpError(400)
        }

        return res.status(200).json(postedPublishedArticleComment);
    } catch (err){
        next(err)
    }
}

// 5.
export const putPublishedArticleCommentController = async (req, res, next) => {
    
    const { commentId } = req.params;
    const { userId } = req;
    const { comment } = req.body;

    try {
        // санитизация не требуется
        await putPublishedArticleCommentValidation(commentId, userId, comment);
        const updatedPublishedArticleCommentId = await putPublishedArticleCommentService(commentId, comment);

        if(!updatedPublishedArticleCommentId){
            throw new HttpError(400)
        }

        return res.status(200).json(updatedPublishedArticleCommentId);
    } catch (err){
        next(err)
    }
}

// 6.
export const deletePublishedArticleCommentController = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = req;

    try {
        // санитизация не требуется
        await deletePublishedArticleCommentValidation(commentId, userId);
        const deletedPublishedArticleCommentId = await deletePublishedArticleCommentService(commentId);

        if(!deletedPublishedArticleCommentId){
            throw new HttpError(400)
        }

        return res.status(200).json(deletedPublishedArticleCommentId);
    } catch (err){
        next(err)
    }
}