import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/Errors.js';

export const isAuth = (req, res, next) => {

    let accessToken;
    let decodedAccessToken;
   

    try {
    
        accessToken = req.get('Authorization')?.split(' ')[1] || null;
        decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SIGNATURE);
        
    } catch (error) {
        throw new HttpError(401, error.message)
        // throw error;
    }

    req.userId = decodedAccessToken.userId

    next();
}