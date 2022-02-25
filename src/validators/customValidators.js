import argon2 from 'argon2';
import Article from '../models/Article.js';
import ArticleStatus from '../models/ArticleStatus.js';
import AuthUser from "../models/AuthUser.js";
import Comment from '../models/Comment.js';
import Section from '../models/Section.js';

export class CustomValidators {

    static async isEmailNew(email){
        const user = await AuthUser.findOne({
            where: {email: email}
        });
        return user ? false : true  
    }

    static async isUsernameNew(username){
        const user = await AuthUser.findOne({
            where: {username: username}
        });
        return user ? false : true
    }

    static async isPasswordCorrect(email, password){
        const user = await AuthUser.findOne({
            where: {email: email},
        });

        if(!user){
            return false
        }
        
        const user_output = user.toJSON();
        const correctPassword = await argon2.verify(user_output.password, password);
        return correctPassword ? true : false
    }

    static async isArticleExists(articleId){
        const article = await Article.findOne({
            where: {id: articleId}
        })

        return article ? true : false
    }

    static async isArticleOwner(articleId, userId){
        const article = await Article.findOne({
            where: {id: articleId}
        })

        return article?.author_id === userId ? true : false
    }

    static async isArticleDraft(articleId){
        const article = await Article.findOne({
            where: {id: articleId},
            include: [
                {
                    model: ArticleStatus,
                    as: 'article_status',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
                }
            ]
        })
        return article?.article_status.name === 'draft' ? true : false
    }

    static async isSectionExists(sectionId){
        const section = await Section.findOne({
            where: {id: sectionId}
        })

        return section ? true : false
    }

    static async isUserExists(userKey){
        const user = await AuthUser.findOne({
            where: {username: userKey}
        })

        return user ? true : false
    }
    
    static async isArticlePublished(articleId){
        const article = await Article.findOne({
            where: {id: articleId},
            include: [
                {
                    model: ArticleStatus,
                    as: 'article_status',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
                }
            ]
        })
        return article?.article_status.name === 'published' ? true : false
    }

    static async isCommentExists(commentId){
        const comment = await Comment.findOne({
            where: {id: commentId}
        })

        return comment ? true : false
    }

    static async isCommentOwner(commentId, userId){
        const comment = await Comment.findOne({
            where: {id: commentId}
        })

        return comment?.author_id === userId ? true : false
    }
}
