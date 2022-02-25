import Tag from "../../models/Tag.js";

// 1.
// Загружаем справочник тегов
export const getTagsDal = async () => {
    const tags = await Tag.findAll({
        raw: true,
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    });
    return tags;
}