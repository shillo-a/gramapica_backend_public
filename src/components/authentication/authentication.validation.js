import validator from 'validator';
import { ValidationError } from '../../errors/Errors.js';
import { CustomValidators } from '../../validators/customValidators.js';

export const signupValidation = async ({ email, username, password, password2 }) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //email
    if(validator.isEmail(email) !== true){
        remarks.push( {type: 'email', message: 'Укажите корректный e-mail'} )
    }

    if(await CustomValidators.isEmailNew(email) !== true){
        remarks.push( {type: 'email', message: 'Указанный e-mail уже занят'} )
    }

    //username
    if(await CustomValidators.isUsernameNew(username) !== true){
        remarks.push( {type: 'username', message: 'Указанный никнейм уже занят'} )
    }

    if(validator.isLength(username, { min: 3, max: 25 }) !== true){
        remarks.push( {type: 'username', message: 'Не меньше 3 и не больше 25 символов'} )
    }

    if(validator.isAlphanumeric(username) !== true){
        remarks.push( {type: 'username', message: 'Только буквы (A-Z a-z) и цифры (0-9)'} )
    }

    //password
    if(validator.isLength(password, { min: 6 }) !== true){
        remarks.push( {type: 'password', message: 'Длина пароля не может быть меньше 6 символов'} )
    }

    if(validator.isAlphanumeric(password) !== true){
        remarks.push( {type: 'password', message: 'Только буквы (A-Z a-z) и цифры (0-9)'} )
    }

    if(validator.equals(password, password2) !== true){
        remarks.push( {type: 'password2', message: 'Пароли не совпадают'} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const loginValidation = async ({ email, password }) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы
    //email
    if(await CustomValidators.isEmailNew(email) !== false){
        remarks.push( {type: 'email', message: "Укажите корректный e-mail"} )
    }

    //password
    if(await CustomValidators.isPasswordCorrect(email, password) !== true){
        remarks.push( {type: 'password', message: "Укажите корректный пароль"} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}

export const putAuthUserValidation = async (userId, user) => {

    let remarks = [];

    // Выполняем проверку целиком по APIы
    // Добавить проверку по кол-ву символов и т.п.
    
    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}