import { expect } from '@playwright/test';
import { test } from './fixtures';
import { Articles } from '../app/controllers/Articles.controller';
import { commentBody } from '../utils/article-data';

test('ART-005 Add comments to article, Should be added', 
    { tag: ['@article', '@comment'],
      annotation: {
        type: 'description',
        description: 'Add comments to article',
      },
    },
    async ({ request, newUser, newArticle }) => {
    const article = new Articles(request);
    
    let idList: string[] = [];
    for (const comment of commentBody) {
        const addCommentResponse = await article.addCommentToArticle(newArticle.slug, newUser.token, { comment: { body: comment } });
        expect(addCommentResponse.status()).toBe(200);
        const addCommentResponseBody = await addCommentResponse.json();
        const commentId = addCommentResponseBody.comment.id;
        idList.push(commentId);
        expect(addCommentResponseBody.comment.body).toBe(comment);
    }
  });

test('ART-006, Delete comment from the article, should be deleted',
  { tag: ['@article', '@comment'],
      annotation: {
        type: 'description',
        description: 'Delete comment from article',
      },
    },
    async ({ request, newUser, newArticle }) => {
      const article = new Articles(request);
      const addCommentResponse = await article.addCommentToArticle(newArticle.slug, newUser.token, { comment: { body: commentBody[0] } });
      expect(addCommentResponse.status()).toBe(200);
      const commentId = (await addCommentResponse.json()).comment.id;

      const deleteCommentResponse = await article.deleteCommentFromArticle(newArticle.slug, commentId, newUser.token);
      expect(deleteCommentResponse.status()).toBe(204);

      const getCommentsResponse = await article.getArticleComments(newArticle.slug, newUser.token, commentId);
      expect(getCommentsResponse.status()).toBe(404);
});  
