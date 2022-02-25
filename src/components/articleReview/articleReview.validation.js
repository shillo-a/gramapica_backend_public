import validator from 'validator';
import { ValidationError } from '../../errors/Errors.js';
import { CustomValidators } from '../../validators/customValidators.js';

export const putArticleReviewValidation = async (articleId) => {
    
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