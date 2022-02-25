import { getRegionsDal } from "./region.dal.js";

// 1. 
export const getRegionsService = async () => {
    const regions = await getRegionsDal();
    return regions;
}