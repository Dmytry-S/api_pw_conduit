import { expect } from '@playwright/test';
import { test } from './fixtures';
import { articleBody, articleDescription, articleTagList, articleTitle, updatedArticleBody } from '../../utils/article-data';
import { articleSchema } from '../../utils/schemas';
import { Article } from '../../app/controllers/Article.controller';
import { userName } from '../../utils/user-data';


test('CRUD article', 
    { tag: ['@article', '@crud'],
      annotation: {
        type: 'description',
        description: 'Create, read, update, delete article',
      },
    },
    async ({ request, token }) => {
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
    const createResponseBody = await createResponse.json();
    const createValidationResult = articleSchema.validate(createResponseBody);
    expect(createValidationResult.error).toBeUndefined();
    const slug = createResponseBody.article.slug;

    const getResponse = await article.getArticle(slug, token);
    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.article.slug).toEqual(slug);
    const articleCreatedAt = getResponseBody.article.createdAt;
    const articleUpdatedAt = getResponseBody.article.updatedAt;

    const updateResponse = await article.updateArticle(
        token,
        slug, 
        { article: 
                {
                    author:{
                        username: userName,
                        following: false,
                    }, 
                    title: articleTitle,
                    description: articleDescription, 
                    body: updatedArticleBody,
                    tagList: articleTagList,
                    createdAt: articleCreatedAt,
                    updatedAt: articleUpdatedAt,
                    favorited: false,
                    favoritesCount: 0,
                    slug: slug,
                }
            });
    expect(updateResponse.status()).toBe(200);
    const updateResponseBody = await updateResponse.json();
    expect(updateResponseBody.article.slug).toEqual(slug);
    const updateValidationResult = articleSchema.validate(updateResponseBody);
    expect(updateValidationResult.error).toBeUndefined();

    const deleteResponse = await article.deleteArticle(slug, token);
    expect(deleteResponse.status()).toBe(204);
});
