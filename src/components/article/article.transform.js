export const articleTagsTransform = (articleTags, articleId) => {

    const transformedArticleTags = articleTags.map((item) => ({
        article_id: articleId
    }))

    console.log(transformedArticleTags)
}