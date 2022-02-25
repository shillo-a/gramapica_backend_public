import { HttpError } from "../../errors/Errors.js";
import { getRegionsService } from "./region.service.js";

// 1.
export const getRegionsController = async (req, res, next) => {

    try {
        // санитизация не требуется
        // валидация не требуется
        const regions = await getRegionsService();

        if(!regions){
            throw new HttpError(400);
        }
        return res.status(200).json(regions);

    } catch(err) {
        next(err)
    }

}