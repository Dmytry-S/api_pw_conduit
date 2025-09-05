import { expect } from '@playwright/test';
import { test } from './fixtures';
import { articleBody, articleDescription, articleSchema, articleTagList, articleTitle } from '../../utils/user-article-data';
import { Conduit } from '../../app/controllers/conduit/Conduit.controller';


test('CRUD article', async ({ request, token }) => {
    const article = new Conduit(request);
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
    const responseBody = await createResponse.json();
    const validationResult = articleSchema.validate(responseBody);
    expect(validationResult.error).toBeUndefined();
    const slug = responseBody.article.slug;

    const getResponse = await article.getArticle(slug, token);
    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.article.slug).toEqual(slug);
});
