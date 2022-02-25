import { sequelize } from '../../config/db.config.js';
import pkg from 'sequelize';
import Region from '../../models/Region.js';
const { Op } = pkg;

// 1.
export const getRegionsDal = async () => {
    const regions = await Region.findAll({
        order: [
            ['id', 'ASC']
        ],
    });
    return regions;
}