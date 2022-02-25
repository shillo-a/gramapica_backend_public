import { sequelize } from '../../config/db.config.js';
import pkg from 'sequelize';
const { Op } = pkg;

import ArticleReview from '../../models/ArticleReview.js';

export const putArticleReviewDal = async (articleId, userId, articleReview) => {
    
    const result = await sequelize.transaction( async (t) => {

        //1. Находим articleReview для articleId от userId
        const existedArticleReview = await ArticleReview.findOne({
            where: {
                article_id: articleId,
                user_id: userId
            },
            transaction: t
        })

        //2. Если articleReview существует, то меняем его
        //3. Если articleReview нет, то создаем его
        let updatedArticleReview = null;
        if(existedArticleReview){

            updatedArticleReview = await ArticleReview.update({
                is_favorite: articleReview.isFavorite,
                is_like: articleReview.isLike
            }, {
                where: {
                    article_id: articleId,
                    user_id: userId
                },
                transaction: t
            })

        } else {

            updatedArticleReview = await ArticleReview.create({
                article_id: articleId,
                user_id: userId,
                is_favorite: articleReview.isFavorite,
                is_like: articleReview.isLike
            },
            {
                transaction: t
            })

        }

        console.log(updatedArticleReview)
        return updatedArticleReview

    })

    return result;
    
}