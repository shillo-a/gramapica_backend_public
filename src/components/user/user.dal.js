import Op from "sequelize";

import Article from "../../models/Article.js";
import ArticleReview from "../../models/ArticleReview.js";
import AuthUser from "../../models/AuthUser.js"
import Comment from "../../models/Comment.js";
import Role from "../../models/Role.js";

// 1.
export const getUserDal = async (userKey) => {

    const user = await AuthUser.findOne({
        where: {username: userKey},
        attributes: {
            exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']
        },
        include: [
            {
                model: Role,
                as: 'roles',
                through: { attributes: [] }
            },
            {
                model: Article,
                as: 'draft_articles',
                where: { article_status_id: 1 },
                attributes: ['id'],
                required: false
            }
        ]
    });

    return user;
}


// Нет смысла загружать сразу все, лучше разбить на несколько API
// Имеет смысл определить кол-во
        // {
            //     model: Comment,
            //     as: 'comments',
            //     attributes: {exclude: ['author_id', 'article_id']},
            //     include: [
            //         {
            //             model: Article,
            //             as: 'article',
            //             attributes: ['id', 'name']
            //         }
            //     ]
            // },
            // {
            //     model: Article,
            //     as: 'draft_articles',
            //     attributes: ['id', 'name'],
            //     where: { article_status_id: 1 }
            // },
            // {
            //     model: Article,
            //     as: 'articles',
            //     attributes: ['id', 'name'],
            //     where: { article_status_id: 2 }
            // },
            // Пользователь может смотреть только по себе
            // { 
            //     model: ArticleReview,
            //     as: 'article_reviews',
            //     attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
            //     include: [
            //         {
            //             model: Article,
            //             as: 'article',
            //             attributes: ['id', 'name']
            //         }
            //     ]
            // },