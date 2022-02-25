import validator from 'validator';
import { ValidationError } from '../../errors/Errors.js';
import { CustomValidators } from '../../validators/customValidators.js';

export const getUserValidation = async (userKey) => {
    
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

