import validator from 'validator';
import { ValidationError } from '../../errors/Errors.js';
import { CustomValidators } from '../../validators/customValidators.js';

export const getPublishedArticleCommentsValidation = async (articleId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article in status published
    if(await CustomValidators.isArticlePublished(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является опубликованной"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const getPublishedArticleNewCommentsValidation = async (articleId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article in status published
    if(await CustomValidators.isArticlePublished(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является опубликованной"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

} 

export const getPublishedArticleUserCommentsValidation = async (userKey) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    //user exists
    if(await CustomValidators.isUserExists(userKey) !== true){
        remarks.push( {type: 'user', message: "Такой пользователь не существует"} );
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

} 

export const postPublishedArticleCommentValidation = async (articleId, comment) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article in status published
    if(await CustomValidators.isArticlePublished(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является опубликованной"} )
    }

    //comment body is empty
    if(validator.isEmpty(comment.body) === true){
        remarks.push( {type: 'comment', message: 'Нельзя отправить комментарий без текста'} )
    }

    //comment с parentId exists или его совсем нет
    if(comment.parentId){

        if(await CustomValidators.isCommentExists(comment.parentId) !== true){
            remarks.push( {type: 'comment', message: "Такого родительского комментария нет или он удален"} )
        }
        
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const deletePublishedArticleCommentValidation = async (commentId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    // comment exists
    if(await CustomValidators.isCommentExists(commentId) !== true){
        remarks.push( {type: 'comment', message: "Такого комментария нет или он удален"} )
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // comment owner
    if(await CustomValidators.isCommentOwner(commentId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш комментарий"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const putPublishedArticleCommentValidation = async (commentId, userId, comment) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    // comment exists
    if(await CustomValidators.isCommentExists(commentId) !== true){
        remarks.push( {type: 'comment', message: "Такого комментария нет или он удален"} )
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // comment owner
    if(await CustomValidators.isCommentOwner(commentId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш комментарий"} )
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    //comment body is empty
    if(validator.isEmpty(comment.body) === true){
        remarks.push( {type: 'comment', message: 'Нельзя отправить комментарий без текста'} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}