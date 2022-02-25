import { loginSanitization, signupSanitization } from "./authentication.sanitization.js";
import { loginValidation, putAuthUserValidation, signupValidation } from "./authentication.validation.js";
import { loginService, putAuthUserService, signupService, tokenValidityService } from "./authentication.service.js";
import { HttpError } from "../../errors/Errors.js";

// 1.
export const signupController = async (req, res, next) => {

    const { email, username, password, password2 } = req.body;
    
    try {

        const sanitizedData = signupSanitization(email, username, password, password2);
        await signupValidation(sanitizedData);

        const user = await signupService(sanitizedData);
        if(!user){
            throw new HttpError(400)
        }
        return res.status(201).json(user);

    } catch(err) {
        next(err);
    }
   
}

// 2.
export const loginController = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const sanitizedData = loginSanitization(email, password);
        await loginValidation(sanitizedData);

        const user = await loginService(sanitizedData);
        if(!user){
            throw new HttpError(401)
        }
        return res.status(200).json(user);

    } catch(err){
        next(err);
    }

}

// 3.
export const tokenValidityController = async (req, res, next) => {
    const { userId } = req;

    try {

        const user = await tokenValidityService(userId);
        if(!user){
            throw new HttpError(401)
        }
        return res.status(200).json(user);

    } catch(err){
        next(err);
    }

}

// 4.
export const putAuthUserController  = async (req, res, next) => {

    const { userId } = req;
    const { user } = req.body;

    try {
        // санитизация не требуется
        await putAuthUserValidation(userId, user);
        const authUser = await putAuthUserService(userId, user);

        if(!authUser){
            throw new HttpError(400);
        }

        return res.status(200).json(authUser);

    } catch(err){
        next(err)
    }

}