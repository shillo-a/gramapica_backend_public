import { sequelize } from '../../config/db.config.js';
import pkg from 'sequelize';
const { Op } = pkg;

import Comment from '../../models/Comment.js';
import AuthUser from '../../models/AuthUser.js';
import Article from '../../models/Article.js';

// 1.
export const getPublishedArticleCommentsDal = async (articleId) => {
    
    // const draftArticle = await Article.findByPk(articleId);
    const publishedArticleComments = await Comment.findAll({
        where: {article_id: articleId},
        paranoid: false,
        order: [['createdAt', 'ASC']],
        include: [
            {
                model: AuthUser,
                as: 'author',
                attributes: {exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']}
            }
        ]
    });
    
    return publishedArticleComments
    
}

// 2.
export const getPublishedArticleNewCommentsDal = async (articleId, lastUpdatedAt) => {
    
    // const draftArticle = await Article.findByPk(articleId);
    const publishedArticleNewComments = await Comment.findAll({
        where: {
            article_id: articleId,
            [Op.or]: [
                {
                    updatedAt: {[Op.gt]: lastUpdatedAt}
                },
                {
                    deletedAt: {[Op.gt]: lastUpdatedAt}
                },

            ]
        },
        paranoid: false,
        order: [['updatedAt', 'ASC']],
        include: [
            {
                model: AuthUser,
                as: 'author',
                attributes: {exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']}
            }
        ]
    });
    
    return publishedArticleNewComments
    
}

// 3.
export const getPublishedArticleUserCommentsDal = async(userKey) => {

    const result = await sequelize.transaction( async (t) => {

        //1. Определяем id user-a по userKey
        const user = await AuthUser.findOne({
            where: {username: userKey},
            transaction: t
        })

        const userId = user.id;

        //2. Находим комментарии для данного юзера (по опубликованныи статьям)
        const publishedArticleUserComments = await Comment.findAll({
            where: {author_id: userId},
            paranoid: true, //убираем, у которых есть deletedAt
            order: [['updatedAt', 'DESC']],
            include: [
                {
                    model: AuthUser,
                    as: 'author',
                    attributes: {exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']}
                },
                {
                    model: Article,
                    as: 'article'
                }
            ],
            transaction: t
        });

        return publishedArticleUserComments
    })

    return result;

}

// 4.
export const postPublishedArticleCommentDal = async (articleId, userId, comment) => {
    
    const result = await sequelize.transaction( async (t) => {

        // 1. Создаем комментарий
        const postedPublishedArticleComment = await Comment.create({
            article_id: articleId,
            author_id: userId,
            parent_id: comment.parentId,
            body: comment.body
        }, {transaction: t})

        

        // 2. Находим вновь созданный комментарий (со всеми вложениями)
        const publishedArticleComment = await Comment.findOne({
            where: {id: postedPublishedArticleComment.id},
            paranoid: false,
            include: [
                {
                    model: AuthUser,
                    as: 'author',
                    attributes: {exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']}
                }
            ],
            transaction: t
        });

        return  publishedArticleComment;

    })

    return result;
    
}

// 5.
export const putPublishedArticleCommentDal = async (commentId, comment) => {

    const updatedPublishedArticleComment = await Comment.update(
        { body: comment.body },
        { where: { id: commentId }}
    )

    return commentId;
}

// 6.
export const deletePublishedArticleCommentDal = async (commentId) => {

    const deletedPublishedArticleCommentId = await Comment.destroy({
        where: {id: commentId},
    });
    
    return commentId;
}

        // attributes: ['id', 'name'],
        // order: [
        //     [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
        // ], 
        // include: articleInclude