import { HttpError } from "../../errors/Errors.js";
import { putArticleReviewService } from "./articleReview.service.js";
import { putArticleReviewValidation } from "./articleReview.validation.js";

// 1.
export const putArticleReviewController = async (req, res, next) => {

    const { articleId } = req.params;
    const { userId } = req;
    const { articleReview } = req.body;

    try {
        // санитизация не требуется
        await putArticleReviewValidation(articleId);
        const updatedArticleReview = await putArticleReviewService(articleId, userId, articleReview);

        if(!updatedArticleReview){
            throw new HttpError(400)
        }

        return res.status(200).json(updatedArticleReview)

    } catch (err){
        next(err)
    }
    
}