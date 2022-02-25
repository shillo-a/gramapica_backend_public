import { getTagsDal } from "./tag.dal.js";

// 1.
export const getTagsService = async () => {
    const tags = await getTagsDal(); //{raw: true}
    return tags;
}