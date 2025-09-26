import { expect } from '@playwright/test';
import { test } from './fixtures';
import { Articles } from '../app/controllers/Articles.controller';

test('ART-007, Add article to favorite, should be added', 
    { tag: ['@article', '@favorite'],
      annotation: {
        type: 'description',
        description: 'Add favorite to article',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const addToFavoriteResponse = await article.addFavoriteArticle(newArticle.slug, newUser.token);
      expect(addToFavoriteResponse.status()).toBe(200);
      const addToFavoriteResponseBody = await addToFavoriteResponse.json();
      expect(addToFavoriteResponseBody.article.slug).toEqual(newArticle.slug);
      expect(addToFavoriteResponseBody.article.favorited).toBe(true);
    });

test('ART-008, Delete article from favorite, should be deleted',
  { tag: ['@article', '@favorite'],
      annotation: {
        type: 'description',
        description: 'Delete favorite to article',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const addToFavoriteResponse = await article.addFavoriteArticle(newArticle.slug, newUser.token);
      expect(addToFavoriteResponse.status()).toBe(200);

      const deleteFromFavoriteResponse = await article.deleteFavoriteArticle(newArticle.slug, newUser.token);
      expect(deleteFromFavoriteResponse.status()).toBe(200);
      const deleteFromFavoriteResponseBody = await deleteFromFavoriteResponse.json();
      expect(deleteFromFavoriteResponseBody.article.slug).toEqual(newArticle.slug);
      expect(deleteFromFavoriteResponseBody.article.favorited).toBe(false);
});  
