import jwt from 'jsonwebtoken';
import { loginDal, putAuthUserDal, signupDal, tokenValidityDal } from "./authentication.dal.js"

//Переделать неотображения password-a в attributes

// 1.
export const signupService = async (sanitizedData) => {
    const user = await signupDal(sanitizedData);

    if(user){
        const user_output = user.toJSON();
        return user_output;
    } else {
        return null
    }
}

// 2.
export const loginService = async (sanitizedData) => {
    const user = await loginDal(sanitizedData);

    if(user){
        const user_output = user.toJSON();
        const jwt_token = jwt.sign({userId: user.id}, process.env.JWT_SIGNATURE, { expiresIn: process.env.JWT_EXPIRATION });
        const user_output_formatted = {
            ...user_output, 
            draft_articles_num: user_output.draft_articles.length, 
            accessToken: jwt_token
        };
        delete user_output_formatted.draft_articles;
        return user_output_formatted;
    } else {
        return null;
    }

}

// 3.
export const tokenValidityService = async (userId) => {
    const user = await tokenValidityDal(userId);
    
    if(user){
        const user_output = user.toJSON();
        const user_output_formatted = {
            ...user_output, 
            draft_articles_num: user_output.draft_articles.length
        };
        delete user_output_formatted.draft_articles;
        return user_output_formatted;
    } else {
        return null;
    }
}

export const putAuthUserService = async (userId, user) => {
    const authUser = await putAuthUserDal(userId, user);
    return authUser;
}