import { APIRequestContext } from "@playwright/test";


export class Conduit {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createArticle(
        token: string, 
        data: { article: 
                {
                    author:{}, 
                    title: string,
                    description: string, 
                    body: string,
                    tagList: string[],
                }
            },
          ) {
        const response = await this.request.post(`/api/articles`, {
            headers: {
                authorization: `Token ${token}`,
            },
            data: data,
        });
        return response;
    }

    async getArticle(slug: string, token: string) {
        const response = await this.request.get(`/api/articles/${slug}`, {
            headers: {
                authorization: `Token ${token}`,
            }
        });
        return response;
    }
}