import { HttpError } from "../../errors/Errors.js";
import { getUserService } from "./user.service.js";
import { getUserValidation } from "./user.validation.js";

// 1.
export const getUserController = async (req, res, next) => {
    
    const { userKey } = req.params;

    try {
        // санитизация не требуется
        await getUserValidation(userKey);
        const user = await getUserService(userKey);

        if(!user){
            throw new HttpError(400)
        }

        return res.status(200).json(user)

    } catch(err){
        next(err)
    }

}

