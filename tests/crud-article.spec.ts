import { expect } from '@playwright/test';
import { test } from './fixtures';
import { articleBody, articleDescription, articleTagList, articleTitle, updatedArticleBody } from '../utils/article-data';
import { articleSchema } from '../utils/schemas';
import { Articles } from '../app/controllers/Articles.controller';

test('ART-001 Create article, should be created', 
    { tag: ['@article', '@create'],
      annotation: {
        type: 'description',
        description: 'Create article',
      },
    },
    async ({ request, newUser }) => {
      const article = new Articles(request);
      const createResponse = await article.createArticle(
          newUser.token, { article: {
                      author:{}, 
                      title: articleTitle,
                      description: articleDescription, 
                      body: articleBody,
                      tagList: articleTagList,
                      },
                  }
      );
      expect(createResponse.status()).toBe(200);
      const createResponseBody = await createResponse.json();
      const createValidationResult = articleSchema.validate(createResponseBody);
      expect(createValidationResult.error).toBeUndefined();
    });

test('ART-002, Get article, should be received', 
    { tag: ['@article', '@get'],
      annotation: {
        type: 'description',
        description: 'Get article',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const getResponse = await article.getArticle(newArticle.slug, newUser.token);
      expect(getResponse.status()).toBe(200);
      const getResponseBody = await getResponse.json();
      expect(getResponseBody.article.slug).toEqual(newArticle.slug);
  });

test('ART-003, Update article, should be updated',
  { tag: ['@article', '@update'],
      annotation: {
        type: 'description',
        description: 'Update article',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const updateResponse = await article.updateArticle(newUser.token, newArticle.slug, 
      { article: 
              {
                author: {
                  username: newArticle.userName,
                  following: false,
                },
                title: articleTitle,
                description: articleDescription,
                body: updatedArticleBody,
                tagList: articleTagList,
                favorited: false,
                favoritesCount: 0,
                slug: newArticle.slug,
                createdAt: '',
                updatedAt: ''
              }
          });
    expect(updateResponse.status()).toBe(200);
    const updateResponseBody = await updateResponse.json();
    expect(updateResponseBody.article.slug).toEqual(newArticle.slug);
    const updateValidationResult = articleSchema.validate(updateResponseBody);
    expect(updateValidationResult.error).toBeUndefined();
});

test('ART-004, Delete article, Should be deleted',
  { tag: ['@article', '@delete'],
      annotation: {
        type: 'description',
        description: 'Delete article',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const deleteResponse = await article.deleteArticle(newArticle.slug, newUser.token);
      expect(deleteResponse.status()).toBe(204);
      const checkDeleted = await article.getArticle(newArticle.slug, newUser.token);
      expect(checkDeleted.status()).toBe(404);
});
