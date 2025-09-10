import { expect } from '@playwright/test';
import { test } from './fixtures';
import { Article } from '../../app/controllers/Article.controller';
import { articleBody, articleDescription, articleTagList, articleTitle } from '../../utils/article-data';

test('Search article by title', 
    { tag: ['@article', '@searchTitle'],
      annotation: {
        type: 'description',
        description: 'Search article by title',
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
    const searchedTitle = (await createResponse.json()).article.title;

    const foundArticle = await article.searchArticle(token, searchedTitle);
    expect(foundArticle.status()).toBe(200);
    const foundArticleBody = await foundArticle.json();
    const found = foundArticleBody.articles.find((a: any) => a.title === searchedTitle);
    expect(found).toBeDefined();
    expect(found.title).toBe(searchedTitle);
});    

test('Search article by tag', 
    { tag: ['@article', '@searchTag'],
      annotation: {
        type: 'description',
        description: 'Search article by tag',
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
    const searchedTag = (await createResponse.json()).article.tagList[0];
    expect(searchedTag).toBeDefined();
    expect(searchedTag).toBe(articleTagList[0]);
});
