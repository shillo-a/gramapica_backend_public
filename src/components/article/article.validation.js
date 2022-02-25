import validator from 'validator';
import { ValidationError } from '../../errors/Errors.js';
import { CustomValidators } from '../../validators/customValidators.js';

export const getDraftArticleValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const deleteDraftArticleValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const putDraftArticleValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const postDraftArticleSectionValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const deleteDraftArticleSectionValidation = async (articleId, sectionId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    //section exists
    if(await CustomValidators.isSectionExists(sectionId) !== true){
        remarks.push( {type: 'section', message: "Такой секции нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const putDraftArticleStatusValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const putDraftArticleTagsValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const getUserPublishedArticlesValidation = async (userKey) => {
    
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

export const getUserArticleValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваша статья"} )
    }

    // article in any status

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const putDraftArticleRegionsValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) !== true){
        remarks.push( {type: 'article', message: "Статья не является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const putUserArticleStatusValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваш черновик"} )
    }

    // article not in status draft
    if(await CustomValidators.isArticleDraft(articleId) === true){
        remarks.push( {type: 'article', message: "Статья является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const deleteUserArticleValidation = async (articleId, userId) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //article exists
    if(await CustomValidators.isArticleExists(articleId) !== true){
        remarks.push( {type: 'article', message: "Такой статьи нет или она удалена"} );
        // Преждевременно выбрасываем ошибку, так как, если ошибка здесь, в других проверках нет смысла
        throw new ValidationError(remarks);
    }

    // article owner
    if(await CustomValidators.isArticleOwner(articleId, userId) !== true){
        remarks.push( {type: 'owner', message: "Это не Ваша статья"} )
    }

    // article in status draft
    if(await CustomValidators.isArticleDraft(articleId) === true){
        remarks.push( {type: 'article', message: "Статья является черновиком"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const getPublishedArticleValidation = async (articleId) => {
    
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