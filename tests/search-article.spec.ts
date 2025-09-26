import { expect } from '@playwright/test';
import { test } from './fixtures';
import { Articles } from '../app/controllers/Articles.controller';

test('ART-009, Search article by title, should be found', 
    { tag: ['@article', '@searchTitle'],
      annotation: {
        type: 'description',
        description: 'Search article by title',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const foundArticle = await article.searchArticle(newUser.token);
      expect(foundArticle.status()).toBe(200);
      const foundArticleBody = await foundArticle.json();
      const found = foundArticleBody.articles.find((a: any) => a.title === newArticle.title);
      expect(found).toBeDefined();
      expect(found.title).toBe(newArticle.title);
});    

test('ART-010, Search article by tag, should be found', 
    { tag: ['@article', '@searchTag'],
      annotation: {
        type: 'description',
        description: 'Search article by tag',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const searchedTagArticle = await article.searchArticleByTag(newUser.token, newArticle.tag);
      expect(searchedTagArticle.status()).toBe(200);
      const articlesWithTag = (await searchedTagArticle.json());
      for (const article of articlesWithTag.articles) {
        expect(article.tagList).toContain(newArticle.tag);
      }
});
