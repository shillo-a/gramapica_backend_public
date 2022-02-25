import { getUserDal } from "./user.dal.js";

// 1.
export const getUserService = async (userKey) => {

    const user = await getUserDal(userKey);

    if(user){
        const user_output = user.toJSON();
        const user_output_formatted = {
            ...user_output, 
            draft_articles_num: user_output.draft_articles.length
        };
        delete user_output_formatted.draft_articles;
        return user_output_formatted;
    } else {
        return null;
    }

}