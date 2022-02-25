import { HttpError } from "../../errors/Errors.js";
import { getTagsService } from "./tag.service.js";

// 1.
export const getTagsController = async (req, res, next) => {
    //{} = req.body
    //{} = req.params
    //{} = req.body

    try {
        // сантитизация не требуется
        // валидация не требуется
        const tags = await getTagsService();
        if(!tags){
            throw new HttpError(400)
        }
        return res.status(200).json(tags)

    } catch(err){
        next(err)
    }
}