import { APIRequestContext } from "@playwright/test";


export class Article {
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

    async updateArticle(
        token: string,
        slug: string, 
        data: { article: 
                {
                    author:{
                        username: string,
                        image?: string,
                        following: boolean,
                    }, 
                    title: string,
                    description: string, 
                    body: string,
                    tagList: string[],
                    createdAt: string,
                    updatedAt: string,
                    favorited: boolean,
                    favoritesCount: number,
                    slug: string,
                }
            },
          ) {
        const response = await this.request.put(`/api/articles/${slug}`, {
            headers: {
                authorization: `Token ${token}`,
            },
            data: data,
        });
        return response;
    }

    async deleteArticle(slug: string, token: string) {
        const response = await this.request.delete(`/api/articles/${slug}`, {
            headers: {
                authorization: `Token ${token}`,
            }
        });
        return response;
    }

    async searchArticle(token: string, searchedTitle: string) {
        const searchResponse = await this.request.get(`/api/articles`, {
            headers: {
                authorization: `Token ${token}`,
            },
        });
        return searchResponse;
    }
    
    async searchArticleByTag(token: string, tag: string) {
        const searchTagResponse = await this.request.get(`/api/articles?tag=${tag}`, {
            headers: {
                 authorization: `Token ${token}`,
            },
        });
        return searchTagResponse;
    }

    async addFavoriteArticle(slug: string, token: string) {
        const response = await this.request.post(`/api/articles/${slug}/favorite`, {
            headers: {
                authorization: `Token ${token}`,
            }
        });
        return response;
    }

    async deleteFavoriteArticle(slug: string, token: string) {
        const response = await this.request.delete(`/api/articles/${slug}/favorite`, {
            headers: {
                authorization: `Token ${token}`,
            }
        });
        return response;
    }

    async addCommentToArticle(slug: string, token: string, commentBody: { comment: { body: string }}) {
        const response = await this.request.post(`/api/articles/${slug}/comments`, {
            headers: {
                authorization: `Token ${token}`,
            },
            data: commentBody,
        });
        return response;
    }
    
    async getArticleComments(slug: string, token: string, commentId: number) {
        const response = await this.request.get(`/api/articles/${slug}/comments/${commentId}`, {
            headers: {
                authorization: `Token ${token}`,
            }
        });
        return response;
    }

    async deleteCommentFromArticle(slug: string, commentId: number, token: string) {
        const response = await this.request.delete(`/api/articles/${slug}/comments/${commentId}`, {
            headers: {
                authorization: `Token ${token}`,
            }
        });
        return response;
    }
}