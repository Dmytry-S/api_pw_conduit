import { test as base, expect } from '@playwright/test';
import { generateUserName, userPassword, generateUserEmail } from '../utils/user-data';
import { Articles } from '../app/controllers/Articles.controller';
import * as articleData from '../utils/article-data';

type Fixtures = {
    newUser: { token: string; userEmail: string; userName:string };
    newArticle: { slug: string; userName: string; title: string; tag: string };
}

export const test = base.extend<Fixtures>({
    newUser: async ({ request }, use) => {
        const response = await request.post('/api/users/', 
            {
                data: {
                    user: { 
                        email: generateUserEmail(), 
                        password: userPassword, 
                        username: generateUserName(), 
                    }
                },
            }
        );
        expect(response.status()).toBe(200);
        const token = (await response.json()).user.token;
        expect(token).toBeDefined();
        const userName = (await response.json()).user.username;
        expect(userName).toBeDefined();
        const userEmail = (await response.json()).user.email;
        expect(userEmail).toBeDefined();
        
        await use({ token, userName, userEmail });
    },

    newArticle: async ({ request, newUser }, use) => {
        const article = new Articles(request);
        const createResponse = await article.createArticle(
            newUser.token, { article: {
                        author:{}, 
                        title: articleData.articleTitle,
                        description: articleData.articleDescription, 
                        body: articleData.articleBody,
                        tagList: articleData.articleTagList,
                        },
                    }
        );
        expect(createResponse.status()).toBe(200);
        const slug = (await createResponse.json()).article.slug;
        const userName = (await createResponse.json()).article.author.username;
        const title = (await createResponse.json()).article.title;
        const tag = (await createResponse.json()).article.tagList[0];

        await use({ slug, userName, title, tag });
    },
});
