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
    
    let idList: string[] = [];
    for (const comment of commentBody) {
        const addCommentResponse = await article.addCommentToArticle(slug, token, { comment: { body: comment } });
        expect(addCommentResponse.status()).toBe(200);
        const addCommentResponseBody = await addCommentResponse.json();
        const commentId = addCommentResponseBody.comment.id;
        idList.push(commentId);
        console.log('Added comment ID:', commentId);
        expect(addCommentResponseBody.comment.body).toBe(comment);
    }
    

    const deleteCommentResponse = await article.deleteCommentFromArticle(slug, idList[0], token);
    expect(deleteCommentResponse.status()).toBe(204);

    const getCommentsResponse = await article.getArticleComments(slug, token, idList[0]);
    expect(getCommentsResponse.status()).toBe(404);
});  
