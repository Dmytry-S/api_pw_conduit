import { expect } from '@playwright/test';
import { test } from './fixtures';
import { Article } from '../../app/controllers/Article.controller';
import { articleBody, articleDescription, articleTagList, articleTitle, commentBody } from '../../utils/article-data';

test('Add-delete comment to article', async ({ request, token }) => {
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
    
    const addCommentResponse = await article.addCommentToArticle(slug, token, { comment: { body: commentBody } });
    expect(addCommentResponse.status()).toBe(200);
    const addCommentResponseBody = await addCommentResponse.json();
    const commentId = addCommentResponseBody.comment.id;
    expect(addCommentResponseBody.comment.id).toBeDefined();
    expect(addCommentResponseBody.comment.body).toBe(commentBody);
    
    const deleteCommentResponse = await article.deleteCommentFromArticle(slug, commentId, token);
    expect(deleteCommentResponse.status()).toBe(204);

    const getCommentsResponse = await article.getArticleComments(slug, token, commentId);
    expect(getCommentsResponse.status()).toBe(404);
});  