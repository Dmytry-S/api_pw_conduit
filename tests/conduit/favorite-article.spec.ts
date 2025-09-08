import { expect } from '@playwright/test';
import { test } from './fixtures';
import { Article } from '../../app/controllers/Article.controller';
import { articleBody, articleDescription, articleTagList, articleTitle } from '../../utils/article-data';

test('Add-delete article to favorite', async ({ request, token }) => {
    const article = new Article(request);
    const createResponse = await article.createArticle(
        token, 
        { article: 
                {
                    author:{}, 
                    title: articleTitle,
                    description: articleDescription, 
                    body: articleBody,
                    tagList: articleTagList,
                }
            }
    );
    expect(createResponse.status()).toBe(200);
    const slug = (await createResponse.json()).article.slug;
    
    const addToFavoriteResponse = await article.addFavoriteArticle(slug, token);
    expect(addToFavoriteResponse.status()).toBe(200);
    const addToFavoriteResponseBody = await addToFavoriteResponse.json();
    expect(addToFavoriteResponseBody.article.slug).toEqual(slug);
    expect(addToFavoriteResponseBody.article.favorited).toBe(true);

    const deleteFromFavoriteResponse = await article.deleteFavoriteArticle(slug, token);
    expect(deleteFromFavoriteResponse.status()).toBe(200);
    const deleteFromFavoriteResponseBody = await deleteFromFavoriteResponse.json();
    expect(deleteFromFavoriteResponseBody.article.slug).toEqual(slug);
    expect(deleteFromFavoriteResponseBody.article.favorited).toBe(false);

});  