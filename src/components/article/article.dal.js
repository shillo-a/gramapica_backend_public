import { sequelize } from '../../config/db.config.js';
import pkg from 'sequelize';
const { Op } = pkg;

import Article from '../../models/Article.js'
import ArticleStatus from '../../models/ArticleStatus.js';
import ArticleTag from '../../models/ArticleTag.js';
import AuthUser from '../../models/AuthUser.js';
import Section from '../../models/Section.js';
import SectionType from '../../models/SectionType.js';
import Tag from '../../models/Tag.js';
import SectionImage from '../../models/SectionImage.js';
import Marker from '../../models/Marker.js';
import Quote from '../../models/Quote.js';
import ArticleReview from '../../models/ArticleReview.js'
import Comment from '../../models/Comment.js';
import Region from '../../models/Region.js';
import ArticleRegion from '../../models/ArticleRegion.js';
import ArticleTotal from '../../models/ArticleTotal.js';

const articleInclude = [
    {
        model: ArticleStatus,
        as: 'article_status',
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    },
    {
        model: AuthUser,
        as: 'author',
        attributes: {exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']}
    },
    {
        model: ArticleTag,
        as: 'article_tags',
        attributes: ['id'],
        include: [
            {
                model: Tag,
                as: 'tag',
                attributes: ['id', 'name']
            }
        ]
    },
    {
        model: ArticleRegion,
        as: 'article_regions',
        attributes: ['id'],
        include: [
            {
                model: Region,
                as: 'region'
            }
        ]
    },

   {
       model: Section,
       as: 'sections',
       attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt', 'article_id', 'section_type_id', 'section_image_id', 'quote_id', 'marker_id']},
       include: [
           {
                model: SectionType,
                as: 'section_type',
                attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
            },
            {
                model: SectionImage,
                as: 'section_image',
                attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
            },
            {
                model: Quote,
                as: 'quote',
                attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
            },
            {
                model: Marker,
                as: 'marker',
                attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
               
            }
        ],
   },
   {
        model: ArticleReview,
        as: 'article_reviews',
        attributes: ['id', 'user_id', 'is_like', 'is_favorite']
    },
    {
        model: Comment,
        as: 'comments',
        attributes: ['id']
    },
    {
        model: ArticleTotal,
        as: 'article_total',
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    }
];

const articlesInclude = [
    {
        model: ArticleStatus,
        as: 'article_status',
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    },
    {
        model: AuthUser,
        as: 'author',
        attributes: {exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']}
    },
    {
        model: ArticleTag,
        as: 'article_tags',
        attributes: ['id'],
        include: [
            {
                model: Tag,
                as: 'tag',
                attributes: ['id', 'name']
            }
        ]
    },
    {
        model: ArticleRegion,
        as: 'article_regions',
        attributes: ['id'],
        include: [
            {
                model: Region,
                as: 'region'
            }
        ]
    },
    {
        model: ArticleRegion, //ПОВТОРЯЕМ МОДЕЛЬ, ЧТОБЫ ОТФИЛЬТРОВАТЬ РОДИТЕЛЕЙ ПО ДЕТЯМ, А ПОТОМ СОХРАНИТЬ ДЕТЕЙ
        as: 'article_regions_FILTER'   
    },
    {
        model: Section,
        as: 'sections',
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt', 'article_id']},
        // limit: 3,
        required: false,
        where: { is_feed_show: true }, //оставляем только такие, которые должны отображаться в ленте

        include: [
            {
                 model: SectionType,
                 as: 'section_type',
                 attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
             },
             {
                 model: SectionImage,
                 as: 'section_image',
                 attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
             },
             {
                 model: Quote,
                 as: 'quote',
                 attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
             },
             {
                 model: Marker,
                 as: 'marker',
                 attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt', 'marker_image_id', 'coordinate_id', 'boundary_id']},
             }
        ],
    },
    {
        model: ArticleReview,
        as: 'article_reviews',
        attributes: ['id', 'user_id', 'is_like', 'is_favorite']
    },
    {
        model: ArticleReview, //ПОВТОРЯЕМ МОДЕЛЬ, ЧТОБЫ ОТФИЛЬТРОВАТЬ РОДИТЕЛЕЙ ПО ДЕТЯМ, А ПОТОМ СОХРАНИТЬ ДЕТЕЙ
        // separate: true,
        // duplicating: false,
        as: 'article_reviews_FILTER'   
    },
    {
        model: Comment,
        as: 'comments',
        attributes: ['id']
    },
    {
        model: ArticleTotal,
        as: 'article_total',
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    }
];

let ITEMS_PER_PAGE = 15;

// 1. +
// Целиком загружаем статью для OWNER
export const getDraftArticleDal = async (articleId) => {
    
    // const draftArticle = await Article.findByPk(articleId);
    const draftArticle = await Article.findOne({
        where: {id: articleId},
        attributes: ['id', 'name'],
        order: [
            [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
        ], 
        include: articleInclude
        
    });
    return draftArticle
    
}

// 2. +
export const postDraftArticleDal = async (userId) => {
    const article = await Article.create({
        author_id: userId
    })
    return article;
}

// 3. +-
export const deleteDraftArticleDal = async (articleId) => {
    
    const draftArticle = await Article.destroy({
        where: {id: articleId}
        
    })

    // const test = await Section.destroy({
    //     where: {article_id: articleId}
    // })

    // при удалении возвращаем id, а не draftArticle
    return articleId;
}

// 4. +
export const getDraftArticlesDal = async (userId) => {
    const draftArticles = await Article.findAll({
        where: {
            author_id: userId,
            article_status_id: 1
        },
        order: [
            ['updatedAt', 'DESC'],
            [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
        ],
        include: articlesInclude
    })
    return draftArticles;
}

// 5. +
export const putDraftArticleDal = async (articleId, article) => {
 
    const newArticleName = article.name;
    const newArticleSections = article.sections;
   
    const result = await sequelize.transaction( async (t) => {

        // 1. Изменяем название статьи в таблице article (если есть)
        const draftArticle = await Article.update(
            { name: newArticleName },
            { 
                where: { id: articleId },
                transaction: t
            }
        )

        // 2. Изменяем секции в таблице section и зависимые таблицы
        for (const newArticleSection of newArticleSections){
            const sectionId = newArticleSection.id;
            const sectionOrderNum = newArticleSection.orderNum
            const sectionHeader = newArticleSection.header;
            const sectionBody = newArticleSection.body;
            const sectionIsFeedShow = newArticleSection.isFeedShow;
    
            const sectionImage = newArticleSection.sectionImage;
            const sectionQuote = newArticleSection.sectionQuote;
            const sectionMarker = newArticleSection.sectionMarker;
    
            //3.1. Update основной части section
            const draftArticleSection = await Section.update(
                { 
                    order_num: sectionOrderNum,
                    header: sectionHeader,
                    body: sectionBody,
                    is_feed_show: sectionIsFeedShow
    
                },
                { 
                    where: { id: sectionId },
                    transaction: t
                 }
            )
    
            //3.2 Update image (если есть)
            const draftArticleSectionImage = sectionImage && await SectionImage.update(
                {
                    filename: sectionImage.filename,
                    description: sectionImage.description
                },
                { 
                    where: { id: sectionImage.id },
                    transaction: t
                 }
            )
    
            //3.3 Update quote (если есть)
            const draftArticleSectionQuote = sectionQuote && await Quote.update(
                {
                    body: sectionQuote.body,
                    person_name: sectionQuote.personName,
                    profession: sectionQuote.profession,
                    avatar_filename: sectionQuote.avatarFilename
                },
                { 
                    where: { id: sectionQuote.id },
                    transaction: t
                }
            )
    
            //3.4 Update marker (если есть)
            const draftArticleSectionMarker = sectionMarker && await Marker.update(
                {
                    name: sectionMarker.name,
                    description: sectionMarker.description,
                    image_filename: sectionMarker.markerImage.filename,
                    image_description: sectionMarker.markerImage.description,
                    coordinate_name: sectionMarker.coordinate.name,
                    coordinate_latitude: sectionMarker.coordinate.latitude,
                    coordinate_longitude: sectionMarker.coordinate.longitude,
                    boundary_latitude_top_left: sectionMarker.boundary.latitudeTopLeft,
                    boundary_longitude_top_left: sectionMarker.boundary.longitudeTopLeft,
                    boundary_latitude_bottom_right: sectionMarker.boundary.latitudeBottomRight,
                    boundary_longitude_bottom_right: sectionMarker.boundary.longitudeBottomRight
                },
                { 
                    where: { id: sectionMarker.id },
                    transaction: t
                }
            )

        }

        // // 3. Определяем, какие регионы отображаются в статье
        // // 3.1 Получаем инфорацию о доступных регионах из БД
        // const regions = await Region.findAll({
        //     transaction: t
        // });
       
        // // 3.2 По заданному алгоритму определяем, какие регоины используются в статье

        // // const newRegions = newArticleSections.map(item => )console.log(newArticleSections)
        


        // // 3.3 Обновляем регионы для статьи

        return 1;
    })

    return result;

}

// 6. +-
export const postDraftArticleSectionDal = async (articleId, typeName, orderNum) => {
    
    //1. Находим ID для TypeName
    const sectionType = await SectionType.findOne({ 
        where: {name: typeName}
    })
    const sectionTypeId = sectionType.id;

    //2. Создаем Section в зависимости от typeName
    let createdSection;
    switch(typeName){

        case "subheader":
        case "text":
        case "spoiler": 
            createdSection = await Section.create({
                article_id: articleId,
                section_type_id: sectionTypeId,
                order_num: orderNum
            }); 
        break;

        case "image":
            const sectionImage = await SectionImage.create();
            if(sectionImage){
                const sectionImageId = sectionImage.id;
                createdSection = await Section.create({
                    article_id: articleId,
                    section_type_id: sectionTypeId,
                    order_num: orderNum,
                    section_image_id: sectionImageId
                }); 
            }
        ; break;
        
        case "quote": 
            const sectionQuote = await Quote.create();
            if(sectionQuote){
                const sectionQuoteId = sectionQuote.id;
                createdSection = await Section.create({
                    article_id: articleId,
                    section_type_id: sectionTypeId,
                    order_num: orderNum,
                    quote_id: sectionQuoteId
                }); 
            }
        ; break;

        case "marker": 
            const sectionMarker = await Marker.create();
            if(sectionMarker){
                const sectionMarkerId = sectionMarker.id;
                createdSection = await Section.create({
                    article_id: articleId,
                    section_type_id: sectionTypeId,
                    order_num: orderNum,
                    marker_id: sectionMarkerId
                });
            }
        ; break;
    }

    //3. Если Section была создана запрашиваем её из бд, чтобы получить с ассоциациями
    let section;
    if(createdSection){
        section = Section.findOne({
            where: {id: createdSection.id},
            attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt', 'article_id', 'section_type_id', 'section_image_id', 'quote_id', 'marker_id']},
            include: [
                {
                    model: SectionType,
                    as: 'section_type',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
                },
                {
                    model: SectionImage,
                    as: 'section_image',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
                },
                {
                    model: Quote,
                    as: 'quote',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
                },
                {
                    model: Marker,
                    as: 'marker',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
                   
                }
            ]
        })
    }

    return section;
}

// 7. +
export const deleteDraftArticleSectionDal = async (sectionId) => {
    
    const result = await sequelize.transaction( async (t) => {
        //1. Находим секцию в БД, чтобы определить связанные таблицы для каслкадного софт удаления
        const draftArticleSection = await Section.findOne({
            where: {id: sectionId},
            transaction: t
        })

        //2. Удаляем связанные таблицы с секций
        const draftArticleSectionImageId = draftArticleSection.section_image_id;
        const draftArticleSectionQuoteId = draftArticleSection.quote_id;
        const draftArticleSectionMarkerId = draftArticleSection.marker_id;

        const draftArticleSectionImageDeleted = await draftArticleSectionImageId && SectionImage.destroy({
            where: {id: draftArticleSectionImageId},
            transaction: t
        })

        const ddraftArticleSectionQuoteDeleted = await draftArticleSectionQuoteId && Quote.destroy({
            where: {id: draftArticleSectionQuoteId},
            transaction: t
        })

        const draftArticleSectionMarkerDeleted = await draftArticleSectionMarkerId && Marker.destroy({
            where: {id: draftArticleSectionMarkerId},
            transaction: t
        })

        //3. Удаляем саму секцию
        const draftArticleSectionDeleted = await Section.destroy({
            where: {id: sectionId},
            transaction: t
        })

        return sectionId;
    })
    

    return result;
}

// 8. 
export const putDraftArticleStatusDal = async (articleId, statusName) => {
    
    const result = await sequelize.transaction( async (t) => {
        
        const status = await ArticleStatus.findOne({
            where: {name: statusName},
            transaction: t
        })

        const article = status && await Article.update(
            { article_status_id: status.id },
            { 
                where: { id: articleId },
                transaction: t
            }
        )

        return articleId;

    })

    return result;
}

// 9.
export const getUserArticlesDal = async (userId) => {

    const userArticles = await Article.findAll({
        where: {
            author_id: userId,
            article_status_id: {
                [Op.or]: [2, 3, 4]
            }
        },
        order: [
            ['updatedAt', 'DESC'],
            [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
        ],
        include: articlesInclude
    })

    return userArticles;
}

// 10.
export const putDraftArticleTagsDal = async (articleId, tags) => {

    const result = await sequelize.transaction( async (t) => {

        // 1. Удаляем старые теги к статье
        const deletedTags = await ArticleTag.destroy({
            where: {article_id: articleId},
            transaction: t
        })

        // 2. Создаем новые теги к статье (bulkCreate для postgreSQL не работает!)
        for(let tag of tags){
            const updatedTag = await ArticleTag.create(
                {tag_id: tag.id, article_id: articleId},
                {transaction: t}
            )
        }

        // 3. Выгружаем окончательные теги к статье
        const newTags = await ArticleTag.findAll({
            where: {article_id: articleId},
            transaction: t,
            attributes: ['id'],
                include: [
                    {
                        model: Tag,
                        as: 'tag',
                        attributes: ['id', 'name']
                    }
                ]
        })

        return newTags;
    })

    return result
}

// 11.
export const getUserPublishedArticlesDal = async (userKey) => {
    const result = await sequelize.transaction( async (t) => {

        //1. Определяем id user-a по userKey
        const user = await AuthUser.findOne({
            where: {username: userKey},
            transaction: t
        })

        const userId = user.id;

        //2. Находим опубликованные статьи для данного юзера
        const userPublishedArticles = await Article.findAll({
            where: {
                author_id: userId,
                article_status_id: {
                    [Op.or]: [2]
                }
            },
            order: [
                ['updatedAt', 'DESC'],
                [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
            ],
            include: articlesInclude,
            transaction: t
        })

        return userPublishedArticles
    })

    return result;
}

// 12.
export const getUserArticleDal = async (articleId) => {

    const userArticle = await Article.findOne({
        where: {id: articleId},
        order: [
            [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
        ], 
        include: articleInclude
    });

    return userArticle
}

// 13.
export const getArticleOptionsDal = async (articleId) => {

    const articleOptions = await Article.findOne({
        where: {id: articleId},
        attributes: ['id', 'author_id'],
        include: {
            model: AuthUser,
            as: 'author',
            attributes: {exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']}
        },
    })

    return articleOptions;
}

// 14.
export const putDraftArticleRegionsDal = async (articleId, regions) => {

    const result = await sequelize.transaction( async (t) => {

        // 1. Удаляем старые регионы к статье
        const deletedRegions = await ArticleRegion.destroy({
            where: {article_id: articleId},
            transaction: t
        })

        // 2. Создаем новые теги к статье (bulkCreate для postgreSQL не работает!)
        for(let region of regions){
            const updatedRegion = await ArticleRegion.create(
                {region_id: region.id, article_id: articleId},
                {transaction: t}
            )
        }

        // 3. Выгружаем окончательные теги к статье
        const newRegions = await ArticleRegion.findAll({
            where: {article_id: articleId},
            transaction: t,
            attributes: ['id'],
                include: [
                    {
                        model: Region,
                        as: 'region',
                        attributes: ['id', 'name', 'description']
                    }
                ]
        })

        return newRegions;
    })

    return result
}

// 15. 
export const putUserArticleStatusDal = async (articleId, statusName) => {
    
    const result = await sequelize.transaction( async (t) => {
        
        const status = await ArticleStatus.findOne({
            where: {name: statusName},
            transaction: t
        })

        const article = status && await Article.update(
            { article_status_id: status.id },
            { 
                where: { id: articleId },
                transaction: t
            }
        )

        return articleId;

    })

    return result;
}

// 16. +-
export const deleteUserArticleDal = async (articleId) => {
    
    const userArticle = await Article.destroy({
        where: {id: articleId}
        
    })

    // const test = await Section.destroy({
    //     where: {article_id: articleId}
    // })

    // при удалении возвращаем id, а не draftArticle
    return articleId;
}

// 17.
export const getFavoriteArticlesDal = async (userId) => {

    const favoriteArticles = await Article.findAll({
        where: {
            article_status_id: 2, //published
            '$article_reviews_FILTER.user_id$': userId,
            '$article_reviews_FILTER.is_favorite$': true 
            //Хочу отфильтровать парент, но не дочерние элементы (чтобы сохранить отызы других пользоваталей)
        },
        order: [
            ['updatedAt', 'DESC'],
            [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
        ],
        include: articlesInclude
    })

    return favoriteArticles;

}

// 18.
export const getPublishedArticleDal = async (articleId) => {

    // 1. Фиксируем просмотр статьи +1
    const articleTotal = await ArticleTotal.findOne({
        where: {article_id: articleId}
    })

    console.log(articleTotal)
    if(articleTotal){
        const articleTotalId = articleTotal.id;
        const articleTotalViews = articleTotal.total_views;
        await ArticleTotal.update(
            {total_views: articleTotalViews+1},
            {where: {id: articleTotalId}}   
        )
    } else {
        await ArticleTotal.create(
            {
                total_views: 1,
                article_id: articleId
            },  
        )
    }
    
    // 2. Загружаем саму статью
    const publishedArticle = await Article.findOne({
        where: {id: articleId},
        order: [
            [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
        ], 
        include: articleInclude
        
    });
    return publishedArticle

}

// 19.
export const getNewestPublishedArticlesDal = async (pageNum, regionName) => {

    const result = await sequelize.transaction( async (t) => {

        //1. Определяем id региона по region (оно же имя региона)
        const region = await Region.findOne({
            where: {name: regionName},
            transaction: t
        })

        const regionId = region.id;

        //2. находим id Всех статей для указанного региона
        const regionArticlesId = [...await ArticleRegion.findAll({
            where: {region_id: regionId},
            attributes: ['article_id'],
            raw : true,
            transaction: t
        })].map(item => item.article_id)

        //3. Находим опубликованные статьи для данного региона
        const newestPublishedArticles = await Article.findAll({
            
            limit: ITEMS_PER_PAGE,   //quantity of items to fetch
            offset: (pageNum-1) * ITEMS_PER_PAGE,  //quantity of items to skip

            where: {
                // '$article_regions_FILTER.region_id$': regionId, (ошибка sequelize - не работает с limit!)
                id: { [Op.or]: regionArticlesId },
                article_status_id: 2
            },
            order: [
                ['updatedAt', 'DESC'],
                [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
            ],
            include: articlesInclude,
            transaction: t
        })

        return newestPublishedArticles
    })

    return result;

}

// 20.
export const getNewestPublishedArticlesTotalPagesDal = async (regionName) => {

    const result = await sequelize.transaction( async (t) => {

        //1. Определяем id региона по region (оно же имя региона)
        const region = await Region.findOne({
            where: {name: regionName},
            transaction: t
        })

        const regionId = region.id;

        //2. находим id Всех статей для указанного региона
        const regionArticlesId = [...await ArticleRegion.findAll({
            where: {region_id: regionId},
            attributes: ['article_id'],
            raw : true,
            transaction: t
        })].map(item => item.article_id)

        //3. Находим Все опубликованные статьи для данного региона
        const newestPublishedArticles = [...await Article.findAll({
            where: {
                id: { [Op.or]: regionArticlesId },
                article_status_id: 2
            },
            attributes: ['id'],
            transaction: t
        })]

        return Math.ceil(newestPublishedArticles.length/ITEMS_PER_PAGE)
    })
    
    return result
}

// 21.
export const getPopularPublishedArticlesDal = async (pageNum, regionName, timePeriod) => {

    const result = await sequelize.transaction( async (t) => {

        //1. Определяем id региона по region (оно же имя региона)
        const region = await Region.findOne({
            where: {name: regionName},
            transaction: t
        })

        const regionId = region.id;

        //2. находим id Всех статей для указанного региона
        const regionArticlesId = [...await ArticleRegion.findAll({
            where: {region_id: regionId},
            attributes: ['article_id'],
            raw : true,
            transaction: t
        })].map(item => item.article_id)

        //2. Определяем какая будет применена сортировка в зависимости от типа
        let sortTimePeriodValue; //Выбираем вновь созданный атрибут для сортировки
        switch(timePeriod){
            case 'now': { sortTimePeriodValue = 'updatedat_day' } break;

            case 'day': { sortTimePeriodValue = 'updatedat_day' } break;
            case 'week': { sortTimePeriodValue = 'updatedat_week' } break;
            case 'month': { sortTimePeriodValue = 'updatedat_month' } break;
            case 'year': { sortTimePeriodValue = 'updatedat_year'} break;
            case 'all': { sortTimePeriodValue = 'updatedat_all' } break;

            default: { sortTimePeriodValue = 'updatedat_day' } break;
        }

        //3. Находим ПОПУЛЯРНЫЕ опубликованные статьи для данного региона
        const popularPublishedArticles = await Article.findAll({
            
            limit: ITEMS_PER_PAGE,   //quantity of items to fetch
            offset: (pageNum-1) * ITEMS_PER_PAGE,  //quantity of items to skip

            attributes: {
                include: [  
                    ['updatedAt', 'updatedat_day'],

                    [sequelize.fn('concat',
                        sequelize.fn('date_part', 'year', sequelize.col('updatedAt')),
                        sequelize.fn('date_part', 'week', sequelize.col('updatedAt'))
                    ), 'updatedat_week'],

                    [sequelize.fn('concat',
                        sequelize.fn('date_part', 'year', sequelize.col('updatedAt')),
                        sequelize.fn('date_part', 'month', sequelize.col('updatedAt'))
                    ), 'updatedat_month'],

                    [sequelize.fn('date_part', 'year', sequelize.col('updatedAt')), 'updatedat_year'],
                    
                    [sequelize.literal('1'), 'updatedat_all']
                ]
            },

            include: articlesInclude,

            where: {
                id: { [Op.or]: regionArticlesId },
                article_status_id: 2, //published - имеет смысл изменить на key!!!
            },

            order: [
                [sequelize.literal(`${sortTimePeriodValue}`), 'DESC'],
                ['article_total', 'total_views', 'DESC NULLS LAST'], //Нулевые сбрасывавем в конец
                [{ model: Section, as: 'sections' }, 'order_num', 'ASC']
            ],
            
            transaction: t
        })

        return popularPublishedArticles
    })

    return result;
}

// 22.
export const getPopularPublishedArticlesTotalPagesDal = async (regionName) => {

    const result = await sequelize.transaction( async (t) => {

        //1. Определяем id региона по region (оно же имя региона)
        const region = await Region.findOne({
            where: {name: regionName},
            transaction: t
        })

        const regionId = region.id;

        //2. находим id Всех статей для указанного региона
        const regionArticlesId = [...await ArticleRegion.findAll({
            where: {region_id: regionId},
            attributes: ['article_id'],
            raw : true,
            transaction: t
        })].map(item => item.article_id)

        //3. Находим Все опубликованные статьи для данного региона
        const popularPublishedArticles = [...await Article.findAll({
            where: {
                id: { [Op.or]: regionArticlesId },
                article_status_id: 2
            },
            attributes: ['id'],
            transaction: t
        })]

        return Math.ceil(popularPublishedArticles.length/ITEMS_PER_PAGE)
    })
    
    return result
}

















// [sequelize.fn('YEAR', sequelize.col('updatedAt')), 'DESC'],

// ['article.updatedAtYear', 'DESC'],
// [[Sequelize.literal('article.updatedAtYear')]]

// updatedAt: {
//     // [Op.gt]: now.startOf('day').toString(),
//     // [Op.lt]: now.endOf('day').toString()
// }

// [[sequelize.fn('COALESCE', sequelize.fn('SUM', (mysql.col('col_name'), mysql.col('col_2_name'))), (some other code here ...)),'alias']]

// attributes: ['id', 'name'],

// where: { Name: { [Op.or]: Names } },






// attributes: ['id', 'name'],
                // through: { attributes: ['id'] },
                  //    {
        //        model: Tag,
        //        as: 'tags',
        //        attributes: ['id', 'name'],
        //        through: { attributes: ['id'] },
        //    },