import argon2 from 'argon2';
import Article from '../../models/Article.js';
import AuthUser from "../../models/AuthUser.js";
import Role from '../../models/Role.js';

// 1.
export const signupDal = async ({ email, username, password, password2 }) => {

    const passwordHashed = await argon2.hash(password);

    const user = await AuthUser.create({
        email: email,
        username: username,
        password: passwordHashed
    },{
        attributes: {
            exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']
        }
    });

    return user;
}

// 2.
export const loginDal = async ({ email, password }) => {

    const user = await AuthUser.findOne({
        where: {email: email},
        attributes: {
            exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']
        },
        include: [
            {
                model: Role,
                as: 'roles',
                through: { attributes: [] }
            },
            {
                model: Article,
                as: 'draft_articles',
                where: { article_status_id: 1 },
                attributes: ['id'],
                required: false
            }
        ]
    });

    return user;
}

// 3.
export const tokenValidityDal = async (userId) => {

    const user = await AuthUser.findOne({
        where: {id: userId},
        attributes: {
            exclude: ['updatedAt', 'deletedAt', 'password', 'sex_id']
        },
        include: [
            {
                model: Role,
                as: 'roles',
                through: { attributes: [] }
            },
            {
                model: Article,
                as: 'draft_articles',
                where: { article_status_id: 1 },
                attributes: ['id'],
                required: false
            }
        ]
    });

    return user;

}

export const putAuthUserDal = async (userId, user) => {

    const userName = user.name;
    const userAbout = user.about;
    const userAvatarFilename = user.avatarFilename; //Неактуально здесь

    const authUser = await AuthUser.update(
        {
            name: userName,
            about: userAbout,
            avatar_filename: userAvatarFilename
        },
        {
            where: {id: userId}
        }
    )

    return authUser;
}